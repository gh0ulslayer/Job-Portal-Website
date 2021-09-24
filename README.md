# JOB PORTAL App

## Running the appp


Run Express:
```
cd backend/
npm install
npm start
```

Run React:
```
cd frontend
npm install/
npm start
```
Navigate to localhost:3000/ in your browser.

## Functions
### Register
``` 
A user can create a new account by giving their name,email,password,usertype. 
```
### Login
``` 
For login, You should give username, usertype,and password of your account.
```
Type of users:
* Recruiter
* Applicant

### Use case of Recruiter

There are four buttons:

* Create a new Job
```
title , salary , max positions , max applications ,deadline , job type , duration (all should be non null)
```
* Show his jobs
```
 Jobs with title, salary, positions remaining , no of applicants  are shown.
```
* Accepted applications
```
 Shows accepted applicants and allows the recuruiter to rate them.
```
* View Profile
```
 Shows the profile with editing option in which bio is not accepting more than 250 words.
```

### Use case of Applicant

There are 3 Buttons:
* All Jobs
```
1. Shows all active jobs with recruiter name , salary , job duration , job type and the deadline of its application with an apply button.
2. Gives the applicant various features including search basis on job title , sorting the jobs based on salary , duration , rating along with a filter option on salary, duration(0-6) and job type(Part time , full time , work from home) 
```
* Show my applications
```
1. Shows all the applications which the current logged in applicant has applied on.
2. Displays the job title , recruiter name , job rating ,salary , job duration , status of the job (applied , shortlisted) with a rating option on the applications  which has been accepted.
```
* View Profile
```
 Show the applicant's profile with an editing option in which education can be dynamically added.
```
