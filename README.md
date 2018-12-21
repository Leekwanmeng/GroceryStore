# Grocery Store

Online web grocery store built on Vue.js, Node.js and MySQL

`backend/` contains code for Node.js, main script at `app.js`

`backend/routes` contains API routes for Node.js, to be queried by Vue.js

`frontend/` contains code for Vue.js


## Setup
```
# install Vue cli
npm install -g @vue/cli

# clone repository
git clone 
```

### Serve web page
```
cd frontend/

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev
```

### Serve web server
In a separate terminal:
```
cd backend/

# install dependencies
npm install

# served at localhost:3000
nodemon app.js OR node app.js
```

### Initialise database
Using MySQL Workbench or any other MySQL Interface, run the `createAllTable.sql` script. Do necessary INSERTs and observe element changes on reload.


## Screenshot
![Alt text](/screenshots/webstore.png?raw=true "Web Store")

