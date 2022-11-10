"use strict";

const container = document.querySelector(".seats-container");
const notOcuppiedSeats = document.querySelectorAll(".row .seat:not(.ocuppied)");

const movieSelector = document.getElementById("movie-selector");
const selectedSeatsCount = document.getElementById("selected-seats-count");
const totalPrice = document.getElementById("total-price");

let ticketPrice = +movieSelector.value;

function saveMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

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

function resetCalculations() {
  const selectedSeatsList = document.querySelectorAll(".row .seat.selected");

  selectedSeatsList.forEach((x) => x.classList.remove("selected"));

  selectedSeatsCount.innerText = 0;
  totalPrice.innerText = 0;
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

  // resetCalculations();
});
