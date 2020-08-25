const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');


const app = express();


// Define paths for Express config
const pubicDirectory = path.join(__dirname, '../public');
const viewsDirectory = path.join(__dirname, '../templates/views');
const partialsDirectory = path.join(__dirname, '../templates/partials');


// Set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsDirectory);
hbs.registerPartials(partialsDirectory);


// Setup static directory to serve 
app.use(express.static(pubicDirectory));


app.get('', (req, res) => {
  res.render('index', {
    title: "Weather",
    name: "Anel Danza"
  });
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: "About me",
    name: "Anel Danza"
  });
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: "Help",
    message: "Some helpful text",
    name: "Anel Danza"
  });
})


app.get('/weather', (req, res) => {
  const address = req.query.address;

  if (!address) {
    return res.send({
      error: "You must input address to get the weather"
    })
  }
    
    geocode(address, (error, {lat, long, location} = {}) => {
      if (error) {
        return res.send({error});
      }

      forecast(lat, long, (error, forecastData) => {
        if (error) {
          return res.send({error});
        }
    
        res.send({
          location,
          forecastData
        });

      })
    })

});

app.get('/help/*', (req, res) => {
  res.render('404page', {
    message: "Help article not found",
    title: "404 Page",
    name: "Anel Danza"

  })
})

app.get('*', (req, res) => {
  res.render('404page', {
    message: "Page not found",
    title: "404 Page",
    name: "Anel Danza"
  })
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
})

