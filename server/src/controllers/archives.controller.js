import Archive from "../models/Archive.js";
import Mongoose from "mongoose";
import Candidate from "../models/Candidate.js";
import fs from "fs";
import path from "path";

export const createArchive = async (req, res) => {
   // * Initializes values
   const candidateId = req.params.candidateId;
   const { name, description, authorId } = req.fields;
   const tempFile = req.files.file;

   // * Checks if the candidate exists
   const candidateExist = await Candidate.findById(candidateId);
   if (!candidateExist) return res.json({ warning: "Este candidato ya no existe" });

   // * Creates a new archive
   const newId = new Mongoose.Types.ObjectId();
   const archiveCreated = await new Archive({
      _id: newId,
      name: name,
      description: description,
      filepath: path.join(process.cwd(), "uploads", "archives", newId + ".pdf"),
      owner: candidateId,
      createdBy: authorId,
   }).save();

   // * Adds the new template id to the category
   await Candidate.findByIdAndUpdate(candidateExist, { $push: { archives: archiveCreated._id } },);

   // * Creates the file in the current working directory
   fs.writeFileSync(archiveCreated.filepath, fs.readFileSync(tempFile.path));
   fs.unlinkSync(tempFile.path);

   // * Sends the created template as response
   res.json(archiveCreated);

}

export const getArchives = async (req, res) => {
   // * Gets the parameters
   const candidateId = req.params.candidateId;

   // * Finds all templates from the respective category
   const archivesFound = await Archive.find({ owner: candidateId });

   // * Creates a new array of templates with the data of the corresponding filepaths
   let candidatesComputed = [];
   for (let i = 0; i < archivesFound.length; i++) {
      candidatesComputed.push({ ...archivesFound[i]._doc, file: fs.readFileSync(archivesFound[i]._doc.filepath) });
   }

   // * Sends the templates as response
   res.json(candidatesComputed);
}


export const updateArchiveById = async (req, res) => {
   // * Initializes values
   const candidateId = req.params.candidateId;
   const archiveId = req.params.archiveId;
   const { name, description, authorId } = req.fields;
   const tempFile = req.files.file;

   // * Checks if the category exists
   const candidateExist = await Candidate.findById(candidateId);
   if (!candidateExist) return res.json({ error: "Este candidato ya no existe" });

   // * Check if the template exists, if not then delete the temporal file
   const archiveExist = await Archive.findById(archiveId);
   if (!archiveExist) {
      if (tempFile) {
         fs.unlinkSync(tempFile.path);
      }
      return res.json({ error: "Este archivo ya no existe" });
   }

   // * Updates the template with new values
   const archiveUpdated = await Archive.findByIdAndUpdate(
      archiveId,
      {
         name: name,
         description: description,
         updatedBy: authorId
      },
      { new: true }
   )

   // * If theres a temporal file, updates the file corresponding to this template
   if (tempFile) {
      // * Creates a new file
      fs.writeFileSync(archiveUpdated.filepath, fs.readFileSync(tempFile.path));

      // * Deletes the temporal file
      fs.unlinkSync(tempFile.path);
   }

   // * Sends a success response
   res.json({ success: "Se realizo la operación exitosamente" });
}

export const deleteArchiveById = async (req, res) => {
   // * Gets the parameters
   const candidateId = req.params.candidateId;
   const archiveId = req.params.archiveId;

   // * Checks if the category exists
   const candidateExist = await Candidate.findById(candidateId);
   if (!candidateExist) return res.json({ error: "Este candidato ya no existe" });

   // * Checks if the template exists
   const archiveExist = await Archive.findById(archiveId);
   if (!archiveExist) return res.json({ error: "Este archivo ya no existe" });

   // * Deletes the archive
   const archiveDeleted = await Archive.findByIdAndDelete(archiveId);

   // * Deletes the file
   fs.unlinkSync(archiveDeleted.filepath);

   // * Removes the template id from the corresponding category
   await Candidate.findByIdAndUpdate(candidateId, { $pull: { archives: archiveId } });

   // * Sends a success response
   res.json({ success: "Se realizo la operación exitosamente" });
}



