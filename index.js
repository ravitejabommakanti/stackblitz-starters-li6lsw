const express = require('express');
const { resolve } = require('path');
let cors = require('cors');
const hotels = require('./mockdata');

const app = express();
const port = 3000;

app.use(cors());

// Endpoint 1: Get the hotels sorted by pricing
// <http://localhost:3000/hotels/sort/pricing?pricing=low-to-high>

function filterHotelsByPricingLowToHigh(hotels) {
  const filteredHotels = hotels.sort((a, b) => a.price - b.price);
  return filteredHotels;
}

app.get('/hotels/sort/pricing', (req, res) => {
  const sortType = req.query.pricing;
  let filteredHotels = filterHotelsByPricingLowToHigh(hotels);
  res.json(filteredHotels);
});

// Endpoint 2: Get the hotels sorted based on their Ratings
// <http://localhost:3000/hotels/sort/rating?rating=low-to-high>

function filterHotelsByRatingLowToHigh(hotels) {
  const filteredHotels = hotels.sort((a, b) => a.rating - b.rating);
  return filteredHotels;
}

app.get('/hotels/sort/rating', (req, res) => {
  const sortType = req.query.rating;
  let filteredHotels = filterHotelsByRatingLowToHigh(hotels);
  res.json(filteredHotels);
});

// Endpoint 3: Get the Hotels sorted based on their Reviews
// <http://localhost:3000/hotels/sort/reviews?reviews=least-to-most>

function filterHotelsByReviewsLowToHigh(hotels) {
  const filteredHotels = hotels.sort((a, b) => a.reviews - b.reviews);
  return filteredHotels;
}

app.get('/hotels/sort/reviews', (req, res) => {
  const sortType = req.query.reivews;
  let filteredHotels = filterHotelsByReviewsLowToHigh(hotels);
  res.json(filteredHotels);
});

// Endpoint 4: Filter the hotels based on the Hotel Amenity
// <http://localhost:3000/hotels/filter/amenity?amenity=spa>

function filterHotelsByAmenities(hotels, filterType) {
  const filteredHotels = hotels.filter(
    (hotel) => hotel.amenity.toLowerCase() === filterType
  );
  return filteredHotels;
}

app.get('/hotels/filter/amenity', (req, res) => {
  const filterType = req.query.amenity;
  let filteredHotels = filterHotelsByAmenities(hotels, filterType);
  res.json(filteredHotels);
});

// Endpoint 5: Filter the hotels based on the selected Country
// <http://localhost:3000/hotels/filter/country?country=india>

function filterHotelsByCountry(hotels, filterType) {
  const filteredHotels = hotels.filter(
    (hotel) => hotel.country.toLowerCase() === filterType
  );
  return filteredHotels;
}

app.get('/hotels/filter/country', (req, res) => {
  const filterType = req.query.country;
  let filteredHotels = filterHotelsByCountry(hotels, filterType);
  res.json(filteredHotels);
});

// Endpoint 6: Filter the hotels based on the selected Category
// <http://localhost:3000/hotels/filter/category?category=luxury>

// Common function for all repeated filters
// this can be used for country, amenity as well
function filterHotelsByProps(hotels, property, value) {
  const filteredHotels = hotels.filter(
    (hotel) => hotel[property].toLowerCase() === value
  );
  return filteredHotels;
}

app.get('/hotels/filter/category', (req, res) => {
  const filterType = req.query.category;
  let filteredHotels = filterHotelsByProps(hotels, 'category', filterType);
  res.json(filteredHotels);
});

// Endpoint 7: Send all hotels
// <http://localhost:3000/hotels>

app.get('/hotels', (req, res) => {
  res.json(hotels);
});

app.listen(port, () => {});
