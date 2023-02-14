You can view the Front End of the website on my friends gituhub: https://sajadzshoki.github.io/Mytones/ 

(The Back End is NOT Implemented on this link)


# MyTones Project

The backend of a music streaming website

Being built little by little

For practicing and learning backend, using node.js and express


# How to use:

You can clone this project and use it in a local environment, the things you gotta do is: 

1 - Add a .env file in the root folder and add the following variables inside it:

    
        ACCESS_TOKEN_SECRET="a secret password for generating and validating access tokens"
        REFRESH_TOKEN_SECRET="a secret password for generating and validating refresh tokens"
        DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE" (this is for prisma, I use postgres with it)
        MAIL_EMAIL="an email (that you have configured the settings in your gmail account) to send verification OTPs to users"
        MAIL_PASSWORD="the application password google gives you for that email"
        
    
    
2 - After that you have to install required packages with command:
    
        npm install
    
If you're on windows, get your WSL bash terminal, install redis and run it with command:
    
        redis-server
    
    
You might also need to generate the prisma client and migrate database before running the app, do it with:

    
        npx prisma migrate dev --name whateverName
    
        npx prisma generate
    
    
3 - Then you can run the server with nodemon useing the command:

    
        npm run dev
    
    


After setting things up you can play around and test the API, the API DOCUMENTATION is located at:

```
    /api-docs
``` 


Other sections will be added soon.



# How to use (With Docker):

(You should have Docker Desktop Installed)

1 - Clone the project, add the ```.env``` file, go to ```user.repository.ts``` file, uncomment the redisClient (socket) if commented, run ``` docker compose up -d ``` in the root folder (-d is optional to start docker container in background and hide logs from cmd),
then go to the ``` /api-docs ``` page and use ``` GET /admin/migratePrisma ``` and wait for it to be run (this is for setting up the DataBase).

That's it, you're all setup!

- To add the ```.env``` file, you can look the settings in step 1 of the ```How to use``` above.
I also included the DATABASE_URL path you need to use in it in the ```docker-compose.yml``` file as a comment, just copy and paste it to ```.env``` and you're done.

If something goes wrong repeat step 1 XD

When you're done you can either ``` docker compose down ``` or close the container from the UI app.


---


# APIs:  documentation in swagger (/api-docs) 


- HOME PAGE

/ :

    home page

#

- USER APIs

/user/signup :

    creates a user with a username, name, lastname, email, and password, 
    sends a 6 digit password to user's email afterwards.


/user/resendEmail :

    resends a new password to user if they haven't received the last one.


/user/validateEmail :

    validate user's email with the one time password sent to their email, so they can login.


/user/login :

    login after user has validated their email (activates their refresh token).
    gives a refresh token and an access token.


/user/refreshToken :

    generate a new access token for the user using their refresh token.


/user/logout :

    logouts user using their refresh token (deactivates their refresh token).

#

- ADMIN APIs

/admin/users :

    Gets an authentication header with an access token (Bearer token), 
    displays a list of all users if token is valid and not expired.


/admin/getUsersTokenless :

    Displays a list of all users without token required.


/admin/migratePrisma :

    Migrates and sets up the database (mostly for docker).


/admin/music :

    Gets a list of everything music related in the database [Songs, Artists, Albums, Playlists, Favorites].


/admin/deleteDatabase :

    Used for clean up or before changing database, will be deleted before deployment.

#

- MUSIC APIs

POST /music/song :

    Crates and uploads a song (required parameters in the /api-docs).


GET /music/song:

    Gets song name or a part of it, Brings back all matching results.


POST /music/artist:

    Crates an Artist (required parameters in the /api-docs).


GET /music/artist:

    Gets artist name or a part of it, Brings back all matching results.


POST /music/playlist:

    Crates a Playlist (required parameters in the /api-docs).


GET /music/playlist:

    Gets user_id, Brings back all user's playlists.


POST /music/album:

    Crates an Album (required parameters in the /api-docs).


GET /music/album:

    Gets album name or a part of it, Brings back all matching results.
    
    
PUT /music/actions:

    Create/Delete an action by user_id, target_id[song/artist/album], and Type[SONGS/ARTISTS/ALBUMS/DOWNLOADS/PLAY/LIKE].


GET /music/actions:

    Gets user_id and actions's Type[SONGS/ARTISTS/ALBUMS/DOWNLOADS/PLAY/LIKE], Brings back an action list.
    
- Static API

GET /static/{songPath}
    Downloads a song by its path in the server

