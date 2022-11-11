"use strict";

const container = document.querySelector(".seats-container");
const notOcuppiedSeats = document.querySelectorAll(".row .seat:not(.ocuppied)");

const movieSelector = document.getElementById("movie-selector");
const selectedSeatsCount = document.getElementById("selected-seats-count");
const totalPrice = document.getElementById("total-price");

let ticketPrice = +movieSelector.value;

populateFromLocalstorage();

updateSeatsCount();

function updateSeatsCount() {
  const selectedSeatsList = document.querySelectorAll(".row .seat.selected");

  const selectedSeatsIndex = [...selectedSeatsList].map((seat) =>
    [...notOcuppiedSeats].indexOf(seat)
  );

  localStorage.setItem("selectedSeats", JSON.stringify(selectedSeatsIndex));

  const listCount = selectedSeatsList.length;

  selectedSeatsCount.innerText = listCount;
  totalPrice.innerText = ticketPrice * listCount;
}

function saveMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

function populateFromLocalstorage() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats) {
    notOcuppiedSeats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex) {
    movieSelector.selectedIndex = selectedMovieIndex;
  }
}

container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSeatsCount();
  }
});

movieSelector.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  updateSeatsCount();
  saveMovieData(e.target.selectedIndex, e.target.value);
});
