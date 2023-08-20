Clone the repository and run these commands in your terminal(Make sure you inside the clonned repository's directory).

cd server
touch .env (then add a variable in that file by the name POLYGON_API_KEY="*your API KEY")
yarn install
yarn start



start a new terminal in clonned repository's directory and run these commands

cd client
yarn install
yarn start



Now got to http://localhost:3000
Enter a existing symbol (else you will get error)
Select a good date (here good means a date that wasn't a holiday/wekend)
There is a restriction on date. You can't select a future date.
Color of the date and symbol name is decided weather the candle of that day was green or red.

In backend we check the validity of date and wheath symbol name exist or not. 
If the submitted date is a weekend or a invalid date, server doesn't make any request to Polygon server.
* replace your API KEY with your own key.