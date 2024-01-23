# Bookstore

Welcome to the Bookstore Project. This is project is meant to serve as practice for web development. For that intent it will use NodeJs as the package manager, Express as the backend api tool, React as the frontend framework, and MongoDB as NOsql database. Esentially, a very basic MERN Aplication. 
If you don't have either NodeJs or MongoDB installed in your device. Click the following links and download them.
 [Dowload MongoDB](https://www.mongodb.com/es)
 [Download NodeJS](https://nodejs.org/en/download/current)

## Database
Currently, the Database is handled locally. I intent to change it and implement a remote db with MongoDB Atlas in the near future. However, this will have to do for now. If you already installed MongoDB, you must connect to the default uri (normaly it is http://localhost:27017), create a database called 'bookstore' and within that database create a collection called 'books'.

## Cloning the project
Now you have to clone the project from this repository. Once that's done you'll have the raw code of the application. However this will not work without the dependencies it needs. 
### Server
This folder is the app's backend. It implements ExpressJS to handle the requests and responses of the API. So in order for it to work, you'll have to install the necessary dependencies through NodeJs. These are express and nodemon. 
First you'll have to go to the server folder, and not stand on the root folder, in order to prevent problems in the long run
>cd server 

And now you may install the libraries
>npm install express
>npm install nodemon
>npm install mongodb

You can doublecheck this by looking at the package.json file. These libraries should appear in the dependencies.
Once that's ready, the backend should work. You can test it by running nodemon (you can specify the name of the file eg. nodemon server.js or simply use nodemon i or nodemon . if you are standing on the server folder) and if there's no problem when starting the server.js file, then you may procede with what's next.
>nodemon .
### Client
The client folder contains the frontend of the application, that is the React application. When you clone the folder all the files and components will be copied. However this won't work like this. There must be some preparation first. If a node modules folder was copied along, you must delete it. Then you have to prompt the command npm install
>npm install

If you find the instructions vague (I don't blame you) here's a video that goes further into detail
[Clone a React app from GitHub](https://www.youtube.com/watch?v=i8KuDon82KM)

---
This ought to be enough to get the application running. Of course the database will initially be empty for it is locally handled. Like I said, I intent to change this by implementing MongoDB Atlas. But all the functionalities should work out correctly

:)
