import Document from "../models/Document.js";
import fs from "fs";
import path from "path";
import Candidate from "../models/Candidate.js";

export const getDocuments = async (req, res) => {
   const candidateId = req.params.candidateId;

   // * Finds all documents from the respective category
   const documentsFound = await Document.find({ owner: candidateId }).lean();

   // * Creates a new array of documents with the data of the corresponding filepaths
   let documentsComputed = [];
   for (let i = 0; i < documentsFound.length; i++) {
      let documentComputed = { ...documentsFound[i] };
      documentComputed.example = fs.readFileSync(documentComputed.examplePath);

      if (documentComputed.filepath) {
         documentComputed.file = fs.readFileSync(documentComputed.filepath);
      }

      documentsComputed.push(documentComputed);
   }

   res.json(documentsComputed);
}

export const uploadDocumentById = async (req, res) => {
   // * Initializes values
   const candidateId = req.params.candidateId;
   const documentId = req.params.documentId;
   const tempFile = req.files.file;

   // * Checks if the candidate exists
   const candidateExist = await Candidate.findById(candidateId).lean();
   if (!candidateExist) return res.json({ warning: "Este candidato ya no existe" });

   // * Checks if the document exists, if not then delete the temporal file
   const documentExist = await Document.findById(documentId).lean();
   if (!documentExist) {
      if (tempFile) {
         fs.unlinkSync(tempFile.path);
      }
      return res.json({ error: "Este documento ya no existe" });
   }

   // * Updates the document with new values
   const documentUpdated = await Document.findByIdAndUpdate(
      documentId,
      {
         filepath: path.join(process.cwd(), "uploads", "documents", documentId + ".pdf"),
         status: "Pendiente"
      },
      { new: true }
   ).lean();

   // * Updates the candidate status to pending
   await Candidate.findByIdAndUpdate(candidateId, { status: "Pendiente" }, { new: true }).lean();

   // * Creates the file in the current working directory
   fs.writeFileSync(documentUpdated.filepath, fs.readFileSync(tempFile.path));
   fs.unlinkSync(tempFile.path);

   // * Sends the created document as response
   res.json(documentUpdated);
}


export const updateDocumentById = async (req, res) => {
   // * Initializes values
   const candidateId = req.params.candidateId;
   const documentId = req.params.documentId;
   const { comment, status, authorId } = req.fields;

   // * Checks if the candidate exists
   const candidateExist = await Candidate.findById(candidateId).lean();
   if (!candidateExist) return res.json({ error: "Este candidato ya no existe" });

   // * Checks if the document exists, if not then delete the temporal file
   const documentExist = await Document.findById(documentId).lean();
   if (!documentExist) return res.json({ error: "Este documento ya no existe" });

   // * Updates the document with new values
   const documentUpdated = await Document.findByIdAndUpdate(
      documentId,
      {
         comment: comment,
         status: status,
         updatedBy: authorId
      },
      { new: true }
   ).lean();

   updateCandidateStatus(candidateId, status);

   // * Sends a success response
   res.json({ success: "Se realizo la operación exitosamente" });
}


export const deleteDocumentById = async (req, res) => {
   // * Initializes values
   const candidateId = req.params.candidateId;
   const documentId = req.params.documentId;

   // * Checks if the candidate exists
   const candidateExist = await Candidate.findById(candidateId).lean();
   if (!candidateExist) return res.json({ error: "Este candidato ya no existe" });

   // * Checks if the document exists
   const documentExist = await Document.findById(documentId).lean();
   if (!documentExist) return res.json({ error: "Este documento ya no existe" });

   // * Deletes the document 
   const documentDeleted = await Document.findByIdAndDelete(documentId).lean();

   // * Deletes the file corresponeding to this document
   if (documentDeleted.filepath) {
      fs.unlinkSync(documentDeleted.filepath);
   }

   // * Checks if there are documents with the same category remaining, if not then pull the id from the candidate
   const candidateDocuments = await Document.find({ owner: candidateId, category: documentDeleted.category }).lean();
   if (candidateDocuments.length < 1) {
      await Candidate.findByIdAndUpdate(
         candidateId,
         { $pull: { categories: documentDeleted.category } },
         { new: true }
      ).lean();
   }


   // * Sends a success response
   res.json({ success: "Se realizo la operación exitosamente" });
}

const updateCandidateStatus = async (candidateId, updatedStatus) => {
   const candidateDocuments = await Document.find({ owner: candidateId }).lean().select("status");
   const documents = candidateDocuments.filter((document) => document.status !== "Vacio");

   if (documents.every((document) => document.status === updatedStatus)) {
      await Candidate.findByIdAndUpdate(candidateId, { status: updatedStatus }, { new: true }).lean();
   } else if (documents.some((document) => document.status === "Pendiente")) {
      await Candidate.findByIdAndUpdate(candidateId, { status: "Pendiente" }, { new: true }).lean();
   } else if (documents.some((document) => document.status === "Retenido")) {
      await Candidate.findByIdAndUpdate(candidateId, { status: "Retenido" }, { new: true }).lean();
   } else if (documents.some((document) => document.status === "Incompleto")) {
      await Candidate.findByIdAndUpdate(candidateId, { status: "Incompleto" }, { new: true }).lean();
   }
}
