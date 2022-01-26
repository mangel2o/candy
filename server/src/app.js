import express from 'express';
import morgan from 'morgan';
import cors from "cors";
import formidable from 'express-formidable'
import studentsRoutes from "./routes/students.routes.js";
import documentsRoutes from "./routes/documents.routes.js";
import loginRoutes from './routes/login.routes.js';
import adminRoutes from './routes/admin.routes.js';
import accountRoutes from './routes/account.routes.js';
import { createUsers, createDirs } from './libs/initialSetup.js';
import Category from './models/Category.js';
import Template from './models/Template.js';
import User from "./models/User.js";
import Student from './models/Student.js';
import Archive from './models/Archive.js';
import Document from './models/Document.js';
import Observation from './models/Observation.js';
import Action from './models/Action.js';

// * To reset all collections in mongodb
// Category.collection.drop();
// Template.collection.drop();
// User.collection.drop();
// Student.collection.drop();
// Archive.collection.drop();
// Document.collection.drop();
// Observation.collection.drop();
// Action.collection.drop();

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
app.use('/students', studentsRoutes);
app.use('/login', loginRoutes);
app.use('/admin', adminRoutes);
app.use('/account', accountRoutes);


export default app;