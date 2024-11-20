# Cinecloud - Movie Website

Cinecloud is a movie and TV show website built with HTML, CSS, and JavaScript. It fetches movie and TV show data from the [TMDb API](https://www.themoviedb.org/). Users can explore movie details, view ratings, browse through a dynamic carousel, and search for movies or TV shows easily.

## Features
- **Movie & TV Show Listings**: Display a comprehensive list of movies and TV shows using data from TMDb.
- **Movie Details**: View detailed information about each movie, including ratings, release dates, and descriptions.
- **Movie Ratings**: Show movie ratings from users and critics.
- **Carousel**: A dynamic carousel to display featured or trending movies.
- **Search Bar**: Easily search for movies or TV shows by title or genre.
- **Responsive Design**: Optimized for both desktop and mobile users.

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript
- **API**: The Movie Database (TMDb) API
- **Version Control**: Git & GitHub


## Installation

Follow the steps below to get Cinecloud up and running locally:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/cinecloud.git
    ```

2. **Navigate to the project directory**:
    ```bash
    cd cinecloud
    ```

3. **Obtain an API Key**:
    - Go to [TMDb](https://www.themoviedb.org/).
    - Sign up and get your API key.
    
4. **Add the API Key**:
    - In the project folder, open the `script.js` file.
    - Replace the placeholder `YOUR_API_KEY` in the API call with your actual API key.
      ```javascript
      const API_KEY = 'YOUR_API_KEY';
      ```

5. **Open the project in a browser**:
    - Simply open the `index.html` file in any modern web browser (Chrome, Firefox, etc.).
    - The website should be live locally, fetching and displaying movies and TV shows from TMDb.

## Usage

1. **Home Page**: On the home page, users can view the featured movies in a carousel. Each movie is clickable and will display detailed information like release date, genres, ratings, and more.
   
2. **Search Bar**: Users can search for movies or TV shows by typing in the search bar. As they type, suggestions and results are dynamically displayed based on the TMDb data.

3. **Movie Details**: Clicking on any movie or TV show will redirect users to a page that displays detailed information, including the plot, cast, ratings, and trailers (if available).


