import { Schema as _Schema, model } from 'mongoose'
const Schema    = _Schema

//input Schema

const imageSchema = new Schema({
    imageId:{
        type: Number
    },
    name:{
        type: String
    },
    url:{
        type: String
    },
    size:{
        type: String
    }
}, 

{timestamps: true})

const Image = model('Image', imageSchema);
export default Image;