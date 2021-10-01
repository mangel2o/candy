import { Router } from "express";
import * as candidatesController from "../controllers/candidates.controller.js";
import * as documentsController from "../controllers/documents.controller.js";
import * as observationsController from "../controllers/observations.controller.js";
import * as archivesController from "../controllers/archives.controller.js";

const router = Router();

// CANDIDATES
router.get('/', candidatesController.getCandidates);
router.post('/', candidatesController.createCandidate);
router.get('/:candidateId', candidatesController.getCandidateById);
router.put('/:candidateId', candidatesController.updateCandidateById);
router.delete('/:candidateId', candidatesController.deleteCandidateById);

// DOCUMENTS
router.get('/:candidateId/documents', documentsController.getDocuments);
router.put('/:candidateId/documents/:documentId/upload', documentsController.uploadDocumentById);
router.put('/:candidateId/documents/:documentId/update', documentsController.updateDocumentById);

// OBSERVATIONS
router.get('/:candidateId/observations', observationsController.getObservations);
router.post('/:candidateId/observations', observationsController.createObservation);
router.put('/:candidateId/observations/:observationId', observationsController.updateObservationById);
router.delete('/:candidateId/observations/:observationId', observationsController.deleteObservationById);

// ARCHIVES
router.get('/:candidateId/archives', archivesController.getArchives);
router.post('/:candidateId/archives', archivesController.createArchive);
router.put('/:candidateId/archives/:archiveId', archivesController.updateArchiveById);
router.delete('/:candidateId/archives/:archiveId', archivesController.deleteArchiveById);

export default router;