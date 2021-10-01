import Document from "../models/Document.js";
import fs from "fs";
import Mongoose from "mongoose";
import path from "path";
import Candidate from "../models/Candidate.js";

export const getDocuments = async (req, res) => {
   const candidateId = req.params.candidateId;

   // * Finds all documents from the respective category
   const documentsFound = await Document.find({ owner: candidateId });

   // * Creates a new array of documents with the data of the corresponding filepaths
   let documentsComputed = [];
   for (let i = 0; i < documentsFound.length; i++) {
      let documentComputed = { ...documentsFound[i]._doc };
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
   const candidateExist = await Candidate.findById(candidateId);
   if (!candidateExist) return res.json({ warning: "Este candidato ya no existe" });

   // * Checks if the document exists, if not then delete the temporal file
   const documentExist = await Document.findById(documentId);
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
   )

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
   const candidateExist = await Candidate.findById(candidateId);
   if (!candidateExist) return res.json({ error: "Este candidato ya no existe" });

   // * Checks if the document exists, if not then delete the temporal file
   const documentExist = await Document.findById(documentId);
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
   )

   // * Sends a success response
   res.json({ success: "Se realizo la operación exitosamente" });
}




