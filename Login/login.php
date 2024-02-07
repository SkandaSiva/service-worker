<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();

$is_invalid = false;

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST["name"])) {
    
    $mysqli = require __DIR__ . "/database.php";
    
    $name = $mysqli->real_escape_string($_POST["name"]);
    
    $sql = sprintf("SELECT * FROM user WHERE name = '%s'", $name);
    
    $result = $mysqli->query($sql);
    
    $user = $result->fetch_assoc();
    
    if ($user && isset($_POST["password"])) {
        
        if (password_verify($_POST["password"], $user["password_hash"])) {
            
            session_regenerate_id();
            
            $_SESSION["user_id"] = $user["id"];
            
            // Debugging statement
            var_dump("Redirecting");
            
            header("Location: success-2.html");
            exit;
        }
     }
    
    $is_invalid = true;
}

// Debugging statement
var_dump("Not Redirecting");

// Rest of your code (HTML form, error messages, etc.) goes here
?>
