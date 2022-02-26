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

CREATE TABLE requests (
	_id									uuid DEFAULT gen_random_uuid() NOT NULL,
	urgency_id					uuid DEFAULT (uuid_nil()) NOT NULL,
	cabinet_id					uuid DEFAULT (uuid_nil()) NOT NULL,
	technician_id				uuid,
	performed_works			text,
	client							varchar(128) NOT NULL,
	client_phone				varchar(32),
	defects							text NOT NULL,
	defect_description	text,
	created_at					timestamptz DEFAULT (NOW()) NOT NULL,
	done_at							timestamptz
);

CREATE INDEX idx_requests_created_at ON requests(created_at);

ALTER TABLE requests
	ADD CONSTRAINT pk_requests PRIMARY KEY (_id),
	ADD CONSTRAINT fk_requests_cabinets FOREIGN KEY (cabinet_id) REFERENCES cabinets (_id) ON DELETE SET DEFAULT ON UPDATE CASCADE,
	ADD CONSTRAINT fk_requests_urgency FOREIGN KEY (urgency_id) REFERENCES urgency (_id) ON DELETE SET DEFAULT ON UPDATE CASCADE,
	ADD CONSTRAINT fk_requests_technicians FOREIGN KEY (technician_id) REFERENCES technicians (_id) ON DELETE SET NULL ON UPDATE CASCADE;

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