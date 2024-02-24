import express from "express";
import { Book } from "../models/bookModel.js";

export const router = express.Router();


router.post('/', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishedYear
        ) {
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishedYear',
            });
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishedYear: req.body.publishedYear
        };

        const book = await Book.create(newBook);
        return res.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});
//
// Route for Get all books from database
router.get('/', async (req, res) => {
    try{
        const books = await Book.find({});

        return res.status(200).json({
            count: books.length,
            data: books
        });
    } catch(error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
})

// Route for Get all books from database
router.get('/:id', async (req, res) => {
    try{

        const { id } = req.params;

        const book = await Book.findById(id);

        return res.status(200).json(book);
    } catch(error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
})

// Route for update a book

router.put('/:id', async (req, res) => {
    try{
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishedYear
        ) { 
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishedYear',
            });
        }

        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);

        if (!result ) {
            return res.status(404).json({message: " Back Not found"});
        }

        return res.status(200).send({message: 'Book Updated Succesfully'})
         
    } catch(error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }

})

// Route dor delete books
router.delete('/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);

        if (!result ) {
            return res.status(404).json({message: " Back Not found"});
        }

        return res.status(200).send({message: 'Book delete Succesfully'})


}catch(error) {
    console.log(error.message);
    res.status(500).send({message: error.message})
}
});