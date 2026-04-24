Testing: 
Start backend server 
Ensure callback url:  http://localhost:3000/auth/google/callback

Open browser and go to: 
http://localhost:3000/auth/google
Your backend is sending token like: res.redirect("/dashboard?token=" + token);

So after login, you will see this in your browser URL: 
http://localhost:3000/auth/dashboard?token=eyJhbGciOiJIUzI1NiIsInR… 

Copy the JWT token from this URL. 


GET http://localhost:3000/auth/api/profile 
Use inside postman:  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJnb29nbGVJZCI6IjExMzc2MjQyNzI0MTczNDMyNDIwMCIsIm5hbWUiOiJIZWxhbCBLaGFuIiwiZW1haWwiOiJoZWxhbC5iaml0QGdtYWlsLmNvbSIsImlhdCI6MTc2NDA1MjA2MywiZXhwIjoxNzY0MDU1NjYzfQ.YySd0ZmIdsVMygc4VaTF0E2P7V9q1T_SfEFOEcEdhrI
