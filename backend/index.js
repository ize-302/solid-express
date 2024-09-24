import 'dotenv/config'
import express from 'express';
import cors from 'cors'

const app = express();
const PORT = process.env.PORT;

var corsOptions = {
  origin: 'http://localhost:5173',
}

app.get('/api', cors(corsOptions), (req, res) => {
  res.send('Hello from the backend!!');
});

app.listen(PORT, () => {
  console.log(`🔥 API service is running on port ${PORT}`);
});