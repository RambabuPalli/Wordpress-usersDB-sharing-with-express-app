# Wordpress-usersDB-sharing-with-express-app
Wordpress DB sharing with thirdparty program

I couldn't find which type of hashing the wordpress is using, so i added a plugin to change the wordpress password hashing to bcrypt (https://wordpress.org/plugins/wp-bcrypt/)
I choose bcrypt because its the same hashing function used in the existing TSO API.
Now with these changes, the users table of wordpress is being shared with the express app and vice verse.
We can further use this same method to keep the wordpress mysql DB data synchronised with TSO's MongoDb data using a Node API.
