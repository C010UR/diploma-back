-- SETTING UP
-- Resetting public schema
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;
	
-- Setting timezone
SET timezone = 'Europe/Minsk';

-- EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- TABLES
CREATE TABLE cabinets (
	_id					uuid DEFAULT gen_random_uuid() NOT NULL,
	_field			varchar(32) NOT NULL
);

ALTER TABLE cabinets
	ADD CONSTRAINT pk_cabinets PRIMARY KEY (_id);

INSERT INTO cabinets (_id, _field)
VALUES (uuid_nil(), '[Удалено]');

CREATE TABLE urgency (
	_id 				uuid DEFAULT gen_random_uuid() NOT NULL,
	_field			varchar(32) NOT NULL,
	_interval		interval NOT NULL
);

ALTER TABLE urgency
	ADD CONSTRAINT pk_urgent PRIMARY KEY (_id);

INSERT INTO urgency (_id, _field, _interval)
VALUES (uuid_nil(), '[Удалено]', '0');

CREATE TABLE common_defects (
	_id					uuid DEFAULT gen_random_uuid() NOT NULL,
	_field			varchar(64)
);

ALTER TABLE common_defects
	ADD CONSTRAINT pk_common_defects PRIMARY KEY (_id);

INSERT INTO common_defects (_id, _field)
VALUES (uuid_nil(), '[Удалено]');

CREATE TABLE technicians (
	_id					uuid DEFAULT gen_random_uuid() NOT NULL,
	_field			varchar(128)
);

ALTER TABLE technicians
	ADD CONSTRAINT pk_technicians PRIMARY KEY (_id);

INSERT INTO technicians (_id, _field)
VALUES (uuid_nil(), '[Удалено]');

CREATE TABLE common_works (
	_id					uuid DEFAULT gen_random_uuid() NOT NULL,
	_field			varchar(128)
);

ALTER TABLE common_works
	ADD CONSTRAINT pk_common_works PRIMARY KEY (_id);

INSERT INTO urgency (_id, _field)
VALUES (uuid_nil(), '[Удалено]');

CREATE TABLE requests (
	_id									uuid DEFAULT gen_random_uuid() NOT NULL,
	urgency_id					uuid DEFAULT (uuid_nil()) NOT NULL,
	cabinet_id					uuid DEFAULT (uuid_nil()) NOT NULL,
	technician_id				uuid,
	performed_works			text[],
	client							varchar(128) NOT NULL,
	client_phone				varchar(32),
	defects							text NOT NULL,
	defect_description	text,
	created_at					timestamptz DEFAULT (NOW()) NOT NULL,
	done_at							timestamptz
);

ALTER TABLE requests
	ADD CONSTRAINT pk_requests PRIMARY KEY (_id),
	ADD CONSTRAINT fk_requests_cabinets FOREIGN KEY (cabinet_id) REFERENCES cabinets (_id) ON DELETE SET DEFAULT ON UPDATE CASCADE,
	ADD CONSTRAINT fk_requests_urgency FOREIGN KEY (urgency_id) REFERENCES urgency (_id) ON DELETE SET DEFAULT ON UPDATE CASCADE,
	ADD CONSTRAINT fk_requests_technicians FOREIGN KEY (technician_id) REFERENCES technicians (_id) ON DELETE SET NULL ON UPDATE CASCADE;

CREATE FUNCTION notify_trigger() RETURNS trigger AS $$
DECLARE
BEGIN
  PERFORM pg_notify('watchers', NEW._id::varchar );
  RETURN new;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER watched_table_trigger AFTER INSERT ON requests
FOR EACH ROW EXECUTE PROCEDURE notify_trigger();

CREATE TABLE administrators (
	_id									uuid DEFAULT gen_random_uuid() NOT NULL,
	_login							varchar(32) NOT NULL,
	_pass								varchar(60) NOT NULL,
	created_at					timestamptz DEFAULT (NOW()) NOT NULL
);

CREATE INDEX idx_administrators_login ON administrators (_login);

ALTER  TABLE administrators
	ADD CONSTRAINT pk_administrators PRIMARY KEY (_id),
	ADD CONSTRAINT u_administrators_login UNIQUE (_login);

CREATE TABLE "session" (
  "sid" 							varchar NOT NULL COLLATE "default",
  "sess" 							json NOT NULL,
  "expire" 						timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session"
	ADD CONSTRAINT pk_session PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX idx_session_expire ON "session" (expire);

CREATE VIEW view_requests AS
SELECT 
	requests._id,
	CASE
		WHEN requests.technician_id IS NOT NULL THEN '0:completed'
		WHEN (urgency._interval + created_at - NOW()) < interval '0 hours' THEN '1:expired'
		WHEN (urgency._interval + created_at - NOW()) <= interval '1 hour' THEN '2:hour'
		WHEN (urgency._interval + created_at - NOW()) <= interval '24 hours' THEN '3:day'
		WHEN (urgency._interval + created_at - NOW()) <= interval '168 hours' THEN '4:week'
		WHEN (urgency._interval + created_at - NOW()) > interval '168 hours' THEN '5:none'
	END status,
	cabinets._field AS cabinet, technicians._field AS technician,
	requests.cabinet_id, requests.technician_id,
	requests.performed_works, requests.client, requests.client_phone, 
	requests.defects, requests.defect_description, requests.created_at, requests.done_at
FROM requests
JOIN urgency ON (requests.urgency_id = urgency._id)
JOIN cabinets ON (requests.cabinet_id = cabinets._id)
LEFT JOIN technicians ON (requests.technician_id = technicians._id)