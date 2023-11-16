import express from 'express';
import dotenv from 'dotenv';
import './db/db.js'

const app = express();
dotenv.config();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send("App")
})

app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
})