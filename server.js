const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Middleware to check working hours
const checkWorkingHours = (req, res, next) => {
  const currentHour = new Date().getHours();
  const currentDay = new Date().getDay();

  // Check if it's Monday to Friday and between 9 AM and 5 PM
  if (currentDay >= 1 && currentDay <= 5 && currentHour >= 9 && currentHour < 17) {
    next(); // Allow access
  } else {
    res.send(
      "Sorry, the website is only available during working hours (Monday to Friday, 9 AM to 5 PM)."
    );
  }
};

// Middleware
app.use(checkWorkingHours);

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

app.get('/services', (req, res) => {
  res.render('services', { title: 'Our Services' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact Us' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
