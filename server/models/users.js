var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    questions: [{type: Schema.Types.ObjectId, ref: "Question"}]
    })

mongoose.model('User', UserSchema)