import express from 'express';
import dotenv from 'dotenv';
import './db/db.js'
import userRoutes from './routes/userRoutes.js'
const app = express();
dotenv.config();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api', userRoutes);


app.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`);
})