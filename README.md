# DOT PPOB
[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts)

Backend server built with NodeJS and Postgresql for managing users, services, and transactions. The project provides functionality to manage users information, services, as well as handle transactions. It also includes database migrations and seeding to quickly set up the system

Live demo [_here_](https://dot-ppob-server.vercel.app/)

## Table of Contents
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Setup](#setup)

## Technologies Used
- NodeJS - version 20.11.1
- Postgresql - version 14.13.0
- Cloudinary for Cloud Storage

## Features
- Users Management
- Services and Banners Information
- Transactions Handling

## Setup
To run this project in local, follow the steps below:

1. Clone this repository:

   ```
   git clone https://github.com/mch-fauzy/dot-ppob-server.git
   ```

2. Navigate to the project directory:
   ```
   cd dot-ppob-server
   ```

3. Install the required dependencies:
   ```
   npm install
   ```

4. Edit the database configuration in `.env.development` with your credentials:
    
    __Note: Please create new database or schema__
    
    ```
    DATABASE_URL='postgresql://johndoe:mypassword@localhost:5432/mydb?schema=public'
    ```

5. Migrate the database:
   ```
   npm run prismamigrate:dev
   ```

6. Seed the database:
   ```
   npm run seed:dev
   ```

7. Generate Prisma client:
   ```
   npm run prismagenerate
   ```

8. Compile Typescript into Javascript code:
   ```
   npm run compile
   ```

9. Start the server:
   ```
   npm run dev
   ```

10. By default, the server will run in:
   ```
   http://localhost:3000
   ```

11. If you access Swagger docs in local, do not forget to change the servers to localhost

12. If you do not want to run in local, just access link below for live demo:

  [Live Demo](https://dot-ppob-server.vercel.app/)
