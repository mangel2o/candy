import express from 'express';
import morgan from 'morgan';
import cors from "cors";
import formidable from 'express-formidable'
import candidatesRoutes from "./routes/candidates.routes.js";
import documentsRoutes from "./routes/documents.routes.js";
import loginRoutes from './routes/login.routes.js';
import { createUsers, createDirs } from './libs/initialSetup.js';
import Category from './models/Category.js';
import Template from './models/Template.js';
import User from "./models/User.js";
import Candidate from './models/Candidate.js';

const app = express();
createUsers();
createDirs();


app.use(cors());
app.use(morgan('dev'));
app.use(formidable({
   uploadDir: process.cwd() + "/uploads",
   maxFileSize: 5 * 1024 * 1024,
}));

app.use('/documents', documentsRoutes);
app.use('/candidates', candidatesRoutes);
app.use('/login', loginRoutes);

export default app;