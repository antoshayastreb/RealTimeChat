const express = require("express");
const app = express(); 
const dotenv = require("dotenv").config();
const mongoose = require('mongoose');
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");

const PORT = process.env.PORT


const uri = `mongodb+srv://mongodb:${process.env.DBPASSWORD}${process.env.DBURI}${process.env.DBNAME}?retryWrites=true&w=majority`

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("Connected to MongoDB");
    }
  );



app.use(express.json());


app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

app.listen(PORT, () => {
    console.log(`Сервер запущен! http://localhost:${PORT}`);
  });