import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import notesRoutes from './routes/notes.routes.js';
import connectDB from './configs/mongoose.js';

const port = process.env.PORT || 3000;
const app = express();

//Middlewares 
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/notes', notesRoutes);

(async () => {
  try {
    console.log('Connecting to database...')
    await connectDB(process.env?.MONGO_URI);
    console.log("Connected to database:", process.env?.DATABASE_NAME);
    app.listen(port, () => console.log(`App is listening on port ${port}`));
  } catch (error) {
    console.log("Error while connecting to database:\n" + error);
  } finally {
    console.log('done')
  }
})();