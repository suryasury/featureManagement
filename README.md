# Feature Management

1. Download and install NodeJS(LTS Version) from [here](https://nodejs.org/en/).
2. Download and install mysql from [here](https://dev.mysql.com/downloads/windows/installer/8.0.html).
3. Clone repository from [here](https://github.com/suryasury/featureManagement)

## Installation

1. Open project in visual studio code.
2. Run the following command inside the project directory. This will install all the dependencies for the project.

```bash
npm install
```
3. Run the following command to run the project.
```bash
npm start
```
4. Server will run in localhost under the port 8080

## APIS
#### 1. Fetch Features and treatments for user.

```bash
# Endpoint
/api/feature/fetchUserFeatures
# Method: POST

#Payload
{
  "userId":1,
}
```

#### 2. Creating a user 

```bash
# Endpoint
/api/feature/addUser
# Method: POST

#Payload
{
  "userName":"",
  "phoneNumber":""
}
```

#### 3. Creating a feature

```bash
# Endpoint
/api/feature/addFeature
# Method: POST

# Payload
{
  "featureName":"Dashboard",
  "featureStatus":"true"
}
```
#### 4. Creating a Group
```bash
# Endpoint
/api/feature/createGroup
# Method: POST

# Payload
{
  "groupName":"Premium group",
}
```
#### 5. Assign feature to user
```bash
# Endpoint
/api/feature/assignFeatureToUser
# Method: POST

# Payload
{
  "userId": 10,
  "featureId": 3,
  "featureStatus": false
}
```
#### 6. Assign feature to Group
```bash
# Endpoint
/api/feature/addFeatureToGroup
# Method: POST

# Payload
{
  "featureId": 5,
  "groupId": 2,
  "featureStatus":"true" 
}
```
#### 7. Assign User to Group
```bash
# Endpoint
/api/feature/assignUserToGroup
# Method: POST

# Payload
{
  "groupId":1,
  "userId":8
}
```
#### 8. Fetch all users
```bash
# Endpoint
/api/feature/getAllUsers
# Method: GET
```
#### 9. For the admin panel hit the following URL,
```bash
HTTP://localhost:8080/admin
```
