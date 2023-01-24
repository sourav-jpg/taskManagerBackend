const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDb = require("./server/database/connection");
const route = require("./server/routes/routes");

dotenv.config({path:"config.env"});
const PORT = process.env.PORT||8080;

connectDb();
app.use(express.json());
app.use("/api/tasks",route);

app.listen(PORT,()=>console.log(`server is listeing on ${PORT}`));