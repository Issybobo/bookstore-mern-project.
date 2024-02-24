import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
//import { Book } from "./models/bookModel.js";
import { router as booksRoute } from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

// Middleware for parsing request body

app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1. Allow all origins with default of cors(*)

app.use(cors());
// Option 2: Allow Custom Origins
/*app.use(
    cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
})
);*/

app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send('Welcome to MERN STACK TUTORIAL')
})



app.use('/books', booksRoute);
    

mongoose.connect(mongoDBURL)
.then(() => {
    console.log('App is connected to database');
  
})
app.listen(PORT, () => {
    console.log(`App is listening to port: ${PORT}`);
});
