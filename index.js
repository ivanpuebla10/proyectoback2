const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { MONGO_URI } = require("./config/keys");
const PORT = process.env.PORT || 4000;
const swaggerUI = require('swagger-ui-express')
const docs = require('./docs/index')
const cors = require('cors')

app.use(express.json());
app.use(cors())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});


mongoose
  .connect(MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("conectado a mongoDB con éxito"))
  .catch((err) => console.error(err));

 

app.use('/posts', require('./routes/posts'));
app.use('/users', require('./routes/users'));
app.use('/api-docs', swaggerUI.serve,swaggerUI.setup(docs))


app.listen(PORT, console.log(`Server started on port ${PORT}`));