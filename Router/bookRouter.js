
import express, { Router } from "express";
import { Book } from "../models/bookModel.js";

const bookRouter = express.Router();

bookRouter.get('/', (request, response) => {
    console.log(request);
    console.log("AGAYE NOJAWAN");
    return response.status(234).send("welcome to MERN Stack tutorial");
})

bookRouter.get('/books', async (request, response) => {
    console.log("Request received for /books");
    try {
        const books = await Book.find({});
        return response.status(200).json(books);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
})

bookRouter.get('/books/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Book.findById(id);
        if (!result) {
            console.log("Required Id does not exist");
            return response.status(404).send({ message: "Unable to find/ delete book" });
        }
        else {
            console.log("boook found!");
            return response.status(200).json(result);
        }        
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message });
    }

});

bookRouter.put('/update/:id', async (request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({
                message: "every data field should be filled"
            })
        }
        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);
        if (!result) {
            return response.status(404).json({ message: "Book Not Found" });
        }
        else
            return response.status(200).json({ message: "Book Updated Successfully" });

    } catch (error) {
        console.log(error.message);
        return response.status(500).send({
            message: error.message
        })

    }
})

bookRouter.post('/addBook', async (request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({
                message: "Send all book Fields",
            })
        }
    }
    catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message });
    }
    const newbook = {
        title: request.body.title,
        author: request.body.author,
        publishYear: request.body.publishYear,
    };
    const book = await Book.create(newbook);
    return response.status(200).send(book);
})


bookRouter.delete('/del/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);
        if (!result) {
            return response.status(404).send({ message: "Unable to find/ delete book" });
        }
        else {
            return response.status(200).send({ message: "Deleted Successfully" });
        }

    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message });
    }
});

export default bookRouter;