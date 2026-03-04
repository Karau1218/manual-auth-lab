import express from 'express';
import defaultRouter from './routers/routes.js';
import session from "express-session";
//add application routes...
//configure Express.js app
const app = express();

// create express app...
//Express sessions first
app.use(session({
secret: process.env.SESSION_SECRET,
resave: false,
saveUninitialized: true
}));

// Attach user to every request SECOND
app.use((req, res, next) => {
if (req.session.user) {
req.user = req.session.user;
    } else {
        req.user = null;
    }
    next();
});

//view engine
app.set("view engine", "ejs");
app.set("views", "src/views");

//static directories
app.use(express.static('public'));

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routers
app.use("/", defaultRouter);

export default app;