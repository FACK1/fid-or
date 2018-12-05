BEGIN;

DROP TABLE IF EXISTS tododb CASCADE;

CREATE TABLE tododb(
id SERIAL PRIMARY kEY,
description VARCHAR(255) NOT NULL,
completed BOOLEAN NOT NULL DEFAULT false
);

INSERT INTO tododb (description, completed) VALUES
('make breakfast', false),
('study for exams', true);

COMMIT;
