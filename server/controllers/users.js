var mongoose = require('mongoose')
var User = mongoose.model('User')
var Question = mongoose.model('Question')

module.exports = {
    login:function(req, res){
        User.find({name: req.body.name}, function(err, users){
            if(users.length < 1){
                User.create({name: req.body.name}, function(err, user){
                    req.session.user = user
                    req.session.save()
                    res.json({user: user})
                })
            }
            else{
                req.session.user = users[0];
                req.session.save()
                res.json({user: users[0]})
            }
        })
    },

    checksess:function(req, res){
        if(req.session.user == undefined){
            res.json({user: null})
        }
        else{
            res.json({user: req.session.user})
        }
    },

    addquestion:function(req, res){
        Question.findOne({question: req.body.question, option1: req.body.option1, option2: req.body.option2, option3: req.body.option3}, function(err, questionFound){
            if(!questionFound){
                Question.create({user: req.session.user, person: req.session.user.name, question:req.body.question, option1: req.body.option1, option2: req.body.option2, option3: req.body.option3}, function(err,questionMade){
                    console.log(questionMade)
                    return res.json(questionMade)
                })
            }
            else{ 
                return res.json(questionFound)}
        })
    },

    getall:function(req, res){
        Question.find({}, function(err, questions){
            res.json(questions)
        })
    },

    // .populate('comments').exec
    getonequestion:function(req, res){
        Question.findOne({_id: req.params.id}, function(err, questionfound){
            res.json(questionfound)
        })
    },

    likeanswer1:function(req, res){
        Question.findOne({_id: req.params.id}, function(err, question){
            question.likeoption1 += 1;
            question.save()
            res.redirect('/poll/'+ req.params.id)
        })
    },

    likeanswer2:function(req, res){
        Question.findOne({_id: req.params.id}, function(err, question){
            question.likeoption2 += 1;
            question.save()
            res.redirect('/poll/'+ req.params.id)
        })
    },

    likeanswer3:function(req, res){
        Question.findOne({_id: req.params.id}, function(err, question){
            question.likeoption3 += 1;
            question.save()
            res.redirect('/poll/'+ req.params.id)
        })
        
    },

    deletequestion:function(req, res){
        Question.findOne({_id: req.params.id}, function(err, question){
            question.remove()
        })
            res.redirect('/home')
    },

    logout: (req, res) => {
        req.session.destroy();
        res.redirect('/')
    }
}