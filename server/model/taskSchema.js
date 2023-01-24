const mongoose = require('mongoose');
const Schema = mongoose.Schema


const tasks = new Schema({
    name:{
        type:String,
        required:[true, 'must provide a name'],
        trim:true,
        maxLength:[20,'name cannot be more than 20 character'],
    },
    completed:{
        type:Boolean,
        default:false
    }
});

const Tasks = mongoose.model("Task",tasks);
module.exports = Tasks;