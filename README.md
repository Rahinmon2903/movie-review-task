🎬 CineVerse — Movie Search App

A modern and fully responsive React Movie Search Application powered by the OMDB API.
Users can search movies, view detailed information, apply filters, add favorites, rate movies, and navigate with smooth pagination.

🚀 Features
🔍 Movie Search

Search any movie or series instantly

Clean and fast search experience

Auto-fallback results when search is empty (“Avengers”)

🎞 Filter by Type

Filter results by:

🎬 Movie

📺 Series

📘 Episode

Filtering works through API, not array filtering.

⭐ Star Rating

Rate movies from 1 to 10 stars

Ratings stored in localStorage

Rating UI updates instantly

❤️ Favorites System

Add movies to favorites

Remove movies from favorites

Favorites stored globally in React Context

Heart icon toggle

📄 Movie Details Page

High-quality Netflix-style layout

Full movie info:

Poster

Plot

Genre

Actors

Director

Runtime

Ratings (IMDB + others)

Smooth loading screen

🔢 Pagination

Local pagination (slice-based)

Prev / Next buttons

Page number buttons

Works smoothly even for long search results

⚙️ API Service File

Cleanly separates all API calls

Uses Axios

Easy to maintain and reuse

🎨 UI / UX

Netflix-style dark theme

Hover effects

Smooth animations

Beautiful empty state component when no movies found

Responsive grid layout

🛠️ Tech Stack

ReactJS

React Router

Context API

Axios

Tailwind CSS

JavaScript (ES6+)

OMDB REST API

📁 Folder Structure
src/
 ├── API/
 │    └── Omdbapi.js
 ├── Component/
 │    ├── Navbar.jsx
 │    ├── Pagination.jsx
 │    └── NoResults.jsx
 ├── Context/
 │    └── Context.jsx
 ├── pages/
 │    ├── Home.jsx
 │    ├── Cardinfo.jsx
 │    └── Favorities.jsx
 ├── App.jsx
 └── index.js

🔗 API Integration
Search Movies
export const searchMovies = (query, type) => {
  let url = `${BASE_URL}?apikey=${API_KEY}&s=${query}`;
  if (type) url += `&type=${type}`;

  return axios.get(url);
};

Get Movie Details
export const getMovieDetails = (id) => {
  return axios.get(`${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
};

▶️ Getting Started
1️⃣ Clone the repository
git clone https://github.com/your-username/cineverse.git

2️⃣ Install dependencies
npm install

3️⃣ Start the development server
npm start


App will run at:
👉 http://localhost:3000

🧩 Environment Variables

Create a file:

.env


Add:

REACT_APP_OMDB_KEY=80440b73

🖼 Fallback Image

Place your fallback image in:

public/assets/fallback.jpg


App automatically switches to fallback when poster is missing.

💡 Future Enhancements 

Theme toggle

Infinite scroll

Sort by rating / year

User login system

Watchlist with Firebase

🏁 Conclusion

CineVerse is a polished, responsive, and feature-rich movie discovery experience.
Built with clean structure, reusable components, API service patterns, and modern UI design