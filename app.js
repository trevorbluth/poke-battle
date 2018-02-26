var express = require('express'),
	bodyParser = require('body-parser');

var app = express();

var port=process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


//pokeRouter
pokeRouter = require('./Routes/pokeRouter');
//marvelRouter
supersRouter = require('./Routes/supersRouter');

app.use('/api/books', bookRouter);
//app.use('/api/author', authorRouter);


app.get('/', function(req,res){
	res.send('Welcome to my API!');
});

app.listen(port, function(){
	console.log('Gulp is Running on PORT: ' + port);
});
module.exports = app;
