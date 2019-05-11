const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const config = require("config");
const session = require("express-session")
const multer = require("multer")

//Keys Config
const database = config.get("mongoURI");

//Routers Configuration
const vacationRouter = require("./routes/vacation.router");
const loginRouter = require("./routes/login.router");
const registerRouter = require("./routes/register.router");
const logoutRouter = require("./routes/logout.router");

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log(`made a connection ${socket.id}`)

  socket.on('updateVacationsRequest', () => {
    console.log('RECEIVED upload vacation request from socket ')
    socket.broadcast.emit('updateVacations')
  })
});
server.listen(5001, () => {console.log('Socket listening on port 5001')});
// Session Consts
const TWO_HOURS = 1000 * 60 * 60 * 2;
const {
  SESS_SECRET = "db3d4601-7c2f-452d-b289-b170f8473faa",
  SESS_LIFETIME = TWO_HOURS,
} = process.env;

//Session Configuration
const Session = {
  name: "sid",
  resave: false,
  saveUninitialized: false,
  secret: SESS_SECRET,
  proxy: true,
  cookie: {
    maxAge: SESS_LIFETIME,
    sameSite: true,
    secure: false,
  },
};

// Connection to MongoDB Atlas
mongoose
  .connect('mongodb://localhost/vacations', {
    useNewUrlParser: true,
    useCreateIndex: true,
  }) // Adding new mongo url parser
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

// ────────────────────────────────────────────────────────────────────────────────
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(session(Session));


//Routers
app.use("/api/vacations", vacationRouter);
app.use("/api/login", loginRouter);
app.use("/api/register", registerRouter);
app.use("/api/logout", logoutRouter);


module.exports = app;
