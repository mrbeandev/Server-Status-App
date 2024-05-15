<?php
// Function to check the status of a service using shell command
function checkServiceStatus($service)
{
    // Use appropriate command based on your server setup
    $output = shell_exec("systemctl is-active $service");

    // Analyze output to determine service status
    if (trim($output) == "active") {
        return true; // Service is active
    } else {
        return false; // Service is inactive
    }
}

// Array to store service status
$serviceStatus = array(
    "nginx" => checkServiceStatus("nginx"),
    "phpFpm" => checkServiceStatus("php8.1-fpm"),
    "mysql" => checkServiceStatus("mysql")
    // Add more services as needed
);

// Output service status as JSON
header('Content-Type: application/json');
echo json_encode($serviceStatus);
?>
