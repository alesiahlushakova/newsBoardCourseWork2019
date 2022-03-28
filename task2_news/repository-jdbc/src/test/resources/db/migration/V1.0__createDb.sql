
create table author
(
    id bigserial not null primary key,
    name varchar(30) not null,
    surname varchar(30) not null
);

create table news
(
    id bigserial not null primary key,
    title varchar(30) not null,
    short_text varchar(100) not null,
    full_text varchar(2000) not null,
    creation_date date not null,
    modification_date date not null
);
create table users
(
    id bigserial not null primary key,
    name varchar(20) not null,
    surname varchar(20) not null,
    login varchar(30) not null,
    password varchar(30) not null
);
create table news_author
(
    news_id bigint not null,
    author_id bigint not null
);
alter table news_author
    add foreign key(news_id)
        references news(id)
        on update cascade
        on delete cascade;

alter table news_author
    add foreign key(author_id)
        references author(id)
        on update cascade
        on delete cascade;

create table roles
(
    user_id bigint not null,
    role_name varchar(30) not null
);

alter table roles
    add foreign key(user_id)
        references users(id)
        on update cascade
        on delete cascade;

create table tag
(
    id bigserial not null primary key,
    name varchar(30) not null
);

create table news_tag
(
    news_id bigint not null,
    tag_id bigint not null
);
alter table news_tag
    add foreign key(news_id)
        references news(id)
        on update cascade
        on delete cascade;

alter table news_tag
    add foreign key(tag_id)
        references tag(id)
        on update cascade
        on delete cascade;