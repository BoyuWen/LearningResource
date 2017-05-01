TYPE=VIEW
query=select `s`.`id` AS `id`,`s`.`organId` AS `organId`,`s`.`facId` AS `facId`,`s`.`model` AS `model`,`s`.`serialNo` AS `serialNo`,`s`.`remark` AS `remark`,`s`.`updateTime` AS `updateTime`,`f`.`name` AS `fname`,`f`.`shortName` AS `fshortname`,`o`.`name` AS `oname`,`o`.`shortName` AS `oshortname` from ((`ams`.`tbscanner` `s` left join `ams`.`tbfacturer` `f` on((`s`.`facId` = `f`.`facId`))) left join `ams`.`tborgan` `o` on((`s`.`organId` = `o`.`id`)))
md5=a8c1ca284b5d6cf51512b82852697e31
updatable=0
algorithm=0
definer_user=admin
definer_host=%
suid=1
with_check_option=0
timestamp=2012-09-17 08:53:59
create-version=1
source=SELECT\n	`s`.`id` AS `id`,\n	`s`.`organId` AS `organId`,\n	`s`.`facId` AS `facId`,\n	`s`.`model` AS `model`,\n	`s`.`serialNo` AS `serialNo`,\n	`s`.`remark` AS `remark`,\n	`s`.`updateTime` AS `updateTime`,\n	`f`.`name` AS `fname`,\n	`f`.`shortName` AS `fshortname`,\n	`o`.`name` AS `oname`,\n	`o`.`shortName` AS `oshortname`\nFROM\n	(\n		(\n			`tbscanner` `s`\n		LEFT JOIN `tbfacturer` `f` ON((`s`.`facId` = `f`.`facId`))\n		)\n	LEFT JOIN `tborgan` `o` ON((`s`.`organId` = o.id))\n	)
client_cs_name=utf8
connection_cl_name=utf8_general_ci
view_body_utf8=select `s`.`id` AS `id`,`s`.`organId` AS `organId`,`s`.`facId` AS `facId`,`s`.`model` AS `model`,`s`.`serialNo` AS `serialNo`,`s`.`remark` AS `remark`,`s`.`updateTime` AS `updateTime`,`f`.`name` AS `fname`,`f`.`shortName` AS `fshortname`,`o`.`name` AS `oname`,`o`.`shortName` AS `oshortname` from ((`ams`.`tbscanner` `s` left join `ams`.`tbfacturer` `f` on((`s`.`facId` = `f`.`facId`))) left join `ams`.`tborgan` `o` on((`s`.`organId` = `o`.`id`)))
