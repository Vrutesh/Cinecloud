// fetch data
const API_KEY = "f3fbd38c0c00cefd4bd7ffeb48aa7a17";
const API_URL = "https://api.themoviedb.org/3/";

// Main Containers

const cardsSection = document.querySelector(".cards-section");

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

    //  Featuring Section
    if (categoryName === "Popular TV Shows") {
      const featuring_container = createFeatureSection();
      mainContainer.appendChild(featuring_container);
    }

    const cardsWrapper = document.createElement("div");
    cardsWrapper.classList.add("card-container");

    const content = document.createElement("div");
    content.classList.add("movie-content", "content");

    const fragment = document.createDocumentFragment();

    for (const item of imageItems) {
      if (shouldSkip(item, contentType)) return;
      const cardHolder = document.createElement("div");
      cardHolder.classList.add("card-holder");

      fragment.appendChild(cardHolder)

      
      const card = createCard(item, contentType)
      cardHolder.appendChild(card);
      fragment.appendChild(cardHolder);
    }

    content.appendChild(fragment);
    cardsWrapper.appendChild(content);
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
    customeUrl("movie", "now_playing"),
    "movie",
    "Now Playing Movies"
  );
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
    const gradientOverlay = document.createElement("div");
    gradientOverlay.classList.add("gradient");
    mainContainer.appendChild(gradientOverlay);
  }

  if (categoryName === "Upcoming Movies") {
    categoryHeading.id = "popular";
  } else if (categoryName === "Top Rated TV Shows") {
    categoryHeading.id = "tvshows";
  } else if (categoryName === "Now Playing Movies") {
    categoryHeading.id = "now-playing";
  }

  return categoryHeading;
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

  poster_container.appendChild(poster_img);
  featuring_container.append(video_container, poster_container);

  return featuring_container;
};

const shouldSkip = (item, contentType) => {
  if (contentType === "movie" && !item.backdrop_path) return true;
  if (contentType === "person" && !item.profile_path) return true;
  if (contentType === "tv" && !item.backdrop_path) return true;
  return false;
};

const createCard = (item, contentType) =>{
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

      const movieLang = document.createElement("p");
      movieLang.classList.add("movie-language");
      movieLang.textContent = item.original_language;

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
        watchNowText.textContent = `${(item.vote_count * 3)
          .toString()
          .slice(0, 3)}k`;
      } else {
        watchNowText.textContent = `${(item.vote_count * 3)
          .toString()
          .slice(0, 3)}k`;
      }

      watchingnowContainer.append(watchNowText, watchHeading);

      card.appendChild(img);
      card.appendChild(movieRating);
      card.appendChild(movieLang);
      card.appendChild(movieTitle);
      card.appendChild(watchingnowContainer);

      return card

}
