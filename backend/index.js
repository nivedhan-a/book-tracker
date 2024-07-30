import express from 'express';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
app.use(
  cors({
    origin: 'https://book-tracker-frontend-chi.vercel.app', // Allow your frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    allowedHeaders: ['Content-Type'], // Specify allowed headers
    credentials: true, // Allow credentials to be sent
  })
);

app.get('/', (request, response) => {
  console.log(request);
  return response.status(200).send('hey hey'); // Use 200 for success
});

app.use('/books', booksRoute);

mongoose
  .connect(process.env.mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(process.env.PORT, () => {
      console.log(`App is listening to port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
