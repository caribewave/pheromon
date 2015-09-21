-- useful things --

CREATE TABLE IF NOT EXISTS lifecycle(
    created_at  timestamp without time zone DEFAULT current_timestamp,
    updated_at  timestamp without time zone DEFAULT current_timestamp
);

CREATE TYPE quipu_status AS ENUM ('uninitialized', 'initialized', '3G_connected', 'tunnelling');
CREATE TYPE sense_status AS ENUM ('sleeping', 'monitoring', 'recording');
CREATE TYPE network_signal AS ENUM ('NODATA', 'GPRS', 'EDGE', '3G', 'H/H+');

-- http://www.revsys.com/blog/2006/aug/04/automatically-updating-a-timestamp-column-in-postgresql/
CREATE OR REPLACE FUNCTION update_updated_at_column()	
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;	
END;
$$ language 'plpgsql';


-- Business tables --

CREATE TABLE IF NOT EXISTS places (
    id           SERIAL PRIMARY KEY,
    name         text NOT NULL,
    type         text DEFAULT NULL,
    lat          real NOT NULL,
    lon          real NOT NULL
) INHERITS(lifecycle);
CREATE TRIGGER updated_at_places BEFORE UPDATE ON places FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();


CREATE TABLE IF NOT EXISTS sensors (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(100) NOT NULL,
    -- type         some_enum -- affluence/bin-level
    installed_at    integer REFERENCES places (id) DEFAULT NULL,
    project         text DEFAULT NULL,
    sim             text UNIQUE NOT NULL,
    quipu_status    quipu_status DEFAULT NULL, 
    sense_status    sense_status DEFAULT NULL,
    latest_input    text DEFAULT NULL,
    latest_output   text DEFAULT NULL,
    signal          network_signal DEFAULT NULL,
    period     real DEFAULT 300, --One measurement every 300 seconds
    start_hour      real DEFAULT 7,
    stop_hour       real DEFAULT 16
) INHERITS(lifecycle);
CREATE TRIGGER updated_at_sensors BEFORE UPDATE ON sensors FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();


CREATE TABLE IF NOT EXISTS sensor_measurements (
    id                  SERIAL PRIMARY KEY,
    sensor_sim          text REFERENCES sensors (sim) NOT NULL,
    type                text NOT NULL, -- This can be wifi, temperature, pressure, ... but we can't presuppose it in an enum.
    measurements        real[] NOT NULL, -- This was changed from signal_strengths to measurements
    measurement_date    timestamp without time zone NOT NULL
) INHERITS(lifecycle);
CREATE TRIGGER updated_at_sensor_measurements BEFORE UPDATE ON sensor_measurements FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();




-- CREATE INDEX name ON table (column);
-- CREATE TYPE name AS ENUM ('v1', 'v2');

