CREATE OR REPLACE FUNCTION create_dummy_requests(int)
RETURNS void 
AS $$ 
DECLARE 
	temp_string 		varchar(32);
	temp_urgency_id	uuid;
	temp_cabinet_id	uuid;
BEGIN
	FOR counter in 1..$1 LOOP
		temp_string = upper(substr(md5(counter::text), 0, 25));
		temp_urgency_id = (SELECT _id FROM urgency LIMIT 1 OFFSET (random() * 10)::integer % 5);
		temp_cabinet_id = (SELECT _id FROM cabinets LIMIT 1 OFFSET (random() * 100)::integer % 33);
		INSERT INTO requests (client, client_phone, urgency_id, cabinet_id, defects, defect_description, created_at)
		VALUES (temp_string, temp_string, temp_urgency_id, temp_cabinet_id, temp_string, temp_string, NOW() + (counter::varchar || ' ms')::interval);
	END LOOP;
END;
$$ LANGUAGE plpgsql;