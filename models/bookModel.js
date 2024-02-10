import mongoose from "mongoose";

// ye model hai hamare lye hai 
const bookModel = mongoose.Schema(
    {
        title: { type: String, required: true, },
        author: { type: String, required: true, },
        publishYear: { type: Number, required: true, },
    },
    { timesStamps: true }
)

// ab jo model banaya hai usey use krne k lye usey mongoosse.model me convert karenge
export const Book = mongoose.model('BookStore', bookModel);
