const express = require('express');
const dotEnv= require("dotenv").config();
const app = express();
const port =process.env.PORT || 3000;
const GraphDataRoute = require('./routes/GraphDataRoute')
// const connectToDB = require('./config/dbConnection');

app.use(express.json());
app.use('/graphPoints',GraphDataRoute);
// connectToDB();

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})