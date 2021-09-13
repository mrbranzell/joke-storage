
-- Up
CREATE TABLE Note (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
   title TEXT,
   content TEXT
);

CREATE TABLE Tag (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
   title TEXT
);

CREATE TABLE Notetag (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
   noteid INTEGER REFERENCES Note(id),
   tagid INTEGER REFERENCES Tag(id)
);

INSERT INTO Note (title, content) values ('tihi', 'blabla');
INSERT INTO Note (title, content) values ('ti', 'blablahfhfa');
INSERT INTO Tag (title) values ('mercedes')

-- Down
DROP TABLE Note;
DROP TABLE Tag;
DROP TABLE Notetag;

-- -- Up
-- CREATE TABLE Notes (
--     id INTEGER PRIMARY KEY AUTOINCREMENT,
--     title TEXT,
--     content TEXT
-- );

-- CREATE TABLE Tags (
--     id INTEGER PRIMARY KEY AUTOINCREMENT,
--     title TEXT,
-- );

-- CREATE TABLE Notetags (
--     noteid INTEGER REFERENCES Notes(noteId)
--     tagid INTEGER REFERENCES Tags(id)
-- );

 

-- INSERT INTO Notes (title, content) values ('tihi', 'blabla');
-- INSERT INTO Notes (title, content) values ('haha', 'blabla');

-- INSERT INTO Tags (title) values ('snow');
-- INSERT INTO Tags (title) values ('grass');
-- INSERT INTO Tags (title) values ('mercedes');

-- -- Down
-- DROP TABLE Notes;
-- DROP TABLE Tags;
-- DROP TABLE Notetags;
