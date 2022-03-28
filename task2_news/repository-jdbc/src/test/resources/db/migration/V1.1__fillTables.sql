INSERT INTO news (title, short_text, full_text, creation_date, modification_date)
VALUES
      ('Story1','Sample text.', 'Sample text but much bigger.', current_date , current_date ),
      ('Story2','Sample text.', 'Sample text but much bigger.', current_date , current_date ),
      ('Story3','Sample text.', 'Sample text but much bigger.', current_date , current_date ),
      ('Story4','Sample text.', 'Sample text but much bigger.', current_date , current_date ),
      ('Story5','Sample text.', 'Sample text but much bigger.', current_date , current_date ),
      ('Story6','Sample text.', 'Sample text but much bigger.', current_date , current_date ),
      ('Story7','Sample text.', 'Sample text but much bigger.', current_date , current_date ),
      ('Story8','Sample text.', 'Sample text but much bigger.', current_date , current_date ),
      ('Story9','Sample text.', 'Sample text but much bigger.', current_date , current_date ),
      ('Story10','Sample text.', 'Sample text but much bigger.', current_date , current_date );

INSERT INTO author (name , surname)
VALUES('Alesia','Hlushakova'),
('Glen','Jobs'),
('Steven','Spielberg'),
('Polina','Duben'),
('Marina','Fokina'),
('Natalia','Novelskaya'),
('Tim','Cook'),
('Natalia','Kasper'),
('Zinaida','Coronovirusova'),
('Polina','Zubkova');

INSERT INTO tag (name)
VALUES('tag1'),
('tag2'),
('tag3'),
('tag4'),
('tag5'),
('tag6'),
('tag7'),
('tag8'),
('tag9'),
('tag10');

INSERT INTO news_author (news_id, author_id)
VALUES('1','2'),
('3','2'),
('2','4'),
('7','3'),
('8','2'),
('9','2'),
('10','2');

INSERT INTO news_tag (news_id, tag_id)
VALUES('1','1'),
('2','2'),
('2','4'),
('3','7'),
('4','8'),
('9','1'),
('7','4'),
('5','2'),
('5','7'),
('3','1');