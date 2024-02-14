<?php

$host = "localhost";
$dbname = "login_db";
$username = "phpmyadmin";
$password = "p@ssw0rd";

$mysqli = new mysqli(hostname: $host,
                     username: $username,
                     password: $password,
                     database: $dbname);
                     
if ($mysqli->connect_errno) {
    die("Connection error: " . $mysqli->connect_error);
}

return $mysqli;

?>