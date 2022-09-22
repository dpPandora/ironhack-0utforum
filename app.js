require('dotenv').config();
require('./db/connect');

const Express = require('express');
const {create, engine} = require('express-handlebars');
const cookieParser = require("cookie-parser");


const app = Express();

//const hbs = create({});

//#region logging
const morgan = require('morgan');
app.use(morgan('dev'));
//#endregion

//#region configs
app.engine('.hbs', engine({
    extname: 'hbs'
}));
app.set('view engine', '.hbs');

app.set('views', __dirname + '/views');
app.use(Express.static(__dirname + '/public'));
app.use(cookieParser());

app.use(Express.json());
app.use(Express.urlencoded({ extended: false }));

//#endregion

//#region session
const session = require("express-session");
const mongoStore = require("connect-mongo");

app.set('trust proxy', 1);
app.use(
    session({
        secret:process.env.SESS_SECRET,
        resave: true,
        saveUninitialized: false,
        cookie: {
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            maxAge: 1.8e+6
        },
        store: mongoStore.create({
            mongoUrl: process.env.MONGODB_URL
        })
    })
);
//#endregion

const homePage = require('./routes/home.routes');
app.use('/', homePage);

const auths = require('./routes/auth.routes');
app.use('/', auths);

const topics = require('./routes/topics.routes');
app.use('/', topics);

const userPages = require('./routes/user.routes');
app.use('/', userPages);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});