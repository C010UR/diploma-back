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

-- TABLES
CREATE TABLE cabinets (
	_id					uuid DEFAULT gen_random_uuid() NOT NULL,
	_field			varchar(255) NOT NULL
);

ALTER TABLE cabinets
	ADD CONSTRAINT pk_cabinets PRIMARY KEY (_id);

CREATE TABLE urgency (
	_id 				uuid DEFAULT gen_random_uuid() NOT NULL,
	_field			varchar(255) NOT NULL,
	_interval		interval NOT NULL
);

ALTER TABLE urgency
	ADD CONSTRAINT pk_urgent PRIMARY KEY (_id);

CREATE TABLE requests (
	_id									uuid DEFAULT gen_random_uuid() NOT NULL,
	urgency_id					uuid NOT NULL,
	cabinet_id					uuid NOT NULL,
	technician					varchar(255),
	performed_works			text,
	client							varchar(255) NOT NULL,
	client_phone				varchar(32),
	defects							text NOT NULL,
	defect_description	text,
	created_at					timestamptz DEFAULT (NOW()) NOT NULL,
	done_at							timestamptz
);

CREATE INDEX idx_requests_created_at ON requests(created_at);

ALTER TABLE requests
	ADD CONSTRAINT pk_requests PRIMARY KEY (_id),
	ADD CONSTRAINT fk_requests_cabinets FOREIGN KEY (cabinet_id) REFERENCES cabinets (_id),
	ADD CONSTRAINT fk_requests_urgency FOREIGN KEY (urgency_id) REFERENCES urgency (_id);

CREATE TABLE administrators (
	_id									uuid DEFAULT gen_random_uuid() NOT NULL,
	_login							varchar(255) NOT NULL,
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