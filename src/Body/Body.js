import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieModal from "../MovieModal/MovieModal";
import "./Body.css";
//components

//api
const api = "https://www.omdbapi.com/?";

//api key
const apiKey = "apikey=18eaeb4f";

const Main = () => {
  const [name, setName] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [movieDetails, setMovieDetails] = useState({});

  //modal
  const [show, setShow] = useState(false);

  //modal config

  const showModal = () => {
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
    setMovieDetails();
  };

  const handleClose = () => {
    hideModal();
  };

  //get response from API
  const getInfo = () => {
    axios
      .get(api + apiKey + `&s=${name}` + "&type=movie" + "&page=1")
      .then((res) => {
        if (res) {
          setMovies(res.data.Search);
        }
      });
  };

  //get details
  const getDetails = (e, id) => {
    e.preventDefault();

    setSelectedId(id);
    axios.get(api + apiKey + `&i=${id}`).then((res) => {
      if (res) {
        setMovieDetails(res.data);
        showModal();
      }
    });
  };

  //submit the title entered
  const handleSubmit = (e) => {
    e.preventDefault();
    getInfo();
  };

  return (
    <div>
      <form>
        <div className="searchBar">
          <label htmlFor="name"></label>
          <input
            type="text"
            name="name"
            placeholder="movie name"
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" onClick={(e) => handleSubmit(e)}>
            Search
          </button>
        </div>
      </form>

      {movies ? (
        <div className="movies">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="movie">
              <img src={movie.Poster} alt="" />
              <div className="movie-title">
                <p>{movie.Title}</p>
              </div>
              <button
                className="movie-detailsBtn"
                onClick={(e) => getDetails(e, movie.imdbID)}
              >
                Details
              </button>

              {/* modal */}
              {movieDetails && selectedId === movie.imdbID && show ? (
                <MovieModal
                  movieInfo={movieDetails}
                  handleClose={handleClose}
                />
              ) : (
                <div className="modal"></div>
              )}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Main;
