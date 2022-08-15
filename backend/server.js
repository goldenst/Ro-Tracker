const path = require ('path')
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;

// connect to databace

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



// Routes
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));

// Serve Frontend
if(process.env.NODE_ENV === 'production') {
  // set static build
  app.use(express.static(path.join(__dirname, '../frontend/build')))
//app.get('*', (req,res) => res.sendFile(__dirname, '../' , 'frontend', 'build', 'index.html'))
app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
})



} else {
  app.get("/", (req, res) => {
    res.send("Hello!! Welcome to Open Ticket");
  })
}

app.use(errorHandler);

//app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
