# Node_JS_Learning

**Work flow:**
package.json > service.js > app.js > routes.js > controllers.js > services.js > database.js

1. mysql2:
2. express:
3. express-validator: For validation
4. sequelize: ORM framework

**Middleware:**
1. Logger: Write all api request in the log file under nodeLearningLogs folder
2. Logger for Error : Write all error in the log file under nodeLearningLogs folder
3. Error print: Print all error in the console
4. Auth: JWT access token validitation check for all api request
5. validaton: validate id, user data and other things

**Features:**
1. Gracefull shutdown:
2. ORM: Sequelize
3. Rate limit: 

**Security:**
1. JWT: access and refresh token
2. Corse
3. Helmet

**API End point:**
1. Get: /node-learning/security/tokens - get access and refresh token
2. Get: /node-learning/security/accessToken - regenerate access token by using refresh token
3. Get /node-learning/api/users - get all user list
4. Post /node-learning/api/users - create user
5. Get /node-learning/api/users/id - get a specefic user
6. Put /node-learning/api/users/id - update a specific user
7. Delete /node-learning/api/users/id - Delete a specific user
8. Get /node-learning/health/basic - Basic info of the system
9. Get /node-learning/health/system - System info
    
