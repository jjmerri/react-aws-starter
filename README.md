# react-amplify-starter
**Note: You will need an AWS account to get this project integrated with AWS Amplify and Amzon Cognito**

Install the amplify cli by running the following command:
```
npm install -g @aws-amplify/cli
```

Configure amplify by running the following command
```
amplify configure
```
Follow the prompts and choose default values. Once complete initialize amplify by running :
```
amplify init
```
Follow the prompts and choose default options. Put `dev` as your environment name and make sure to pick javascript as the type of app and react as the framework you are using.

Add amplify hosting by running the following command:
```
amplify add hosting
```
Choose the default options and then publish your changes by running the following command:
```
amplify publish
```
Now that we have hosting set up add authentication to your project by running the following command:
```
amplify add auth
```
Choose the default options and then run the following command to provision your resources in the cloud:
```
amplify push
```
Build and deploy the changes by running the following command:
```
amplify publish
```
Now you should have a fully functioning app complete with authentication deployed to the cloud!

## Check out the app
Try to go to the /secret route by clicking the "Auth protected route" link in the header. You will get redirected to the login page. Create a user and login and you should be redirected to the /secret page which you can now view because you are authenticated.