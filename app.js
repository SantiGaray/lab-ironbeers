const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, 'views/partials'));

// Add the route handlers here:

// beerdetail

app.get("/beers/:id", (req,res) =>{
  id = req.params.id
  punkAPI
  .getBeer(id)
  .then(beer => res.render("beerdetail", beer[0]))
  .catch(error => console.log(error));
})

app.get("/beers", (req,res) =>{
  punkAPI
  .getBeers()
  .then(beersFromApi => res.render("beers", {beersFromApi}))
  .catch(error => console.log(error));
})

app.get('/random-beer', (req, res) => {
  punkAPI
  .getRandom()
  .then(beersFromApi => res.render('random-beer', beersFromApi[0]))
  .catch(error => console.log(error));
})

app.get('/', (req, res) => {
  res.render('index');
});



app.listen(3000, () => console.log('🏃‍ on port 3000'));