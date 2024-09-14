Create Table users (
    id varchar primary key,
    firstName varchar not null,
    lastName varchar not null,
    userName varchar unique not null,
    email varchar unique not  null,
    password varchar not null
);

Create Table posts(
    id varchar primary key,
    title varchar not null,
    url varchar not null,
    userId varchar not null,
    postedAt integer not null,
    foreign key (userId) references users (id)
);


