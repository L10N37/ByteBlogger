<h1 align="center">CMS-Style Blog Site</h1>

<p align="center">
  <img src="https://your-image-url.com" alt="Project Screenshot">
</p>

<p align="center">
  CMS-Style Blog Site is a web application that allows users to create, read, update, and delete blog posts, as well as leave comments on the posts. It provides a user-friendly interface for managing blog content.
</p>

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Description

CMS-Style Blog Site is a full-stack web application built with HTML, CSS, JavaScript, and [insert any additional technologies/frameworks used]. It follows the Model-View-Controller (MVC) architectural pattern and utilizes a CMS (Content Management System) approach for managing blog posts and user authentication.

The application provides a homepage that displays existing blog posts (if any) and offers navigation links for easy access to the homepage, user dashboard, and login/logout functionality. Users can sign up with a unique username and password, and once logged in, they have the ability to create, update, and delete their own blog posts. Users can also view individual blog posts, leave comments, and see comments from other users.

## Features

- Homepage displaying existing blog posts
- User authentication (signup, signin, logout) with password hashing using bcrypt
- User dashboard to manage blog posts
- Create, update, and delete blog posts
- View individual blog posts with comments
- Leave comments on blog posts
- User-friendly interface

## Packages Used
<p>The CMS-Style Blog Site project utilises the following packages:</p>
<ul>
  <li><a href="https://www.npmjs.com/package/bcrypt">bcrypt</a> (version 5.1.0 or later)</li>
  <li><a href="https://www.npmjs.com/package/casual">casual</a> (version 1.6.2 or later)</li>
  <li><a href="https://www.npmjs.com/package/connect-session-sequelize">connect-session-sequelize</a> (version 7.1.7 or later)</li>
  <li><a href="https://www.npmjs.com/package/dotenv">dotenv</a> (version 16.0.3 or later)</li>
  <li><a href="https://www.npmjs.com/package/express">express</a> (version 4.18.2 or later)</li>
  <li><a href="https://www.npmjs.com/package/express-handlebars">express-handlebars</a> (version 5.3.5 or later)</li>
  <li><a href="https://www.npmjs.com/package/express-session">express-session</a> (version 1.17.3 or later)</li>
  <li><a href="https://www.npmjs.com/package/mysql2">mysql2</a> (version 3.3.3 or later)</li>
  <li><a href="https://www.npmjs.com/package/sequelize">sequelize</a> (version 6.31.1 or later)</li>
</ul>

## Installation

To run the CMS-Style Blog Site locally, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/your-repo.git`
2. Navigate to the project directory: `cd your-repo`
3. Install the dependencies: `npm install`
4. Set up the database: You need to fill out the `.env` file with your MySQL credentials. There is an example `.env` file as reference. After that, you are able to run the following commands:
   - Create the database: `npm run create-database`
   - Create the tables: `npm run createtables`
   - Seed the database with fake data (optional): `npm run seed`
5. Start the application: `npm start`


## Usage

- Open your web browser and navigate to the application's URL, by default it will be `http://localhost:3000/home`
- You will be directed to the homepage where you can browse existing blog posts.
- Click on the navigation links to access different pages, such as the dashboard, login, or sign-up pages.
- Sign up for an account or log in if you already have one.
- Once logged in, you can create new blog posts, view, update, or delete existing posts.
- Click on individual blog posts to view their details, leave comments, or see existing comments.
- Enjoy managing your blog content and interacting with other users!

## Contributing

Contributions are welcome! If you would like to contribute to the CMS-Style Blog Site, please follow these steps:

1. Fork the project repository.
2. Create your own branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request.

## License

This project is licensed under the [License Name] - see the `LICENSE` file for details.

## Contact

For any inquiries or questions, please contact:

- Your Name:
  - Email: vajskids@gmail.com
  - GitHub: [L10N37](https://github.com/L10N37)
