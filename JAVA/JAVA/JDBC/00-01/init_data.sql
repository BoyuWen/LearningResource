update  `pay_level` set base_pay=base_pay+100
where id in(select DISTINCT `pay_level`.id
            from `employees`,`pay_level`
            where `pay_level`.`base_pay`<1200 
                   and `pay_level`.id=`employees`.`level_id`
           )
          