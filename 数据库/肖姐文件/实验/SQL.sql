--create database student
--use student
--create schema s_t
--create table student
--(
--  sno char(9) primary key,
--  sname char(10) unique,
--  ssex char(2),
--  sage smallint,
--  sdept varchar(20)
--);
--create table course
--(
--  cno char(4) primary key,
--  cname char(40) not null,
--  cpno char(4),
--  ccredit smallint,
--  foreign key (cpno)
--  references course(cno)
--);
--create table sc
--(
--  sno char(9) not null,
--  cno char(4) not null,
--  grade smallint
--  primary key (sno,cno),
--  foreign key (sno)
--    references student(sno),
--  foreign key (cno)
--    references course(cno)
--);
--drop table s_t.student
--drop table s_t.sc
--drop table s_t.course

--alter table student
--add s_entrance date
--alter table student
--drop column s_entrance
--alter table student
--alter column sage int
--alter table course
--add not null(ccredit)
--alter table s_t.sc
--add primary key(sno,cno)
--alter table s_t.sc
--add foreign key(sno)
--references student(sno)
--create unique index stusno
--on student(sno asc)
--create clustered index stusno
--on student(sno asc)
--drop index student.stusno
--exec sp_rename 'student.stusno','stusno1'

--select sno,sname,sdept
--from student

--select *
--from student
--select sno,sname,2016-sage �������,'2014'
--from student

--select COUNT(ssex) ������
--from student
--select sno,sname,lower(sdept)
--from student 

--select distinct sno
--from sc
--select sno,sname,sdept
--from student
--where sage<20

--select *
--from student
--where sage between 19 and 23
--select sname
--from student
--where sname like 'ŷ��__'
--select *
--from student
--order by ssex desc

--select COUNT(*)
--from student
--select cno,COUNT(sno)
--from sc
--group by cno


--select sname,sno,ssex
--from student
--where sname like 'ŷ��__'

--select *
--from student
--order by ssex desc

--select COUNT(*)
--from student

--select student.*,sc.*
--from student,sc
--where student.sno=sc.sno
--select sc.sno,sname,sage,ssex,sdept,cno,grade
--from student,sc
--where student.sno=sc.sno

--select first.cno,second.cpno
--from course first,course second
--where first.cpno=second.cno

--select student.*,cno,grade
--from student full outer join sc
--on student.sno=sc.sno

--select student.sno,sname
--from student,sc
--where student.sno=sc.sno and
--      cno='2' and
--      grade>80

--select sno,cno
--from sc x
--where grade >
--   (
--     select AVG(grade)
--     from sc y
--     where x.sno=y.sno
--   );

--select sname,sage
--from student
--where 
--  sage>any
--  (select sage
--   from student
--   where sdept='IS')  and 
--   sdept<>'IS'
--select sname
--from student
--where sno in
--(
--select sno
--from sc
--where cno in
--(select cno
--from course
--where cname='��Ϣϵͳ'))
--select sno,cno
--from sc x
--where grade>

--(select AVG(grade)
--from sc y
--where y.sno=x.sno);

--insert into student(sno,sname,sage,ssex,sdept)
--values('201215128','�¶�',18,'��','IS')
--insert into student
--values('201215129','�ų���','��',19,'CS')

--insert into student(sno,sname,sdept)
--values('201215130','����','MA')
--insert into student(sno,sname,ssex,sage,sdept)
--values('201215131','����','','','CS')
--insert into student(sno,sname,ssex,sage,sdept)
--values('201215132','�ŷ�',NULL,NULL,'CS')
--create table avgage
--(
--  sdept char(15),
--  avgsage smallint
--);
--insert into avgage
--  select sdept,AVG(sage)
--  from student
--  group by sdept
--update student
--set sage=22
--where sno='201215121'

--update student
--set sage=sage+1
--update sc
--set grade=0
--where sno in
--  (
--    select sno
--    from student
--    where sdept='CS'
--  );
--update sc
--set grade=100
--where 
--(
--  select sdept
--  from student
--  where sc.sno=student.sno
--)='CS'

--update student
--set sno='201515133',ssex='��'
--where sno='201215133'

--delete 
--from student
--where sno='201215121'
--delete 
--from course 
--where cno='2'
--delete  
--from sc
--where sno in

--(
--  select sno
--  from student
--  where sdept='cs'
--)

--insert into Student (Sno,Sname,Ssex,Sage,Sdept)
--values('201215121',      '����',      '��',20,'CS')
--insert into Student (Sno,Sname,Ssex,Sage,Sdept)
--values('201215122',      '����',      'Ů',19,'CS')
--insert into Student (Sno,Sname,Ssex,Sage,Sdept)
--values('201215123',      '����',      'Ů',18,'MA')
--insert into Student (Sno,Sname,Ssex,Sage,Sdept)
--values('201215125',      '����',      '��',19,'IS')

--delete 
--from course

--insert into Course (Cno,Cname,Cpno,Ccredit)
--values('2','��ѧ',NULL,2)
--insert into Course (Cno,Cname,Cpno,Ccredit)
--values('6','���ݴ���',NULL,2)
--insert into Course (Cno,Cname,Cpno,Ccredit)
--values('7','PASCAL����','6',4)
--insert into Course (Cno,Cname,Cpno,Ccredit)
--values('5','���ݽṹ','6',4)
--insert into Course (Cno,Cname,Cpno,Ccredit)
--values('4','����ϵͳ','7',3)
--insert into Course (Cno,Cname,Cpno,Ccredit)
--values('1','���ݿ�','5',4)
--insert into Course (Cno,Cname,Cpno,Ccredit)
--values('3','��Ϣϵͳ','6',4)

--insert into 
--student(sno,sname,sage,ssex,sdept)
--values('201215128','�¶�',18,'��','IS')

--insert into student
--values('201215129','�ų���','��',19,'CS')
--insert into student(sno,sname,sdept)
--values('201215130','����','MA')
--insert into student(sno,sname,ssex,sage,sdept)
--values('201215131','����','','','IS')
--insert into student(sno,sname,ssex,sage,sdept)
--values('201215132','�ŷ�',NULL,NULL,'CS')
--insert into student(sno,sname,ssex,sage,sdept)
--values('201215133','����',null,null,'CS')
--create table avgage
--(
--  sdept char(15),
--  sdeptavg smallint
--);
--insert into avgage
--select sdept,AVG(sage)
--from student
--group by sdept
--update student
--set sage=22
--where sno='201215121'
--update student
--set sage=sage+1
--update sc
--set grade=0
--where sno in
--(
--  select sno
--  from student
--  where sdept='CS'
--);
--update sc
--set grade=80
--where
--  (
--    select sdept
--    from student
--    where student.sno=sc.sno
--  )='CS'
--update student
--set sno='201515133',ssex='��',sage=18
--where sname='����'
--update student
--set sname='����'
--where sname='����'
--delete 
--from student
--where sno='201215121'
--delete 
--from sc
--delete 
--from sc
--where sno in
--(
--  select sno
--  from student
--  where sdept='CS'
--);

--create view is_student(sno,sname,sdpet)
--as
--select sno,sname,sdept
--from student
--where sdept='IS'
--select *
--from is_student
----insert into is_student
----values('201215140','�����','CS')
--create view cs_student(sno,sname,sdpet)
--as
--select sno,sname,sdept
--from student
--where sdept='CS'
--with check option
--insert into cs_student
--values('201215141','���','MA')
--create view is_s1(sno,sname,grade)
--as
--select student.sno,sname,grade
--from student,sc
--where student.sno=sc.sno and
--      sdept='IS' and
--      cno='1'

--create view is_s2
--as
--select sno,sname,grade
--from is_s1
--where grade>=90

--create view bt_s(sno,sname,birth)
--as
--select sno,sname,2016-sage
--from student

--alter table student
--add sage smallint
--create view s_g(sno,avggrade)
--as
--select sno,avg(grade)
--from sc
--group by sno
--create view f_student(sno,sname,sage,ssex,sdept)
--as
--select sno,sname,sage,ssex,sdept
--from student
--where ssex='Ů'

--select *
--from f_student
--alter table student



--add s_entrance1 date
--alter table student
--drop column sage
--drop view is_student

--drop view is_s1
--drop table sc


--create view is_student(sno,name,dept)
--as
--select sno,sname,sdept
--from student
--where sdept='IS'

--select *
--from is_student
--insert into is_student(sno,name,dept)
--values('201215128','����','CS')

--create view cs_student
--as
--select sno,sname,sdept
--from student
--where sdept='CS'
--with check option
--insert into cs_student
--values('201215129','����','IS')
--create view is_s1(sno,sname,grade)
--as
--select student.sno,sname,grade
--from student,sc
--where sdept='IS' and
--      cno='1' and 
--      student.sno=sc.sno

--create view is_s2(sno,sname,grade)
--as
--select sno,sname,grade
--from is_s1
--where grade>=90
--create view bt_s(sno,sname,sbirth)
--as
--select sno,sname,2016-sage �������
--from student
--create view s_g(sno,gavg)
--as
--select sno,AVG(grade)
--from sc
--group by sno
--select *
--from s_g
--create view f_student1(sno,sname,sex,age,dept)
--as
--select sno,sname,ssex,sage,sdept
--from student
--where ssex='Ů'
--select *
--from f_student
--alter table student add
--s_entrance date
--select *
--from f_student
--alter table student 
--add id_s char(18) 
--select *
--from f_student1
--drop view is_student
--drop view is_s1 cascade

--create login p7 
--with password='1'

--create user u7 for login p7
--grant select 
--on student
--to u1
--grant insert 
--on student
--to u1
--grant all privileges
--on course
--to u2,u3
--grant insert 
--on sc
--to public
--select *
--from sc
--grant select,update(sname)
--on student
--to u3
--with grant option
--grant create schema
--to u3
--grant create table
--to u3
--create login p7 
--with password='1'

--create user u7
--for login p7
--grant select
--on student
--to u1
--grant all privileges
--on student
--to u2,u3
--grant select
--on sc
--to public
--grant select,update(sname)
--on student
--to u4
--grant insert
--on sc
--to u5
--with grant option
--revoke select
--on student
--from u1
--revoke insert
--on sc
--from u5
--cascade
--grant insert
--on sc
--to u6
--create role r1
--grant insert,select,update
--on student
--to r1
--grant r1
--to u5,u6
--exec sp_addrolemember r1,u5
--create login ppp1
--with password='1'
--create user uuu1 
--for login ppp1
--create login p7
--with password='1'
--create user u7
--for login p7
--grant select
--on student
--to uuu1
--grant all privileges
--on course
--to u2,u3
--grant select
--on sc
--to public
--grant select,update(sname)
--on student
--to u4
--grant insert
--on sc
--to u5
--with grant option

--grant create schema
--to u5
--grant create table 
--to u5
--create login [zy-pc\zhao]
--from windows
--with default_database=student


--grant select
--on student
--to u1
--grant all privileges
--on course
--to u2,u3
--grant select
--on sc
--to public
--grant select,update(sname)
--on student
--to u4
--grant insert
--on sc
--to u5
--with grant option
--revoke select
--on student
--from u1
--revoke update(sname)
--on student
--from u4

--grant insert
--on sc
--to u6


--create role r1
--grant select,insert,update
--on student
--to r1
--grant r1
--to u3,u4,u5

--exec sp_addrolemember r1,u7

--ʵ���� ���ݿ������Դ���

--create database department
--use department
--create table dept
--(
--  dno char(4)
--    constraint c1 primary key(dno),
--  dname char(6) not null,
--  mname char(10),
--  tel char(8) default '00000000'
--);

--create table worker
--(
--  wno char(6)
--    constraint c4 primary key(wno),
--  wname char(10),
--  wage smallint 
--    constraint c2 check (wage<=60),
--  wsex char(2),
--  waddr varchar(20),
--  zip char(6),
--  dno char(4)
--    constraint c3 foreign key (dno) 
--    references dept(dno) 
--);
--alter table worker
--  add constraint Uniquename unique(wname)
--alter table worker
--  drop column wsex
--select *
--from worker

--alter table worker
--  add wsex char(2) default 'Ů'




--ʵ���� ���������Դ���

--create database department
--use department
--create table department
--(
--  dno char(4)
--    constraint c1 primary key(dno),
--  dname char(10) not null,
--  mname char(10),
--  tel char(8) default '00000000' 
--);

--insert into department(dno,dname,mname)
--  values('0001','������','����')
--create table staff
--(
--  sno char(6)
--    constraint c2 primary key(sno),
--  sname char(10),
--  sage smallint
--    constraint c3 check(sage<=60),
--  saddr varchar(20),
--  zip char(6),
--  dno char(4)
--    constraint c4 foreign key(dno)
--    references department(dno)
--);

--alter table staff
--  add constraint c5 unique(sname)
--alter table staff
--  add ssex char(2) default 'Ů'

--declare @myvar char(20)
--select @myvar='Hello world��'
----print @myvar
--declare @var1 datetime,@var2 char(10)
--set @var1=getdate()
--select @var2=convert(char(10),@var1,10)
--print '��ǰ�����ǣ�'+@var2
--print @@version
--print @@servicename

--if(exists(select * 
--          from student 
--          where sno='201215121'))
--  begin
--    select *
--    from student
--    where sno='201215121'
--  end
--else 
--  print 'û�ҵ���'

--select sno,ssex=
--               case ssex
--               when '��' then 'M'
--               when 'Ů' then 'F'
--               end
--from student

--declare @x int,@sum int
--select @x=0,@sum=0
--while @x<10
--  begin
--    set @x=@x+1
--    set @sum=@sum+@x
--  end
--print '@sum='+convert(char(2),@sum)
--waitfor delay '00:00:10'
--begin
--  select *
--  from student
--end
--print datediff(d,'1979-06-01',getdate())


--declare @myvar char(20)
--set @myvar='Hello world!'
--print @myvar

--declare @var1 datetime,@var2 char(10)
--set @var1=GETDATE()
--set @var2=convert(char(10),@var1,10)
--print '��ǰ�����ǣ�'+@var2

--print @@version
--print @@servicename
--declare @var1 int
--set @var1=1
--set @var1=~@var1
--select @var1

--if (exists (select * 
--			from student 
--			where sno='201215121'))
--  begin
--    select *
--    from student
--    where sno='201215121'
--  end
--else
--  print 'û�ҵ�'

--select sno,sname,ssex=
--					case ssex
--					  when '��' then 'M'
--					  when 'Ů' then 'F'
--					end
--from student
--declare @x int,@sum int
--set @x=0
--set @sum=0
--while (@x<10)
-- begin
--   set @x=@x+1
--   set @sum=@sum+@x

-- end
--    print '@sum='+convert(char(2),@sum)

--waitfor time '00:00:10'
--begin
--  select *
--  from student
--end

--select DATEDIFF(d,'1979-06-01',GETDATE())
--print substring('130102197906012155',7,4)

----1.�����α�
--declare num_cursor cursor
--for select sno,sname from student
--for read only
----2.���α�
--open num_cursor
----3.���α���ȡ��Ϣ
--declare @no char(9),@sum int,@sname char(10)
--set @sum=0
--fetch next from num_cursor into @no,@sname
--while @@FETCH_STATUS=0
--begin
--  select @sname
--  if not exists(select *
--				from sc
--				where sno=@no)
--	set @sum=@sum+1
--  fetch next from num_cursor into @no,@sname
--end
--print 'δѡ�ε�����Ϊ'+convert(char(2),@sum)+'��'
----4.�ر��α�
--close num_cursor
----5.�ͷ��α�
--deallocate num_cursor

--declare @mygrade int
--declare @a int,@b int,@c int,@d int,@e int
--select @a=0,@b=0,@c=0,@d=0,@e=0

----1.�����α�
--declare grade_cursor cursor
--for select grade
--	from sc
--for read only
----2.���α�
--open grade_cursor
----3.���α���ȡ��Ϣ
--fetch next from grade_cursor into @mygrade
--while @@FETCH_STATUS=0
--begin
--  if @mygrade is null
--    set @e=@e+1
--  else if @mygrade<60
--         set @e=@e+1
--       else if @mygrade<70
--              set @d=@d+1
--            else if @mygrade<80
--                   set @c=@c+1
--                 else if @mygrade<90
--                        set @b=@b+1
--                      else 
--                        set @a=@a+1
--  fetch next from grade_cursor into @mygrade
--end
--select @a,@b,@c,@d,@e
----4.�ر��α�
--close grade_cursor
----5.�ͷ��α�
--deallocate grade_cursor




--declare @no char(9),@sum int
--set @sum=0
----1.�����α�
--declare num_cursor cursor
--for select sno
--	from student
--for read only
----2.���α�
--open num_cursor
----3.���α���ȡ��Ϣ
--fetch next from num_cursor into @no
--while @@FETCH_STATUS=0
--begin
--  if not exists
--    (
--      select *
--      from sc
--      where sno=@no
--    )
--    set @sum=@sum+1
--  fetch next from num_cursor into @no
--end
--print 'δѡ�ε�����Ϊ'+convert(char(2),@sum)+'��'
----4.�ر��α�
--close num_cursor
----5.�ͷ��α�
--deallocate num_cursor

--declare @mygrade int
--declare @a int,@b int,@c int,@d int,@e int 
--select @a=0,@b=0,@c=0,@d=0,@e=0
----1.�����α�
--declare grade_cursor cursor
--for select grade
--	from sc
--for read only
----2.���α�
--open grade_cursor
----3.��ȡ�α��е���Ϣ
--fetch next from grade_cursor into @mygrade
--while @@FETCH_STATUS=0
--begin
--  if @mygrade>=90
--    set @a=@a+1
--  else if @mygrade>=80
--    set @b=@b+1
--  else if @mygrade>=70
--    set @c=@c+1
--  else if @mygrade>=60
--    set @d=@d+1
--  else if @mygrade is null
--    set @e=@e+1
--  else set @e=@e+1
-- fetch next from grade_cursor into @mygrade 
--end
--select @a ����,@b ����,@c �е�,@d ����,@e ������
----4.�ر��α�
--close grade_cursor
----5.�ͷ��α�
--deallocate grade_cursor


--�洢����
--1.���������Ĵ洢����
--create proc myproc
--as
--begin
--  select *
--  from student
--  where sno in
--    (
--      select sno
--      from sc
--      where grade>80
--      group by sno
--      having COUNT(*)>=1
--    )
--end

--exec myproc

--2.����������Ĵ洢����
--create proc proc_insert_student
--@sno char(9),
--@sname char(10),
--@ssex char(2)='��',
--@sage int,
--@sdept varchar(20)
--as
--begin
--  insert into student(sno,sname,sage,sdept,ssex)
--  values(@sno,@sname,@sage,@sdept,@ssex)
--end
--exec proc_insert_student '201215141','���','��',18,'MA'
--exec proc_insert_student 
--@sno='201215142',
--@sname='С��Ů',
--@sage=25,
--@sdept='IS'

--3.������������Ĵ洢����
--create proc aveage
--@sno char(9),
--@avggrade int output
--as
--begin
--  select @avggrade=AVG(grade)
--  from sc
--  where sno=@sno
--end

--declare @grade int
--set @grade=0
--exec aveage '201215121',@grade out
--select @grade ƽ���ɼ�
--drop proc aveage

--��ϰ
--1
 --create proc myproc1
 --as
 --begin
 --  select sno,AVG(grade)
 --  from sc
 --  group by sno
 --end
 --2
 --create proc myproc2
 --@sno char(9)
 --as
 --begin
 --  select AVG(grade)
 --  from sc
 --  where sno=@sno
 --end
 
--3
--create proc myproc3
--@sno char(9),
--@avggrade int out
--as
--begin
--  select @avggrade=AVG(grade)
--  from sc
--  where sno=@sno
--end




--create proc myproc
--as
--begin
--  select *
--  from student
--  where sno in
--    (
--      select sno
--      from sc
--      where grade>80
--      group by sno
--      having COUNT(*)>=1
--    );
--end
--exec myproc

--create proc proc_insert_student
--@sno char(9),
--@sname char(10),
--@ssex char(2)='��',
--@sage smallint,
--@dept varchar(20)
--as
--begin
--  insert into 
--  student(sno,sname,sdept,ssex,sage)
--  values(@sno,@sname,@dept,@ssex,@sage)
--end

--exec proc_insert_student 
--'201215150','���߹�','��',37,'CS'
--exec proc_insert_student
--@sno='201215151',
--@sname='��ҩʦ',
--@sage=40,
--@dept='MA'

--create proc avg_grade
--@sno char(9),
--@grade smallint out
--as
--begin
--  select @grade=AVG(grade)
--  from sc
--  where sno=@sno
--end

--declare @avggrade int
--set @avggrade=0
--exec avg_grade '201215121',@avggrade out
--select @avggrade ƽ���ɼ�

--��ϰ
--1.
--create proc myproc1
--as
--begin
-- select AVG(grade)
-- from sc
-- group by sno
--end

----2.
--create proc myproc2
--@sno char(9)
--as
--begin
--  select AVG(grade)
--  from sc
--  where sno=@sno
--end

--3
--create proc myproc3
--@sno char(9),
--@savg smallint output
--as
--begin
--  select @savg=AVG(grade)
--  from sc
--  where sno=@sno
--end

--create function DateOnly(@date datetime)
--returns table
--as
--begin
--  return convert(varchar(12),@date,102)
--end

--select dbo.DateOnly(GETDATE())

--create function fun1()
--returns table
--as
--return
--select sno,sname,sdept
--from student

--select *
--from fun1()

--create function fun2(@dept char(10))
--returns table
--as
----begin
--  return
--  select student.sno,cno,grade
--  from student,sc
--  where student.sno=sc.sno and
--        sdept=@dept
--end

--select *
--from fun2('cs')

--������

--create trigger tr_sc_insert on sc
--for insert
--as
--begin
--  declare @sno char(9)
--  select @sno=sno from inserted
--  if not exists
--    (
--      select *
--      from student
--      where sno=@sno
--    )
--    delete from sc
--    where sno=@sno
--end
--insert into sc
--values('201215180','1',90)

--create trigger tr_sc_grade on sc
--for insert
--as
--begin
--  declare @score int
--  set @score=0
--  select @score=grade from inserted
--  if (@score<0 or @score>100)
--    begin
--      raiserror('�ɼ�������0-100֮��',16,10)
--      rollback transaction
--    end
--end

--insert into sc
--values('201215121','5',120)



--�Զ��庯��
--1.��������
--create function DateOnly(@date datetime)
--returns varchar(12)
--as
--begin
--  return convert(varchar(12),@date,102)
--end
--select dbo.DateOnly(GETDATE())
--2.��Ƕ��ֵ����
--create function fun1()
--returns table
--as
--return
--  select sno,sname,sdept
--  from student

--select *
--from fun1()
--create function fun2(@dept char(10))
--returns table
--as
--return 
--  select student.sno,cno,grade
--  from student,sc
--  where student.sno=sc.sno and
--        sdept=@dept

--select *
--from fun2('CS')

--������
--1.insert������

--create trigger tr_sc_insert on sc
--for insert
--as
--begin
--  declare @sno char(9)
--  select @sno=sno from inserted
--  if not exists
--  (
--    select *
--    from student
--    where sno=@sno
--  )
--  delete from sc where sno=@sno
--end
--insert into sc
--values('201215121','5',120)

--create trigger tr_sc_grade on sc
--for insert
--as
--begin
--  declare @score int
--  set @score=0
--  select @score=grade from inserted
--  if (@score<0 or @score>100)
--    begin
--      raiserror('�ɼ�������0-100֮��',16,10)
--      rollback transaction
--    end
--end

--2.update������

--create trigger tr_student_sname on student
--after update
--as
--begin
--  if update(sname)
--    begin
--      raiserror('ѧ�������������޸�',16,10)
--      rollback transaction
--    end
--end

--3.delete������
--create table s1
--(
--  sno char(9),
--  cno char(4),
--  grade smallint
--);

--create trigger tr_sc_delete on sc
--after delete
--as
--begin
--  insert into s1 select * from deleted
--end

--create trigger tr_stduent_delete
--on student for delete
--as
--begin
--  declare @sno char(9)
--  select @sno=sno from deleted
--  delete from sc where sno=@sno
--end

--create trigger tr_sc_update on sc
--instead of update
--as
--begin
--  print '�Ҷ��ӽ�����ӣ�'
--end
--update sc
--set grade=59
--where grade=80



--update������

--create trigger tr_student_update 
--on student
--after update
--as
--begin
--  if update(sname)
--    begin
--      raiserror('ѧ�������������޸ģ�',16,10)
--      rollback transaction
--    end
--end

--create trigger tr_sc_update on sc
--after update
--as
--begin
--  print '���Ƕ��Ǻú��ӣ�'
--end
--update sc
--set grade=59
--where grade=80
--create table s1
--(
--  sno char(9),
--  cno char(4),
--  grade smallint
--delete������

--create trigger tr_sc_delete on sc
--after delete
--as
--begin
--  insert into s1
--     select *
--     from deleted
--end

--create trigger tr_student_delete
--on student
--after delete
--as
--begin
--  declare @sno char(9)
--  select @sno=sno from deleted
--  delete from sc where sno=@sno
--end


--create trigger tr_sc_update1 on sc
--instead of update
--as
--begin
--  print '���Ƕ��Ǻú��ӣ���������'
--end

--update sc
--set grade=95
--where grade=92