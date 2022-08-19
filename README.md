# MyTones Project

The backend of a music streaming website

Being built little by little

For practicing and learning backend, using nodejs and express


# How to use:

You can clone this project and use it in a local environment, the things you gotta do is: 

1 - Add a .env file in the root folder and add the following variables inside it:

    
        ACCESS_TOKEN_SECRET="a secret password for generating and validating access tokens"
        REFRESH_TOKEN_SECRET="a secret password for generating and validating refresh tokens"
        DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE" (this is for prisma, I use postgres with it)
        MAIL_EMAIL="an email (that you have configured the settings in your gmail account) to send verification OTPs to users"
        MAIL_PASSWORD="the application password google gives you for that email"
        
    
    
2 - After that you have to install required packages with command:
    ```
        npm install
    ```  
    Then that you can run the server with nodemon useing the command:
    ```
        npm run dev
    ```  
    
You might also need to generate the prisma client(not sure if this is required):
    ```
        npx prisma generate
    ```  
    Or if you want to change or migrate the database:
    ```
        npx prisma migrate dev --name whateverName
    ```  


3 - After setting things up you can play around and test the API, the API DOCUMENTATION is located at:

    
        /api-docs
    


Other sections will be added.



# APIs:

/ :

    home page


/user/signup :

    signup with a username, email, and password


/user/login :

    login after user has validated their email (activates their refresh token)


/user/refreshToken :

    generate a new access token for the user using they'r refresh token


/user/validateEmail :

    validate user's email with a one time password sent to their email


/user/resendEmail :

    resends a new password to user if they haven't received the first one


/user/logout :

    logouts user using their refresh token (deactivates their refresh token)


/admin/get_members :

    gets an authentication header with an access token (Bearer token), displays a list of all users if token is valid and not expired

