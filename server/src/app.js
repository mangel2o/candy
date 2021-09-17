import express from 'express';
import morgan from 'morgan';
import cors from "cors";
import formidable from 'express-formidable'
import candidatesRoutes from "./routes/candidates.routes";
import documentsRoutes from "./routes/documents.routes";
import loginRoutes from './routes/login.routes';
import { createUsers, createDirs } from './libs/initialSetup';
import Category from './models/Category';

const app = express();
createUsers();
createDirs();

app.use(cors());
app.use(morgan('dev'));
app.use(formidable({
   uploadDir: process.cwd() + "/uploads",
}));

app.use('/documents', documentsRoutes);
app.use('/candidates', candidatesRoutes);
app.use('/login', loginRoutes);

export default app;