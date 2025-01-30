

const express = require('express');
const dotenv = require('dotenv');
// const { google } = require('googleapis');
const fetch = require('node-fetch');
const cors = require('cors');

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

// List of allowed origins
const allowedOrigins = [
  'https://greyzone.vercel.app', // This is the frontend that should be allowed
  'https://tandhconsult-vens-projects-e1aafec6.vercel.app', // Remove trailing slash
  'http://localhost:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    // If there's no origin (i.e., for direct API calls from Postman or curl), allow it
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Block the request
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

// Middleware to handle preflight requests
app.options('*', cors()); // Allow preflight requests for all routes

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("success");
});

app.post(`/scarlettelove/:id`, async (req, res) => {
  try {
    const response = await fetch(`http://scarlettelove.com/google-sheets-api/api/${req.params.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    if(data.response){
      res.status(200).send(data); 
    }else{
      res.status(200).send({'response': data.message});
    }
  } catch (error) {
    res.status(500).send('Error: ' + error.message);
  }
});


// Export app for serverless functions in Vercel
// module.exports = app;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});