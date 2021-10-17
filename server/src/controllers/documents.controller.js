import Document from "../models/Document.js";
import fs from "fs";
import path from "path";
import Student from "../models/Student.js";

export const getDocuments = async (req, res) => {
   const studentId = req.params.studentId;

   // * Finds all documents from the respective category
   const documentsFound = await Document.find({ owner: studentId }).lean();

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
   const studentId = req.params.studentId;
   const documentId = req.params.documentId;
   const tempFile = req.files.file;

   // * Checks if the student exists
   const studentExist = await Student.findById(studentId).lean();
   if (!studentExist) return res.json({ warning: "Este candidato ya no existe" });

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
   await Student.findByIdAndUpdate(studentId, { status: "Pendiente" }, { new: true }).lean();

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

   // * Checks if the student exists
   const studentExist = await Student.findById(candidateId).lean();
   if (!studentExist) return res.json({ error: "Este candidato ya no existe" });

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

   updateStudentStatus(candidateId, status);

   // * Sends a success response
   res.json({ success: "Se realizo la operación exitosamente" });
}


export const deleteDocumentById = async (req, res) => {
   // * Initializes values
   const studentId = req.params.studentId;
   const documentId = req.params.documentId;

   // * Checks if the student exists
   const studentExist = await Student.findById(studentId).lean();
   if (!studentExist) return res.json({ error: "Este candidato ya no existe" });

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
   const studentDocuments = await Document.find({ owner: studentId, category: documentDeleted.category }).lean();
   if (studentDocuments.length < 1) {
      await Student.findByIdAndUpdate(
         studentId,
         { $pull: { categories: documentDeleted.category } },
         { new: true }
      ).lean();
   }

   // * Sends a success response
   res.json({ success: "Se realizo la operación exitosamente" });
}

const updateStudentStatus = async (studentId, updatedStatus) => {
   const studentDocuments = await Document.find({ owner: studentId }).lean().select("status");
   const documents = studentDocuments.filter((document) => document.status !== "Vacio");

   if (documents.every((document) => document.status === updatedStatus)) {
      await Student.findByIdAndUpdate(studentId, { status: updatedStatus }, { new: true }).lean();
   } else if (documents.some((document) => document.status === "Pendiente")) {
      await Student.findByIdAndUpdate(studentId, { status: "Pendiente" }, { new: true }).lean();
   } else if (documents.some((document) => document.status === "Retenido")) {
      await Student.findByIdAndUpdate(studentId, { status: "Retenido" }, { new: true }).lean();
   } else if (documents.some((document) => document.status === "Incompleto")) {
      await Student.findByIdAndUpdate(studentId, { status: "Incompleto" }, { new: true }).lean();
   }
}
