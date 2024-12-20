// fetch data
const API_KEY = "f3fbd38c0c00cefd4bd7ffeb48aa7a17";
const API_URL = "https://api.themoviedb.org/3/";

// Main Containers
const cardsSection = document.querySelector(".cards-section");
const carousel = document.querySelector(".carousel");

// Carousel
const prevBtn = document.querySelector(".prev-btn");
prevBtn.setAttribute("aria-label", "Previous slide");
const nextBtn = document.querySelector(".next-btn");
nextBtn.setAttribute("aria-label", "Next slide");

// Default API URL
const customeUrl = (category, type) => {
  const defaultUrl = `${API_URL}${category}/${type}?language=en-US&page=1&region=IN&api_key=${API_KEY}`;
  return defaultUrl;
};

// Default image URL
const imageURL = (url) => `https://image.tmdb.org/t/p/original${url}`;

const fetchCardData = async (apiUrl, contentType, categoryName) => {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("There is some error");
    }
    const data = await response.json();
    const imageItems = data.results;

    const mainContainer = document.createElement("section");
    mainContainer.classList.add("heading-title");

    //   category Heading
    const categoryHeading = createCategoryHeading(categoryName);
    mainContainer.appendChild(categoryHeading);

    //   Right Arrow in movie type title
    const rightArrow = createRightArrow();
    categoryHeading.appendChild(rightArrow);

    // Add gradient overlay for "Upcoming Movies" category
    if (categoryName === "Upcoming Movies") {
      const gradientOverlay = createGradientOverlay();
      mainContainer.appendChild(gradientOverlay);
    }

    //  Featuring Section
    if (categoryName === "Popular Movies") {
      const featuring_container = createFeatureSection();
      cardsSection.appendChild(featuring_container);
    }

    // creating cards
    const cardsWrapper = document.createElement("div");
    cardsWrapper.classList.add("card-container");

    const content = document.createElement("div");
    content.classList.add("movie-content", "content");

    const fragment = document.createDocumentFragment();

    for (const item of imageItems) {
      if (contentType === "movie" && !item.backdrop_path) continue;
      if (contentType === "person" && !item.profile_path) continue;
      if (contentType === "tv" && !item.backdrop_path) continue;

      const card = document.createElement("div");
      card.classList.add("card");

      const img = document.createElement("img");

      if (contentType === "movie") {
        img.src = imageURL(item.backdrop_path);
      } else if (contentType === "person") {
        img.src = imageURL(item.profile_path);
      } else if (contentType === "tv") {
        img.src = imageURL(item.backdrop_path);
      }

      img.alt = contentType === "movie" ? "Movie Poster" : "Person Poster";
      img.loading = "lazy";

      const movieRating = document.createElement("p");
      movieRating.classList.add("movie-rating");
      if (item.vote_average && item.vote_average !== 0) {
        movieRating.textContent = item.vote_average.toFixed(1);
      } else {
        movieRating.textContent = "";
      }

      const movieTitle = document.createElement("h4");
      movieTitle.classList.add("cardTitle");
      movieTitle.textContent = contentType === "movie" ? item.title : item.name;

      const watchingnowContainer = document.createElement("div");
      watchingnowContainer.classList.add("watchContainer");

      const watchNowText = document.createElement("p");
      watchNowText.classList.add("watch-now");

      const watchHeading = document.createElement("p");
      watchHeading.classList.add("watch-heading");
      watchHeading.textContent = "watching now";

      if (contentType === "person") {
        watchingnowContainer.style.display = "none";
      }

      if (item.vote_count <= 0) {
        watchHeading.textContent = "To be Released";
        watchNowText.style.display = "none";
      } else {
        watchNowText.textContent = `${(item.vote_count * 3)
          .toString()
          .slice(0, 3)}k`;
      }

      watchingnowContainer.append(watchNowText, watchHeading);

      card.append(img, movieRating, movieTitle, watchingnowContainer);
      content.appendChild(card);
      fragment.appendChild(content);
    }

    // content.appendChild(fragment);
    cardsWrapper.appendChild(fragment);
    mainContainer.appendChild(cardsWrapper);
    cardsSection.appendChild(mainContainer);
  } catch (error) {
    console.log("There is an error in fetching data:", error);
  }
};

// Fetch movies for different categories in a specific order
const fetchDataInOrder = async () => {
  await fetchCardData(
    customeUrl("movie", "upcoming"),
    "movie",
    "Upcoming Movies"
  );
  await fetchCardData(
    customeUrl("movie", "now_playing"),
    "movie",
    "Most Watching Trending Now"
  );
  await fetchCardData(
    customeUrl("movie", "popular"),
    "movie",
    "Popular Movies"
  );
  await fetchCardData(
    customeUrl("tv", "airing_today"),
    "tv",
    "TV Shows Airing Today"
  );
  await fetchCardData(customeUrl("tv", "popular"), "tv", "Popular TV Shows");
  await fetchCardData(
    customeUrl("person", "popular"),
    "person",
    "Famous People"
  );
  await fetchCardData(
    customeUrl("tv", "top_rated"),
    "tv",
    "Top Rated TV Shows"
  );
};

fetchDataInOrder();

// creating movie type heading
const createCategoryHeading = (categoryName) => {
  const categoryHeading = document.createElement("h3");
  categoryHeading.textContent = categoryName;

  if (categoryName === "Upcoming Movies") {
    categoryHeading.id = "popular";
  } else if (categoryName === "Top Rated TV Shows") {
    categoryHeading.id = "tvshows";
  } else if (categoryName === "Most Watching Trending Now") {
    categoryHeading.id = "now-playing";
  }

  return categoryHeading;
};

// Helper function to create gradient overlay for upcoming movies
const createGradientOverlay = () => {
  const gradientOverlay = document.createElement("div");
  gradientOverlay.classList.add("gradient");
  return gradientOverlay;
};

// create right arrow
const createRightArrow = () => {
  const rightArrow = document.createElement("img");
  rightArrow.classList.add("right-arrow");
  rightArrow.src = "assets/icons/right_arrow.svg";
  rightArrow.loading = "lazy";
  rightArrow.alt = "right-arrow";
  return rightArrow;
};

//   create featuring section
const createFeatureSection = () => {
  const featuring_container = document.createElement("section");
  featuring_container.classList.add("featuring-container");

  const video_container = document.createElement("div");
  video_container.classList.add("video-container");

  const video_container_iframe = document.createElement("iframe");
  video_container_iframe.classList.add("trailer-video");
  video_container_iframe.src = `https://www.youtube.com/embed/mMhDgAn_Kng?start=2`;
  video_container_iframe.allow =
    "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
  video_container_iframe.allowFullscreen = true;

  video_container.appendChild(video_container_iframe);

  const poster_container = document.createElement("div");
  poster_container.classList.add("poster-container");

  const poster_img = document.createElement("img");
  poster_img.src = "assets/movie-poster.webp";
  poster_img.alt = "movie-poster";
  poster_img.loading = "lazy";

  poster_container.appendChild(poster_img);
  featuring_container.append(video_container, poster_container);

  return featuring_container;
};

// fetching carousel data
const fetchCarousel = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("There is some error");
    }

    const data = await response.json();
    const carouselArray = data.results;

    if (!carouselArray || carouselArray.length === 0) return;

    const imageArray = carouselArray.filter((movie) => movie.backdrop_path);

    const fragment = document.createDocumentFragment();

    const createCarouselImage = (images) => {
      images.forEach((movie, index) => {
        const slides = document.createElement("div");
        slides.classList.add("slide");

        if (index === 0) slides.classList.add("active");

        const img = document.createElement("img");
        img.src = imageURL(movie.backdrop_path);
        img.classList.add("carousel-img");
        img.alt = "Movie-Poster";
        img.loading = "lazy";

        slides.appendChild(img);
        slides.appendChild(
          movie_Info(
            movie.title,
            movie.overview,
            movie.original_language,
            movie.popularity,
            movie.release_date
          )
        );
        fragment.appendChild(slides);
      });
    };
    createCarouselImage(imageArray);
    carousel.appendChild(fragment);
  } catch (error) {
    console.log("There is an error in fetching data:", error);
  }
};
fetchCarousel(customeUrl("movie", "upcoming"));

// carousel movie information data
const movie_Info = (title, overview, language, popularity, release) => {
  const moviefragment = document.createDocumentFragment();

  const movieDetails = document.createElement("div");
  movieDetails.classList.add("movie-details");

  const movieTitle = document.createElement("h1");
  movieTitle.classList.add("title");
  let titleWords = title.split(" ");
  if (titleWords.length > 5) {
    movieTitle.textContent = titleWords.slice(0, 6).join(" ") + "...";
  } else {
    movieTitle.textContent = title;
  }

  const movieOverview = document.createElement("h3");
  movieOverview.classList.add("overview");
  let words = overview.split(" ");
  if (words.length > 20) {
    movieOverview.textContent = words.slice(0, 20).join(" ") + "...";
  } else {
    movieOverview.textContent = words;
  }

  const movieGenre = document.createElement("div");
  movieGenre.classList.add("genre");

  // movie list
  const movielist = document.createElement("ul");

  const movie_lang = document.createElement("li");
  movie_lang.classList.add("language");

  const languageMap = {
    hi: "Hindi",
    en: "English",
    ta: "Tamil",
    te: "Telugu",
    kn: "Kannada",
    bn: "Bengali",
  };

  const languages = languageMap[language] || language;

  movie_lang.textContent = `Language - ${languages}`;

  const movie_popularity = document.createElement("li");
  movie_popularity.classList.add("popularity");
  movie_popularity.textContent = `Views - ${popularity}M`;

  const movie_release = document.createElement("li");
  movie_release.classList.add("release");
  movie_release.textContent = `Release on - ${release}`;

  movielist.append(movie_lang, movie_popularity, movie_release);

  movieGenre.appendChild(movielist);

  movieDetails.append(movieTitle, movieOverview, movieGenre);

  return movieDetails;
};

// Carousel button Logic
let currentIndex = 0;

function showNextImage() {
  const slides = document.querySelectorAll(".slide");
  slides[currentIndex].classList.remove("active");

  currentIndex = (currentIndex + 1) % slides.length;

  slides[currentIndex].classList.add("active");
}

function showPrevImage() {
  const slides = document.querySelectorAll(".slide");
  slides[currentIndex].classList.remove("active");

  currentIndex = (currentIndex - 1 + slides.length) % slides.length;

  slides[currentIndex].classList.add("active");
}

let carouselInterval;

const startInterval = () => {
  carouselInterval = setInterval(showNextImage, 5000);
};

const stopInterval = () => {
  clearInterval(carouselInterval);
};

nextBtn.addEventListener("click", () => {
  stopInterval();
  showNextImage();
  startInterval();
});

prevBtn.addEventListener("click", () => {
  stopInterval();
  showPrevImage();
  startInterval();
});

//search bar feature
document.addEventListener("DOMContentLoaded", () => {
  let searchInput = document.querySelector(".search-input");

  // if search is not there
  if (!searchInput) {
    console.error("Search input not found!");
    return; // Exit if the search input is not found
  }

  const loader = document.querySelector(".loader");
  const carouselContainer = document.querySelector(".container");
  const clearBtn = document.querySelector(".clear-btn");
  const allCards = document.querySelector(".cards-section");
  const graident = document.querySelector(".masthead-gradient");
  const footer = document.querySelector("#footer");
  const searchcontainer = document.querySelector(".results-container");
  const clearresultContainer = document.querySelector(".clear-result");
  clearresultContainer.style.display = "none";

  // loader is hidden initially
  const hideLoader = () => loader.classList.remove("active");
  const showLoader = () => loader.classList.add("active");

  // clear button is hidden initially
  clearBtn.style.display = "none";

  clearresultContainer.addEventListener("click", () => {
    searchInput.value = "";
    hideLoader();
    carouselContainer.style.display = "block";
    footer.style.display = "block";
    allCards.style.display = "block";
    graident.style.display = "block";
    searchcontainer.classList.remove("active");
    clearBtn.style.display = "none";
  });
  // Clear input field
  const resetSearchState = () => {
    searchInput.value = "";
    hideLoader();
    carouselContainer.style.display = "block";
    footer.style.display = "block";
    allCards.style.display = "block";
    graident.style.display = "block";
    searchcontainer.classList.remove("active");
    clearBtn.style.display = "none";
  };

  // Clear button event listener
  clearBtn.addEventListener("click", () => {
    resetSearchState();
  });

  searchInput.addEventListener("focus", () => {
    carouselContainer.style.display = "none";
    footer.style.display = "none";
    allCards.style.display = "none";
    graident.style.display = "none";
    clearresultContainer.style.display = "block";
  });

  if (!searchcontainer) {
    searchInput.addEventListener("blur", () => {
      carouselContainer.style.display = "block";
      footer.style.display = "block";
      allCards.style.display = "block";
      graident.style.display = "block";
    });
  }

  let timeout;
  searchInput.addEventListener("input", (event) => {
    clearTimeout(timeout);
    // hideLoader();
    clearBtn.style.display = "block";
    showLoader();
    timeout = setTimeout(() => {
      let searchValue = event.target.value;

      if (searchValue === "") {
        hideLoader();
        clearBtn.style.display = "none";
        carouselContainer.style.display = "block";
        footer.style.display = "block";
        allCards.style.display = "block";
        graident.style.display = "block";
        searchcontainer.classList.toggle("active", false);
      } else {
        carouselContainer.style.display = "none";
        footer.style.display = "none";
        allCards.style.display = "none";
        graident.style.display = "none";
        searchcontainer.classList.toggle("active", true);

        // Fetch search results
        fetchSearchData(searchUrl("search", "movie", searchValue));
      }
    }, 400); // Delay after typing stops
  });

  const searchUrl = (category, type, query) =>
    `${API_URL}${category}/${type}?query=${query}&include_adult=false&language=en-US&page=1&api_key=${API_KEY}`;

  const fetchSearchData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error fetching search data");
      }
      const data = await response.json();
      const result = data.results;
      hideLoader();
      displaySearchResults(result);
    } catch (error) {
      console.error("Error fetching data:", error);
      hideLoader();
    }
  };

  const displaySearchResults = (result) => {
    const resultsContainer = document.querySelector(".results-container");
    resultsContainer.innerHTML = ""; // Clear previous results

    if (result.length === 0) {
      const noResultsMessage = document.createElement("p");
      noResultsMessage.textContent = "Opps ! No results found!";
      noResultsMessage.style.color = "#fff";
      resultsContainer.appendChild(noResultsMessage);
    } else {
      result.forEach((movie) => {
        if (movie.poster_path) {
          const resultmovieCard = document.createElement("div");
          resultmovieCard.classList.add("movie-card");

          const resultmoviePoster = document.createElement("img");
          resultmoviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
          resultmoviePoster.alt = movie.title;
          resultmoviePoster.loading = "lazy";
          resultmovieCard.appendChild(resultmoviePoster);

          const resultmovieTitle = document.createElement("h3");
          resultmovieTitle.textContent = movie.title;
          resultmovieCard.appendChild(resultmovieTitle);

          resultsContainer.appendChild(resultmovieCard);
        }
      });
    }
  };
});
