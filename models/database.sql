create table todo(
    todo_id serial primary key,
    description varchar(255),
    user_id   INT  references users(id)

)

CREATE TABLE users (
            id  bigserial   primary key not null,
            name    varchar(255) not null,
            email    varchar(255) not null,
            password  varchar(255) not null,
            Unique (email)
);