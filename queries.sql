create table users (
    id int unsigned auto_increment primary key,
    name varchar(50),
    email varchar(50),
    password varchar(50),
    is_admin boolean default false
);
