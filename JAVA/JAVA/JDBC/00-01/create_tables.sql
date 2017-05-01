CREATE TABLE `employees` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(20) default NULL,
  `job_id` int(11) default NULL,
  `level_id` int(11) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `jobs` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(20) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `pay_level` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(20) default NULL,
  `base_pay` double(15,3) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;