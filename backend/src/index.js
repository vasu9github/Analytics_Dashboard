import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js'
import trackRoutes from './routes/track.routes.js'
import analytivdcsRoutes from './routes/analytics.routes.js'
import cors from 'cors';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

const PORT= process.env.PORT;
app.use('/api', authRoutes);
app.use('/api', trackRoutes);
app.use('/api', analytivdcsRoutes);

app.listen(PORT, () => console.log(`Server is live at PORT: ${PORT}`));
