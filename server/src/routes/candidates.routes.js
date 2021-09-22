import { Router } from "express";
import * as candidatesController from "../controllers/candidates.controller";
import * as documentsController from "../controllers/documents.controller";
import * as observationsController from "../controllers/observations.controller";
import * as archivesController from "../controllers/archives.controller";

const router = Router();

// CANDIDATES
router.get('/', candidatesController.getCandidates);
router.post('/', candidatesController.createCandidate);
router.get('/:candidateId', candidatesController.getCandidateById);
router.put('/:candidateId', candidatesController.updateCandidateById);
router.delete('/:candidateId', candidatesController.deleteCandidateById);

// DOCUMENTS
router.get('/:candidateId/documents', documentsController.getDocuments);
router.post('/:candidateId/documents', documentsController.createDocument);
router.put('/:candidateId/documents/:documentId', documentsController.updateDocumentById);
router.delete('/:candidateId/documents/:documentId', documentsController.deleteDocumentById);

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