TYPE=VIEW
query=select `newland`.`t_workstation`.`workcode` AS `workcode`,`newland`.`t_network`.`id` AS `networkid`,`newland`.`t_workstation`.`networkcode` AS `networkcode`,`newland`.`t_network`.`name` AS `networkname` from `newland`.`t_workstation` join `newland`.`t_network` where (`newland`.`t_workstation`.`networkcode` = `newland`.`t_network`.`code`)
md5=eb05b119346cd93d32eb8f08787e7b07
updatable=1
algorithm=0
definer_user=root
definer_host=localhost
suid=2
with_check_option=0
timestamp=2012-02-17 08:10:59
create-version=1
source=select workcode,t_network.id as networkid,t_workstation.networkcode,t_network.name as networkname \nfrom t_workstation,t_network where networkcode = code
client_cs_name=utf8
connection_cl_name=utf8_general_ci
view_body_utf8=select `newland`.`t_workstation`.`workcode` AS `workcode`,`newland`.`t_network`.`id` AS `networkid`,`newland`.`t_workstation`.`networkcode` AS `networkcode`,`newland`.`t_network`.`name` AS `networkname` from `newland`.`t_workstation` join `newland`.`t_network` where (`newland`.`t_workstation`.`networkcode` = `newland`.`t_network`.`code`)
