import 'dotenv/config'
import express from 'express';
import cors from 'cors'

const app = express();
const PORT = process.env.PORT;

var corsOptions = {
  origin: process.env.CLIENT_ORIGIN,
}

app.get('/api', cors(corsOptions), (req, res) => {
  res.send('Hello from the backend!!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});