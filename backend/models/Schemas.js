const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Contents are structured to by dependency. Lowest Dependency goes first.

const pointSchema = new Schema({
    type:{
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }

});

const userSchema = new Schema({
    Username: {type:String, required:true},
    Name: {type:String, required:true},
    //Last time they checked in
    Date: {type:Date, default:Date.now},
    DOB:{type:Date, default: new Date(1990,1,1)},
    Phone:{type:String, required:true},

        //Coordinates posted here for simplicity
    location:{type: pointSchema}
})

const voiceMessage = new Schema({
    message: {type:String},

    //Not sure what data type is for recordings, this might be specified later.
    //recording: {type:Blob},
    user: {
        type:Schema.Types.ObjectId,
        ref:'users'
    }
})

const Users = mongoose.model('users', userSchema, 'users')
const Message = mongoose.model('messages', voiceMessage, 'messages')

const mySchemas = {'users': Users, 'messages': Message};

module.exports = mySchemas;