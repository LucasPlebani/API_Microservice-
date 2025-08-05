Lancer le serveur :
npm start server.js

vérifier que le serveur tourne bien :
http://localhost:3000/api/healthcheck

// routing 
get http://localhost:8080/api/auth 
post http://localhost:8080/api/auth/register 
{
  "type": "particulier",
  "lastName": "doe",
  "firstName": "john",
  "email": "john@doe.com",
  "password": "azerty123"
}

post  http://localhost:8080/api/auth/login
{
  "email": "john@doe.com",
  "password": "azerty123"
}
get http://localhost:8080/api/auth/healthcheck

