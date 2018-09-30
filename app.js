express = require('express');
hbs = require('express-handlebars');
path = require('path');
bodyParser = require('body-parser');

const request = require('request');
const apiKey = '3bb4c18108ae74d112843a7ec65bce4d';

app = express();

var port = 3000;

app.use(bodyParser.json());

app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/public/views/layout',
    partialsDir: [
        __dirname + '/public/views/partials',
    ]
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/public/views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function (req, res) {
    // res.send('harsh');
    res.render('index');
});
app.get('/about', function (req, res) {
    res.render('about-weather');
});

app.get('/dev', function (req, res) {
    res.render('developer');
});

app.get('/arup', function (req, res) {
    res.render('arup');
});

app.get('/aakash', function (req, res) {
    res.render('aakash');
});

app.post('/form', function (req, res) {
    var city = req.body.city;
    console.log(city);
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    request(url, function (err, response, body) {
        if (err) {
            res.render('index', { weather: null, error: 'Error, please try again' });
        } else {
            let weather = JSON.parse(body)
            if (weather.main == undefined) {
                res.render('about-weather', { weather: 'Not a city, please try again', error: 'Error, please try again' });
            } else {
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('about-weather', { weather: weatherText, error: null });
                console.log('weather: ' + weatherText);
            }
        }
    });
});

app.listen(port, function () { console.log(`Example app listening on port ${port}!`) });