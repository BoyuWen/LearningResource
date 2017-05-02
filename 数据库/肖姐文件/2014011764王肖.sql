create database edu
use edu
create schema wangxiao
create table wangxiao.student
(
  sno char(8) primary key,
  sname char(8) not null,
  sex char(2),
  snative char(20),
  birthday datetime,
  pno char(4),
  dno char(8),
  classno char(4),
  entime datetime,
  home varchar(40),
  tel varchar(40),
  foreign key (dno) references wangxiao.department(dno)
);


create table wangxiao.course
(
  cno char(10) primary key,
  cname char(20) not null,
  cpno char(10),
  experiment tinyint,
  lecture tinyint,
  semester tinyint,
  credit tinyint,
  foreign key (cpno) references wangxiao.course(cno)
);

create table wangxiao.student_course
(
  sno char(8),
  cno char(10),
  score tinyint,
  primary key (sno,cno)
);

create table wangxiao.teacher
(
  tno char(8) primary key,
  tname char(8) not null,
  sex char(2),
  birthday datetime,
  dno char(8),
  pno varchar(20),
  home varchar(40),
  zipcode char(6),
  tel varchar(40),
  email varchar(40),
  foreign key (dno) references wangxiao.department(dno)
);

create table wangxiao.teacher_course
(
  tcid smallint primary key,
  tno char(8),
  classno char(4),
  cno char(10) not null,
  semester char(6),
  schoolyear char(10),
  classtime varchar(40),
  classroom varchar(40),
  weektime tinyint,
  foreign key (tno) references wangxiao.teacher(tno),
  foreign key (cno) references wangxiao.course(cno)
);

create table wangxiao.department
(
  dno char(8) primary key,
  dname char(8) not null,
  dhome varchar(40),
  dzipcode char(6),
  dtel varchar(40)
);

create unique index Name on wangxiao.student(sname desc);
create index Credit on wangxiao.course(credit asc);
create clustered index sNo on wangxiao.student_course(sno); --要先删除之前的
create index SCno on wangxiao.student_course(sno asc,cno desc);
create clustered index Tno on wangxiao.teacher(tno asc); --要先删除之前的
drop index wangxiao.student_course.sNo;