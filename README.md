# simple-blog
[![Netlify Status](https://api.netlify.com/api/v1/badges/6a918791-1369-46b8-a902-ec28641d6284/deploy-status)](https://app.netlify.com/sites/blopple/deploys)

## Overview

A basic blog site built with vanilla JavaScript. It features user authentication and is deployed using Netlify and Supabase. Users can sign up, log in, and create, read, update, and delete blog posts.

## Features

- **Authentication**: Users can sign up, log in, and log out.
- **CRUD Operations**: Users can create, read, update, and delete blog posts.
- **Deployment**: Deployed using Netlify and Supabase.

## Technologies Used

- **Vanilla JavaScript**: For building the application logic and handling DOM manipulation.
- **HTML/CSS**: For structuring and styling the web pages.
- **Supabase**: For backend services including authentication and database.
- **Netlify**: For deploying the application.

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- Node.js (https://nodejs.org/)
- npm (https://www.npmjs.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Rishi-Sudhakar/simple-blog.git
   cd simple-blog
   ```

2. Install the dependencies (if you need dot env for testing), don't commit it though:

   ```bash
   npm install
   ```

### Supabase Setup

1. Go to [Supabase](https://supabase.io/) and create a new project.
2. Set up authentication and create the required tables for blog posts.
3. Get the API URL and public anon key from your Supabase project settings.

### Netlify Setup

1. Go to [Netlify](https://www.netlify.com/) and create a new site from your GitHub repository.
2. Add the Supabase API URL and anon key as environment variables in your Netlify site settings.


### Running the Application

To start the development server, you can use a simple local server like `live-server`:

```bash
npx live-server public
```

The application will be available at `http://localhost:8080` (or another port depending on your configuration).


## Deployment

The site is deployed using Netlify. You can deploy the site by pushing your code to the repository and connecting the repository to Netlify. 

[![Netlify Status](https://api.netlify.com/api/v1/badges/6a918791-1369-46b8-a902-ec28641d6284/deploy-status)](https://app.netlify.com/sites/blopple/deploys)

## License

This project is licensed under the MIT License.

## Acknowledgements

- [Supabase](https://supabase.io/)
- [Netlify](https://www.netlify.com/)
- [Node.js](https://nodejs.org/)

---
