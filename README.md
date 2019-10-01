
# BudgetManager

This is a simple web application to track the income and expense. User can register, login and, add, remove or edit the income or expense item details.

### For Live Demo, [Click here](https://ravi879.github.io/BudgetManager-Angular-Spring-Boot/homepage).


## Screenshot

1. Homepage
![Screenshot 1](https://github.com/Ravi879/BudgetManager-Angular-Spring-Boot/blob/master/screenshot/homepage.jpg "")

2. Dashboard
![Screenshot 2](https://github.com/Ravi879/BudgetManager-Angular-Spring-Boot/blob/master/screenshot/dashboard.jpg "")


## Features
- sign up, sign in
- auto login
- user guide
- session handling
- secured REST end point
- CRUD operation


## Built With

- Angular 7
- Bootstrap 4
- Spring Boot 2.1.5, Spring security
- MySQL

## Prerequisites

* Intellij or Eclipse IDE.
* WebStorm or Visual Studio Code.
* MySQL Workbench ([click here for download](https://dev.mysql.com/downloads/workbench/))
* Angular([click here for installation steps](https://www.javatpoint.com/angular-7-installation))


## Open and Run Project

**For Database:**
1. open MySQL Workbench.
2. create a new database named as "db_budget_manager".

**For Spring Boot application:**
1. open [spring-boot-app](https://github.com/Ravi879/BudgetManager-Angular-Spring-Boot/tree/master/spring-boot-app) in your Intellij or Eclipse IDE.
2. configure following properties in application.properties, as per your database configuration.

> spring.datasource.url=jdbc:mysql://localhost:3306/db_budget_manager?useSSL=false
> spring.datasource.username=root
> spring.datasource.password=root

3. Run the project.

**For Angular application:**
1. open [angular-app](https://github.com/Ravi879/BudgetManager-Angular-Spring-Boot/tree/master/angular-app) in WebStorm or Visual Studio Code.
2. open command prompt in anglar-app directory.
3. run command "npm install".
4. run command "ng serve".

## RESTful API ##

> **Secure Route**: /budgety/item/**

**1. API Description for User realted action**
base = /budgety/user/

METHOD | PATH | DESCRIPTION
------------|-----|------------
POST | /register | new user registration
POST | /login | user login
POST | /logout | user logout.
GET | /logout.success | on success of logout process.
GET | /session.expired | if session is expired then redirect to this path.

**2. API Description for Item(Income or Expense)**
base = /budgety/item/

METHOD | PATH | DESCRIPTION
------------|-----|------------
GET | /all | get all items
PUT | /income/{id} | create or update item income
PUT | /expense/{id} | create or update item expense
DELETE | /income/{id} | delete income with id
DELETE | /expense/{id} | delete expense with id



## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- This project is licensed under the **[MIT license](http://opensource.org/licenses/mit-license.php)**.

## Support

Please feel free to submit [issues](https://github.com/Ravi879/BudgetManager-Angular-Spring-Boot/issues) with any bugs or other unforeseen issues you experience.


## Author

- Ravi Gadhiya  
[https://github.com/Ravi879](https://github.com/Ravi879)  
[https://www.linkedin.com/in/gadhiyaravi](https://www.linkedin.com/in/gadhiyaravi)  


### Why I have create this repository?

I was learning the spring boot and angular framework, and wanted to build something with what i have learnt. So i thought create a simple application which have the basic functionality like, login, registeration, session management and CRUD operation. I have create the spring boot application with spring security for securing REST API and consuming it from the angular application.


### Thanks

I'm always happy to hear your feedback!
Enjoy 🤘

