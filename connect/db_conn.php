<?php

    $db_id = 'dbtmdfl12';
    $db_pwd = 'tmdfl33##';
    $db_name = 'dbtmdfl12';
    $host = 'localhost';

   try{
   $db_source = "mysql:host={$host};dbname={$db_name}";
   $db = new PDO($db_source, $db_id, $db_pwd);
   $db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false); // prepares 기능 지원 안할 시 db 기본 기능 사용
   $db->setAttribute(PDO::MYSQL_ATTR_USE_BUFFERED_QUERY, true); // 참조 : https://zzins.tistory.com/1270
   $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // 에러 발생 시 예외처리


   // echo 'DB Connected successfully';

 } catch(PDOException $err){
   echo $err->getMessage();
 }


?>