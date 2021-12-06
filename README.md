#Transaction api

This is a transactipon api

deployed in heroku and using MongoDB Atlas as a database.

anyone can access api link:

    baseusrl : https://transactionapihimanshu.herokuapp.com/

There are main apis
1st is login api
login api is used to get access token and this access token can be used to create and update transaction in databse

    path: <baseusrl>/login
    link: https://transactionapihimanshu.herokuapp.com/login

    request Body:
    {
    "username":"himanshu",
    "passwoed":"123"
    }

2nd transaction api
once u get access token
paste this token in header of any post request for creating transaction of type credit and debit

    path :  <baseusrl>/doTransactions

    *header*
    key :Authorization
    value: "Bearer <access_token>"

    there is 1 sapce between Bearer and Access token eg. {Authorization : "Bearer 2761gwa"}

    once header is set
    Request body should have these mandatory fields

    {
        "username":"nakul",
        "type": "CREDIT" | "DEBIT",
        "amount":100,
        "currency": "INR" | "USD" | "EURO" ,
        "status": "INPROGRESS" | "COMPLETED",
        "timestamp": 1214134141
    }

3rd once u add transactions in databse
u can view all transaction of particular user

        path:<baseurl>/user/:username
        example: https://transactionapihimanshu.herokuapp.com/user/nakul

4th is Statistics api
this api show all net balance and all credit and debit balance of particular user which has entered some transaction in database

        path: <baseurl>/user/:user/statistics

        where ":user" is user name

        eg: https://transactionapihimanshu.herokuapp.com/user/nakul/statistics
