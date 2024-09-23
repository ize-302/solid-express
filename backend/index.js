import 'dotenv/config'
import express from 'express';
const app = express();
const PORT = process.env.PORT;
import cors from 'cors'


var corsOptions = {
  origin: process.env.CLIENT_ORIGIN,
}

app.get('/api', cors(corsOptions), (req, res) => {
  res.send('Hello from the backend!!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});