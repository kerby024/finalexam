var users = require('./../controllers/users');
var path = require('path')

module.exports = function(app){
    app.post('/login', function(req, res){
        users.login(req, res)
    })
    app.get('/sess', function(req, res){
        users.checksess(req, res);
    })
    app.get('/logout', function(req, res){
        users.logout(req, res);
    })
    app.post('/addquestion', function(req, res){
        users.addquestion(req, res);
    })
    app.get('/getall', function(req, res){
        users.getall(req, res);
    })
    app.get('/getonequestion/:id', function(req, res){
        users.getonequestion(req, res)
    })
    app.get('/remove/:id', function(req, res){
        users.deletequestion(req, res);
    })
    app.get('/like1/:id', function(req, res){
        users.likeanswer1(req, res)
    })
    app.get('/like2/:id', function(req, res){
        users.likeanswer2(req, res)
    })
    app.get('/like3/:id', function(req, res){
        users.likeanswer3(req, res)
    })

    app.all('**', (req, res) => {res.sendFile(path.resolve('./client/dist/index.html'))})
}