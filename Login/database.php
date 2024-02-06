<?php

$host = "localhost";
$dbname = "login_db";
$username = "debian-sys-maint";
$password = "t3cnpiojzprmIFPy";

$mysqli = new mysqli(hostname: $host,
                     username: $username,
                     password: $password,
                     database: $dbname);
                     
if ($mysqli->connect_errno) {
    die("Connection error: " . $mysqli->connect_error);
}

$mysqli = require __DIR__ . "/database.php";
return $mysqli;