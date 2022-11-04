const container = document.querySelector(".seats-container");
const seats = document.querySelectorAll(".seat .seat:not(.ocuppied)");

const movieSelector = document.getElementById("movie-selector");
const selectedSeatsCount = document.getElementById("selected-seats-count");
const totalPrice = document.getElementById("total-price");

const ticketPrice = +movieSelector.value;

function updateSeatsCount() {
  const selectedSeatsList = document.querySelectorAll(".row .seat.selected");

  listCount = selectedSeatsList.length;

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
  resetCalculations();
});
