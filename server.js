const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const fs = require('fs');
const morgan = require("morgan");

const { initCache } = require('./services/airtable_service');

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

// Read version from package.json
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf-8'));
app.locals.version = packageJson.version;

// logging
app.use(morgan('dev'));

// javasscrpt and css
app.use(express.static(path.join(__dirname, 'public')));

// views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// layout
// set default layout to 'views/layout.ejs'
// layout.ejs is a symlink to layout_bootstrap.ejs
app.use(expressLayouts);

const airtable_routes = require('./routes/airtable_routes')
const bamboohr_routes = require('./routes/bamboohr_routes')
const google_routes = require('./routes/google_routes')

// const airtableProxy = require('./routes/airtableProxy');
// const airtable_api_routes = require('./routes/api/airtable_routes')
// const bamboohr_api_routes = require('./routes/api/bamboohr_routes')

app
  .get('/', (req,res) => {
    res.render('home', { 
      title: 'Home', 
      NODE_ENV: process.env.NODE_ENV,
    });
  })

// app.get('/widgets/find_places', (req, res) => {
//     res.sendFile(`${__dirname}/widgets/com.google.find_places.html`)
// });

app.use('/widgets/airtable', airtable_routes)
app.use('/widgets/bamboohr', bamboohr_routes)
app.use('/widgets/google', google_routes)

// Mount the airtable proxy under /api/airtable
// app.use('/api/airtable', airtableProxy);

// app.use('/api/airtable', airtable_api_routes)
// app.use('/api/bamboohr', bamboohr_api_routes)

// Add health check endpoint BEFORE the server starts listening
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy', 
    timestamp: new Date(),
    version: packageJson.version
  });
});

// Simple readiness check (returns 200 once cache is loaded)
app.get('/ready', (req, res) => {
  res.status(200).json({ ready: true });
});

const startServer = async () => {
    await initCache(); // Server waits here for 20 seconds before listening
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
};

startServer();
