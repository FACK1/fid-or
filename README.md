# fid-or

### Our App

The app's idea is a todoList, which allows the other to add their tasks and stores it in a database to be retrieved later. The app is still under work, so it's still missing many features. 

### What we could do
1- Set up our server.

2- Connect it to the Database.

3- Retrieve all the dummy data from our website automatically when the page first loads, using fetch and then manipulation.

### What we still need to do

1- Make the add button functional, by using a post request.

2- Add delete buttons, and mark as completed (or not) buttons and make them functional too.

### Things we missed out

1- Testing. All kinds of testing. For the functions, server, and database.

2 - Hosring our app on Heroku. (We included a section at the bottom to explain how to run it on your machine). 

### How to run our app on your machine?

1- Clone this repo. 

#### Before you move on to the next steps, you need to have psql and pgcli installed on your machine. (Keep in mind that pgcli is actually optional, but we're going to use it here for its simple commands and nice layout of data).

2- Now run the command ```CREATE DATABASE tododb;``` on your terminal, after you cd into the repo you just cloned. This command will create a database. Notice how there should be a semi-colon after every command.

3- Then, run the command ```CREATE USER todouser with password '0000';```. This will create a user called "todouser", with a password of 0000.

4- Then, run ```GRANT ALL PRIVILEGES ON DATABASE tododb to todouser;```. This command will grant our todouser with all priviliges and rights to use and access the database.

5- Go the root directory ("fid-or" in this case), make a file "config.env".

6- Copy paste this into the file. "DB_URL = postgres://todouser:0000@localhost:5432/tododb". This is to establish connection between our server and database. And it is used throughout the code of the app.

7- Now, we need to install two modules that our app relies on to funciton. Those are **pg** and **env2**. Run the command ```npm i pg env2``` to install them in one go. 

8- Now we have a file called "db_build.js" in the repo. Which is basically what builds our database. So, run this command ```node <path to the file/>``` which in our case it's ```node src/database/db_build.js```. 

9- Go to your browser, and in the URL field, write: ```localhost:7000``` and hit enter.

10- Now you should have our app running! 

#### If you are having trouble with running the app let us know by making an issue! And if you think we missed anything also let us know!
