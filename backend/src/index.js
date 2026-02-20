import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js'
import trackRoutes from './routes/track.routes.js'

dotenv.config();
const app = express();

app.use(express.json());

const PORT= process.env.PORT;
app.use('/api', authRoutes);
app.use('/api', trackRoutes);

app.listen(PORT, () => console.log(`Server is live at PORT: ${PORT}`));
