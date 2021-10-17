import { Router } from "express";
import * as studentsController from "../controllers/students.controller.js";
import * as documentsController from "../controllers/documents.controller.js";
import * as observationsController from "../controllers/observations.controller.js";
import * as archivesController from "../controllers/archives.controller.js";

const router = Router();

// STUDENTS
router.get('/', studentsController.getStudents);
router.post('/', studentsController.createStudent);
router.post('/excel', studentsController.createStudentsWithExcel);
router.get('/excel', studentsController.getExcel);
router.get('/:studentId', studentsController.getStudentById);
router.put('/:studentId', studentsController.updateStudentById);
router.delete('/:studentId', studentsController.deleteStudentById);

// DOCUMENTS
router.get('/:studentId/documents', documentsController.getDocuments);
router.put('/:studentId/documents/:documentId/upload', documentsController.uploadDocumentById);
router.put('/:studentId/documents/:documentId/update', documentsController.updateDocumentById);
router.delete('/:studentId/documents/:documentId', documentsController.deleteDocumentById);

// OBSERVATIONS
router.get('/:studentId/observations', observationsController.getObservations);
router.post('/:studentId/observations', observationsController.createObservation);
router.put('/:studentId/observations/:observationId', observationsController.updateObservationById);
router.delete('/:studentId/observations/:observationId', observationsController.deleteObservationById);

// ARCHIVES
router.get('/:studentId/archives', archivesController.getArchives);
router.post('/:studentId/archives', archivesController.createArchive);
router.put('/:studentId/archives/:archiveId', archivesController.updateArchiveById);
router.delete('/:studentId/archives/:archiveId', archivesController.deleteArchiveById);

export default router;