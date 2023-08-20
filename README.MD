Clone the repository and run these commands in your terminal(Make sure you are inside the cloned repository's directory).  

cd server  
touch .env (then add a variable in that file by the name POLYGON_API_KEY="*your API KEY")  
yarn install  
yarn start  



start a new terminal in cloned repository's directory and run these commands.  

cd client  
yarn install  
yarn start  



Now got to http://localhost:3000  
Enter an existing symbol (else you will get the error)  
Select a good date (here good means a date that wasn't a holiday/weekend)  
There is a restriction on date. You can't select a future date.  
The colour of the date and symbol name is decided by the colour of the candle of that day.  

In the backend, we check the validity of the date and whether the symbol name exists or not.   
If the submitted date is a weekend or an invalid date, the server doesn't make any request to the Polygon server.  
* replace your API KEY with your key.  
