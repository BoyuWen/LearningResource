TYPE=VIEW
query=select `m`.`id` AS `id`,`m`.`facId` AS `facId`,`m`.`model` AS `model`,`m`.`remark` AS `remark`,`m`.`updateTime` AS `updateTime`,`f`.`name` AS `name`,`f`.`shortName` AS `shortName` from (`ams`.`tbmodel` `m` left join `ams`.`tbfacturer` `f` on((`m`.`facId` = `f`.`facId`)))
md5=96f088c2a2f3dc7d5ac48a6398ca040e
updatable=0
algorithm=0
definer_user=admin
definer_host=%
suid=2
with_check_option=0
timestamp=2012-09-17 02:52:25
create-version=1
source=SELECT\nm.id AS id,\nm.facId AS facId,\nm.model AS model,\nm.remark AS remark,\nm.updateTime AS updateTime,\nf.`name`,\nf.shortName AS shortName\nfrom tbmodel m left join tbfacturer f on m.facId = f.facId
client_cs_name=utf8
connection_cl_name=utf8_general_ci
view_body_utf8=select `m`.`id` AS `id`,`m`.`facId` AS `facId`,`m`.`model` AS `model`,`m`.`remark` AS `remark`,`m`.`updateTime` AS `updateTime`,`f`.`name` AS `name`,`f`.`shortName` AS `shortName` from (`ams`.`tbmodel` `m` left join `ams`.`tbfacturer` `f` on((`m`.`facId` = `f`.`facId`)))
