<?php
  // Read the session cookie from the request headers
  $cookies = apache_request_headers()['Cookie'];

  // Extract the session cookie value
  preg_match('/PHPSESSID=([^;]+)/', $cookies, $matches);
  $session_cookie = $matches[1];

  // Log the session cookie value
  error_log('Session cookie value: ' . $session_cookie);

  // Send a response to the client
  header('Content-Type: text/plain');
  echo 'Service worker registration successful';
?>