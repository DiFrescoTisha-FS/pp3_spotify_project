# Spotify Search App</br>

## Project Overview:

#### The Spotify Search App is a web application that allows users to search for an artist, album, or playlist through the Spotify API. You must have a Spotify account to log in and access their media. Once a search term has been entered into the input field and chooses the category they want to search from the drop down button, the the search results will be displayed. The user will also be able to click on the thumbnail and be redirected to the Spotify website where they can listen to their selection. This project employs MongoDB (database) in order to track and keep up with OAuth JSON web tokens.

----

## Prerequisites:

* MongoDB >= 5.1
* @next-auth/mongodb-adapter>= v1.1.3
* NodeJS >= v16.13.0

* npm >= v8.1.0
* Yarn >= v1.22.19
* Chrome/Firefox/Safari/Edge >= Latest 2 major versions

---

## Technologies:

* MongoDB
* Next-Auth MongoDB Adapter
* Next.js
* Next-Auth
* React
* TailwindCSS
* NodeJS
* Spotify API

---

## Getting Started
    
 #### You must have a ```.env.local``` file to run the application. This file allows sensitive information, such as user credentials, to be stored in a local environment. This file should be added to a ```.gitignore``` file so that it is not uploaded to code repositories online for everyone to read. This can be achieved by making a copy of the ```.env.dist``` file and change the name to ```.env.local``` by running the following command in terminal:
 ```javascript
cp .env.dist .env && vim .env
```
#### Next, you must add your own environment variables inside the file.
#### The next step is to add the dependencies (node modules) by running the following command:
```javascript 
npm install
```
#### Once all dependencies have been installed, you can run the project.

## To Run Next.js 
```javascript
npm run dev
```
---

## Links
#### Links to the project include the following:

| Route                | Description                                                      |
|----------------------|------------------------------------------------------------------|
| http://localhost:3000 | Link to Next.js base URL that Spotify application runs on.       |
| /api/auth/signin     | Sign in to Spotify for authorization.                             |
| /login               | Authorized login                                                 |
| /search              | Search for artist, album, and playlist.                          |

<img width="1792" alt="Screenshot 2023-05-11 at 6 55 00 PM" src="https://github.com/DiFrescoTisha-FS/pp3_spotify_project/assets/81319127/d040b743-67d3-4f99-8994-6cf969c3239e">

