# 数据库

```mysql
Drop database if exists xxx
datetime yyyy-mm-dd
unsigned (无符号数，不为负数的整数)
engine=innodb default charset=utf8
desc xx 查看表的结构
ORM (对象关系y)
show create database xxx  -- 查看创建数据库的语句
show create table xxx -- 查看创建表的定义语句
desc xxx  --显示表的结构
engine=innodb default  charset=utf8
```

## 修改表

```mysql
alter table xxx rename as yyy   -- 修改表
alter table xxx add age int    -- 增加表的字段
alter table xxx modify age varchar(10) -- 修改字段的约束
alter table xxx change age age1 int -- 字段重命名
--------------------------------
drop table if exists xxx -- 删除表
alter table xxx drop age -- 删除字段
alter table xxx add constraint  '约束名' foreign key '作为外键的列' references '哪个表'('那个字段')
------------------------------------------------------------
update xxx set '属性'=,'属性=' where 
update xxx set '属性'=current_time where   -- 给属性插入当前的时间
current_timestamp();
```

## 删除

```sql
truncate xxx  -- 清空表  影响自增
delete from xxx -- 清空表  不影响自增
```

##  DQL

```sql
select concat('姓名：','属性')AS '新名字' from xxx  -- 起别名
select distinct '属性' from xxx -- 去重
```

## 模糊查询

```sql
select '属性1','属性2'from xxx where '属性' like '刘%'-- 查到姓刘的
select '属性1','属性2'from xxx where '属性' like '刘_'-- 查到姓刘x
select '属性1','属性2'from xxx where '属性' like '刘__'-- 查到姓刘xx
select '属性1','属性2'from xxx where '属性' like '%泽%'-- 查到中间带泽字的
-------------------------------------
select '属性1','属性2'from xxx where '属性' in (1001,1002,1003)-- 查到 1001到1003范围的
```

## 联表查询

```sql
```

