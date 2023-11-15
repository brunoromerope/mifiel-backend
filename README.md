# MIFIEL WIDGET


A simple API built with NestJS, Mongoose, MongoDB, Express and @mifiel/api-client. The API offers user registration, login, PDF creation and MIFIEL document sign and managment.



## Getting Started

Follow these steps to get the application up and running:

##### 1. Clone this repository to your local machine:

```
git clone <repository-url>
cd <repository-directory>
```
##### 2. Install the required npm packages:

```
npm install
```
##### 3. Create a `.env` file in the root directory of the project with the following content:

```
APP_ID=<your-MIFIEL-id>
APP_SECRET=<your-MIFIEL-secret>
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret>
```

##### 4. Start the server:

```
npm run start
```

The API should now be running. Access it in your web browser at `http://localhost:<your-preferred-port>`

### Usage

- `/auth/register` Register a new user with email and password.

- `/auth/login` Login a user with email and password.

- `/pdf` Creates pdf file to sign.

- `/document` Fetch MIFIEL document.

- `/api` Webhook for signed documents



### License

This project is licensed under the MIT License.