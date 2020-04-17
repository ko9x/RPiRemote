go to cydia and install mterminal and openssh

close cydia

open mterminal

type su then return

type alpine then return

type ssh-keygen then return

hit return to use the default ssh-keys location

hit enter to leave the password blank

hit enter again to confirm leaving the password blank

type cat ~/.ssh/id_rsa.pub this will let you view your key

copy the key and email it to yourself

now add that key to the authorized_keys file located at /home/pi/.ssh on the raspberry pi

now you can ssh into the raspberry pi from the iphone without a password




