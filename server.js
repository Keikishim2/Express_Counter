let express = require('express');
let session = require('express-session');
var path = require('path');

let app = express();

app.use(express.static(__dirname + '/static'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(session({
    secret: 'counterific',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 70000 }
}));

app.get('/', function(request, response){
    request.session.page_views++;

    response.render('counter', {
        session: request.session.page_views
    });
})

app.post('/add', function(request, response){
    request.session.page_views++;
    response.redirect('/');
})

app.post('/clear', function(request, response){
    request.session.page_views = 0;
    response.redirect('/');
})

app.listen(8000, function(){
    console.log('Listening to port 8000');
})