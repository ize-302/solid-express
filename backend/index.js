import express from 'express';
const app = express();
const PORT = process.env.PORT || 8000;
import cors from 'cors'

var corsOptions = {
  origin: 'http://localhost:3000',
}

app.get('/api', cors(corsOptions), (req, res) => {
  res.send('Hello from the backend!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});