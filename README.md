
# React Amplify Starter

**Note: You will need an AWS account to get this project integrated with AWS using AWS Amplify. This tutorial will provision AWS resources that YOU WILL GET CHARGED for if you are not using a Free Tier AWS account!** 

AWS Amplify is an open source JavaScript library provided by Amazon Web Services that enables developers to build applications with cloud services on web or mobile platforms. This starter project uses the AWS Amplify Command Line Interface to provision hosting and authentication resources in AWS to get a cloud hosted and authentication protected React app up and running.

This app can be started immediately by running `npm start` however authentication will not be working properly without provisioning auth resources by following steps in this tutorial.

## Install and Configure the AWS Amplify CLI
Install the AWS Amplify CLI:
```
npm install -g @aws-amplify/cli
```
Configure amplify:
```
amplify configure
```
Follow the prompts and choose default values. Once complete, initialize amplify by running the following command in the project's root directory :
```
amplify init
```
Follow the prompts and choose default options. Put `dev` as your environment name and make sure to pick `javascript` as the type of app and `react` as the framework you are using.

## Add Authentication to the Project
Create the auth configurations locally by running the following command in the root directory of the app.
```
amplify add auth
```
Choose the default options and then run the following command to provision your resources in the cloud:
```
amplify push
```
At this point you can start the app locally by running  `npm start` and you can now register users and see the authentication in action!

## Add Cloud Hosting
Create cloud hosting configurations locally by running the following command in the root directory of your app:
```
amplify add hosting
```
Choose the default options and then publish your changes to AWS by running the following command:
```
amplify publish
```
Now you should have a fully functioning app complete with authentication deployed to the cloud!
  

## Check out the app

Try to go to the /secret route by clicking the "Auth protected route" link in the header. If you are not logged in you will get redirected to the login page. Create a user and login and you should be redirected to the /secret page which you can now view because you are authenticated.