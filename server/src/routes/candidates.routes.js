import { Router } from "express";
import * as candidatesController from "../controllers/candidates.controller";
import * as documentsController from "../controllers/documents.controller";
import * as observationsController from "../controllers/observations.controller";
import * as archivesController from "../controllers/archives.controller";

const router = Router();

// CANDIDATES
router.get('/', candidatesController.getCandidates);
router.post('/', candidatesController.createCandidate);
router.get('/:candidateNumber', candidatesController.getCandidateById);
router.put('/:candidateNumber', candidatesController.updateCandidateById);
router.delete('/:candidateNumber', candidatesController.deleteCandidateById);

// DOCUMENTS
router.get('/:candidateNumber/documents', documentsController.getDocuments);
router.put('/:candidateNumber/documents/:documentId', documentsController.updateDocumentById);
router.delete('/:candidateNumber/documents/:documentId', documentsController.deleteDocumentById);

// OBSERVATIONS
router.get('/:candidateNumber/observations', observationsController.getObservations);
router.post('/:candidateNumber/observations', observationsController.createObservation);
router.put('/:candidateNumber/observations/:observationId', observationsController.updateObservationById);
router.delete('/:candidateNumber/observations/:observationId', observationsController.deleteObservationById);

// ARCHIVES
router.get('/:candidateNumber/archives', archivesController.getArchives);
router.post('/:candidateNumber/archives', archivesController.createArchive);
router.put('/:candidateNumber/archives/:archiveId', archivesController.updateArchiveById);
router.delete('/:candidateNumber/archives/:archiveId', archivesController.deleteArchiveById);

export default router;