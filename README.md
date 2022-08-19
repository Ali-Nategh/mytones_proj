# mytones_proj

The backend of a website

Being built little by little

# How to use:

You can clone this project and use it in a local environment, the things you gotta do is: 

1 - Add a .env file in the root folder and add the following variables inside it:

    ```
        ACCESS_TOKEN_SECRET="a secret password for generating and validating access tokens"
        REFRESH_TOKEN_SECRET="a secret password for generating and validating refresh tokens"
        DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE" (this is for prisma, I use postgres with it)
        MAIL_EMAIL="an email (that you have configured the settings in your gmail account) to send verification OTPs to users"
        MAIL_PASSWORD="the application password google gives you for that email"
        
    ```
    
2 - After that you have to install required packages with command:
    ```
        npm install
    ```
    And after that you can run the server with nodemon useing the command:
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
    ``` 
        /api-docs
    ```


# Features:

-Signup:

```
    jwt and authentication

    access and refresh tokens

    login and logout to Activate or Deactivate refresh tokens
```

-Verify Email

```
    an email verification otp service
```

-Resend Email verification

```
    resend the otp if user didn't receive it
```
