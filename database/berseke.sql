-- los cueres de la base de datos 
-- es que la cago mucho con la base de dato XD

CREATE SEQUENCE notes_notes_id_seq;

CREATE TABLE notes (
                notes_id INTEGER NOT NULL DEFAULT nextval('notes_notes_id_seq'),
                note_title VARCHAR NOT NULL,
                note_text VARCHAR,
                CONSTRAINT notes_id PRIMARY KEY (notes_id)
);


ALTER SEQUENCE notes_notes_id_seq OWNED BY notes.notes_id;

CREATE SEQUENCE img_img_id_seq;

CREATE TABLE img (
                img_id INTEGER NOT NULL DEFAULT nextval('img_img_id_seq'),
                img_title VARCHAR NOT NULL,
                imgpath VARCHAR NOT NULL,
                img_description VARCHAR,
                CONSTRAINT img_id PRIMARY KEY (img_id)
);


ALTER SEQUENCE img_img_id_seq OWNED BY img.img_id;

CREATE SEQUENCE users_user_id_seq;

CREATE TABLE users (
                user_id INTEGER NOT NULL DEFAULT nextval('users_user_id_seq'),
                email VARCHAR NOT NULL,
                password VARCHAR NOT NULL,
                CONSTRAINT user_id PRIMARY KEY (user_id)
);


ALTER SEQUENCE users_user_id_seq OWNED BY users.user_id;
