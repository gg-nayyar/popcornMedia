import mongoose from 'mongoose';

const selectionSchema = new mongoose.Schema({
    city: {
        type: {
            type: String,
            required: true
        },
    },
    categories:[
        {
            type: String,
            required: true
        }
    ],
    movies: [
        {
            type: String,
            required: true
        }
    ],
    theatres: [
        {
            type: String,
            required: true
        }
    ],

})

const SelectionSchema = mongoose.model('Selection', selectionSchema);
export default SelectionSchema;