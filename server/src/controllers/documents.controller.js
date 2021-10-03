import Document from "../models/Document.js";
import fs from "fs";
import Mongoose from "mongoose";
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

   // * Checks if the category exists
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

   updateCandidateStatus(candidateId);

   // * Sends a success response
   res.json({ success: "Se realizo la operación exitosamente" });
}

const updateCandidateStatus = async (candidateId) => {
   const statuses = ["Completo", "Incompleto", "Retenido"];
   const candidateDocuments = await Document.find({ owner: candidateId }).lean().select("status");
   if (candidateDocuments.some((document) => document.status === "Pendiente" || document.status === "Retenido")) {
      await Candidate.findByIdAndUpdate(candidateId, { status: "Pendiente" }, { new: true }).lean();
   } else if (candidateDocuments.every((document) => document.status === "Vacio")) {
      await Candidate.findByIdAndUpdate(candidateId, { status: "Vacio" }, { new: true }).lean();
   } else {
      const filteredDocuments = candidateDocuments.filter((document) => document.status !== "Vacio");
      for (const value of statuses) {
         if (filteredDocuments.every((document) => document.status === value)) {
            await Candidate.findByIdAndUpdate(candidateId, { status: value }, { new: true }).lean();
         }
      }
   }
}

export const deleteDocumentById = async (req, res) => {

}