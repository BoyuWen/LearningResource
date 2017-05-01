TYPE=VIEW
query=select `c`.`workstationcode` AS `workstationcode`,`c`.`trans_code` AS `trans_code`,count(`c`.`trans_code`) AS `trans_count`,count((case when (cast(`c`.`trans_amount` as decimal(10,0)) < 50000) then `c`.`trans_amount` end)) AS `five`,count((case when ((cast(`c`.`trans_amount` as decimal(10,0)) >= 50000) and (cast(`c`.`trans_amount` as decimal(10,0)) < 100000)) then `c`.`trans_amount` end)) AS `fivetoten`,count((case when ((cast(`c`.`trans_amount` as decimal(10,0)) >= 100000) and (cast(`c`.`trans_amount` as decimal(10,0)) < 200000)) then `c`.`trans_amount` end)) AS `tentotwenty`,count((case when (cast(`c`.`trans_amount` as decimal(10,0)) > 200000) then `c`.`trans_amount` end)) AS `twenty` from `newland`.`t_requestqueque` `c` join `newland`.`t_trans_code` `t` where (`c`.`trans_code` = `t`.`trans_code`) group by `c`.`workstationcode`,`c`.`trans_code`
md5=7e3f0130d519440c88447cfaac04a452
updatable=0
algorithm=0
definer_user=root
definer_host=localhost
suid=2
with_check_option=0
timestamp=2012-02-17 08:26:43
create-version=1
source=select c.workstationcode,c.trans_code,    \n			count(c.trans_code) as trans_count ,\n			count(case when cast(trans_amount as DECIMAL)<50000 then trans_amount end)  As \'five\',    \n			count(case when cast(trans_amount as DECIMAL)>=50000 and cast(trans_amount as DECIMAL)<100000  then trans_amount end)  As \'fivetoten\',    \n			count(case when cast(trans_amount as DECIMAL)>=100000  and cast(trans_amount as DECIMAL)<200000  then trans_amount end)  As \'tentotwenty\',    \n			count(case when cast(trans_amount as DECIMAL)>200000 then trans_amount end)  As \'twenty\'    \n			from t_requestqueque c,t_trans_code t    \n 			where c.trans_code=t.trans_code     \n			group by c.workstationcode,c.trans_code
client_cs_name=utf8
connection_cl_name=utf8_general_ci
view_body_utf8=select `c`.`workstationcode` AS `workstationcode`,`c`.`trans_code` AS `trans_code`,count(`c`.`trans_code`) AS `trans_count`,count((case when (cast(`c`.`trans_amount` as decimal(10,0)) < 50000) then `c`.`trans_amount` end)) AS `five`,count((case when ((cast(`c`.`trans_amount` as decimal(10,0)) >= 50000) and (cast(`c`.`trans_amount` as decimal(10,0)) < 100000)) then `c`.`trans_amount` end)) AS `fivetoten`,count((case when ((cast(`c`.`trans_amount` as decimal(10,0)) >= 100000) and (cast(`c`.`trans_amount` as decimal(10,0)) < 200000)) then `c`.`trans_amount` end)) AS `tentotwenty`,count((case when (cast(`c`.`trans_amount` as decimal(10,0)) > 200000) then `c`.`trans_amount` end)) AS `twenty` from `newland`.`t_requestqueque` `c` join `newland`.`t_trans_code` `t` where (`c`.`trans_code` = `t`.`trans_code`) group by `c`.`workstationcode`,`c`.`trans_code`
