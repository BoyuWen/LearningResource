@echo off
@echo Mysql startup ...
start bin\mysqld-nt.exe --no-defaults --skip-bdb --skip-innodb --log=log.txt --default-character-set=gbk
exit