TYPE=VIEW
query=select `u`.`id` AS `id`,`u`.`loginNo` AS `loginNo`,`u`.`password` AS `password`,`u`.`userName` AS `userName`,`u`.`organId` AS `organId`,`u`.`sex` AS `sex`,`u`.`tel` AS `tel`,`u`.`status` AS `status`,(case when isnull(`n`.`name`) then \'顶级区域\' else `n`.`name` end) AS `organName`,(case when (`u`.`sex` = \'1\') then \'男\' else \'女\' end) AS `sexName`,(case when (`u`.`status` = \'1\') then \'注销\' else \'正常\' end) AS `statusInfo` from (`ams`.`tbosuser` `u` left join `ams`.`tborgan` `n` on((`u`.`organId` = `n`.`id`)))
md5=34bc3ba418b33f15af9b7558c262e25c
updatable=0
algorithm=0
definer_user=root
definer_host=localhost
suid=2
with_check_option=0
timestamp=2012-09-12 06:52:12
create-version=1
source=select u.*,(case when n.name is null then \'顶级区域\' else n.name end) as organName ,\n(case when u.sex=\'1\' then \'男\' else \'女\' end) as sexName,\n(case when u.status=\'1\' then \'注销\' else \'正常\' end) as statusInfo from\ntbOsUser u\nleft join tborgan n\non u.organId=n.id
client_cs_name=utf8
connection_cl_name=utf8_general_ci
view_body_utf8=select `u`.`id` AS `id`,`u`.`loginNo` AS `loginNo`,`u`.`password` AS `password`,`u`.`userName` AS `userName`,`u`.`organId` AS `organId`,`u`.`sex` AS `sex`,`u`.`tel` AS `tel`,`u`.`status` AS `status`,(case when isnull(`n`.`name`) then \'顶级区域\' else `n`.`name` end) AS `organName`,(case when (`u`.`sex` = \'1\') then \'男\' else \'女\' end) AS `sexName`,(case when (`u`.`status` = \'1\') then \'注销\' else \'正常\' end) AS `statusInfo` from (`ams`.`tbosuser` `u` left join `ams`.`tborgan` `n` on((`u`.`organId` = `n`.`id`)))
