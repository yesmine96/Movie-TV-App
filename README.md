# 🎬 Movie & TV Show Explorer

A web application built with **React.js**, **Next.js**, **TypeScript**, **Tailwind CSS**, and **Axios** that allows users to explore the **top 10 rated TV shows and movies**, search for content, and view details about each item. The app integrates with **TheMovieDB API** to fetch real-time data.

## 📌 Features

- **Top 10 TV Shows & Movies**: Displays the highest-rated TV shows and movies from TheMovieDB.
- **Search Functionality**: Users can search for TV shows and movies (triggered after 3+ characters and 1-second debounce).
- **Dynamic Search Results**: Results appear live under the search bar.
- **Tab Navigation**: Users can toggle between **TV Shows** and **Movies** tabs, with the search results updating accordingly.
- **Detailed View**: Clicking on a TV show or movie displays additional details.
- **Type Safety**: Full TypeScript support for type checking and better development experience.
- **Unit & Integration Testing**: Implemented using **Jest** and **React Testing Library**.

## 🚀 Technologies Used

- **React.js** - A JavaScript library for building user interfaces.
- **Next.js** - A React framework for server-side rendering and static site generation.
- **TypeScript** - A strongly typed JavaScript superset for safer and scalable development.
- **Tailwind CSS** - A utility-first CSS framework for responsive design.
- **Axios** - A promise-based HTTP client for API calls.
- **TheMovieDB API** - The API used to fetch movies and TV show data.
- **Jest** - A testing framework for unit and integration tests.
- **React Testing Library** - A lightweight solution for testing React components.

## 🛠️ Getting Started

Follow these steps to set up the project locally.

### ✅ Prerequisites

Ensure you have the following installed:

- **Node.js v14+**
- **npm** or **yarn**

### 📥 Installation

1. Clone the repository:
   `git clone https://github.com/your-username/Movie-TV-App`
2. `cd Movie-TV-App`

3. Install dependencies:
   `npm install`

## ⚙️ Environment Variables

In order to run the application locally, you need to create a `.env.local` file in the root of your project. This file will store sensitive information like the **TheMovieDB** access token and API base URLs.

### Setting up `.env.local`

1. Go to [TheMovieDB API](https://www.themoviedb.org/) and sign up (or log in).
2. Once logged in, go to your **Account Settings** and navigate to the **API** section to generate your **API access token**. In this case, we're using an **access token** rather than an API key.
3. In the root of your project, create a `.env.local` file if it doesn't exist.
4. Add the following environment variables to the `.env.local` file:

NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN=your_tmdb_access_token
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_IMAGE_BASE_URL=https://image.tmdb.org/t/p/w500

5. Run the development server: `npm run dev`
