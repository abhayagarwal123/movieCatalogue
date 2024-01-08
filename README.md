# MovieTake

A simple movie rating website made using the MERN stack (MongoDB, ExpressJS, ReactJS, NodeJS)

![screenshot1](https://github.com/Nab32/MovieTake/assets/90017423/18eb4963-a248-4a9c-ac05-8a1578dcc293)

![screenshot2](https://github.com/Nab32/MovieTake/assets/90017423/69bca924-eb95-4449-a31d-8de5280b21b7)

## How it works

To run this project, you will need a `.env` file with 2 mandatory keys. One being the `OMDB_KEY` (API key to access the OMDB database) and the other being `MONGODB_SECRET_URL` (The URL to connect to the cluster).

## Features

This project contains multiple features like:

* **Home Page**: Showcasing selected classic movies.
* **Authentication**: A Login/Register page that handles all accounts securely.
* **Movie Pages**: Dedicated pages for every single movie in the database, providing additional information like global rating and release date.
* **Rating System**: Allowing users to rate movies and contribute to the community's movie ratings.
* **User Takes (TODO)**: A system to publish personal takes on movies to share with other users.

## Getting Started

Follow these steps to run the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/MovieTake.git
2. Download the required npm modules
   ```bash
   cd client
   npm i
   cd ../server
   npm i
3. Add the .env and the mandatory keys
4. To run the project, you can run these commands
   ```bash
   cd client
   npm run dev
   cd ../server
   npm start

