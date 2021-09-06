import express from 'express';
import morgan from 'morgan';
import cors from "cors";
import formidable from 'express-formidable'
import candidatesRoutes from "./routes/candidates.routes";
import documentsRoutes from "./routes/documents.routes";
import loginRoutes from './routes/login.routes';
import { createRoles } from './libs/initialSetup';

const app = express();
createRoles();

app.use(cors());
app.use(morgan('dev'));
app.use(formidable());

app.use('/documents', documentsRoutes);
app.use('/candidates', candidatesRoutes);
app.use('/login', loginRoutes);

export default app;