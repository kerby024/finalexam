var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    person: String,
    question: String,
    option1: String,
    option2: String,
    option3: String,
    likeoption1: {type: Number, default: 0},
    likeoption2: {type: Number, default: 0},
    likeoption3: {type: Number, default: 0},
    },
    {timestamps: true})

mongoose.model('Question', QuestionSchema);