import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());
app.use(cors({
  origin: ["https://book-tracker-backend-six.vercel.app/"],
  methods: ["POST", "GET"],
  credentials: true
}));


app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Hey hey');
});

app.use('/books', booksRoute);

mongoose
  .connect("mongodb+srv://nivedhan9895:mKgooGnGUKXoHeyH@cluster0.moaqv27.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
