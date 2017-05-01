TYPE=VIEW
query=select `s`.`workcode` AS `workcode`,`n`.`name` AS `name`,`n`.`code` AS `code` from `newland`.`t_workstation` `s` join `newland`.`t_network` `n` where (`s`.`networkcode` = `n`.`code`)
md5=eded550bc9bf5d1daa44edad5f349e47
updatable=1
algorithm=0
definer_user=root
definer_host=localhost
suid=2
with_check_option=0
timestamp=2012-02-17 08:27:25
create-version=1
source=select s.workcode ,n.name,n.code from t_workstation s , t_network n where s.networkcode=n.code
client_cs_name=utf8
connection_cl_name=utf8_general_ci
view_body_utf8=select `s`.`workcode` AS `workcode`,`n`.`name` AS `name`,`n`.`code` AS `code` from `newland`.`t_workstation` `s` join `newland`.`t_network` `n` where (`s`.`networkcode` = `n`.`code`)
