import Archive from "../models/Archive.js";
import Mongoose from "mongoose";
import Student from "../models/Student.js";
import fs from "fs";
import path from "path";

export const createArchive = async (req, res) => {
   // * Initializes values
   const studentId = req.params.studentId;
   const { name, description, authorId } = req.fields;
   const tempFile = req.files.file;

   // * Checks if the student exists
   const studentExist = await Student.findById(studentId).lean();
   if (!studentExist) return res.status(500).json("Este alumno ya no existe");

   // * Creates a new archive
   const newId = new Mongoose.Types.ObjectId();
   const archiveCreated = await new Archive({
      _id: newId,
      name: name,
      description: description,
      filepath: path.join(process.cwd(), "uploads", "archives", newId + ".pdf"),
      owner: studentId,
      createdBy: authorId,
   }).save().then(archive => archive.populate("createdBy"));

   // * Adds the new archive id to the category
   await Student.findByIdAndUpdate(studentExist, { $push: { archives: archiveCreated._id } }).lean();

   // * Creates the file in the current working directory
   const archiveComputed = { ...archiveCreated._doc };
   archiveComputed.file = fs.readFileSync(tempFile.path);
   fs.writeFileSync(archiveCreated.filepath, archiveComputed.file);
   fs.unlinkSync(tempFile.path);

   // * Sends the created archive as response
   res.json(archiveComputed);
}

export const getArchives = async (req, res) => {
   // * Gets the parameters
   const studentId = req.params.studentId;
   if (!Mongoose.Types.ObjectId.isValid(studentId)) return res.status(500).json("Este alumno no existe");

   // * Finds all archives from the respective student
   const archivesFound = await Archive.find({ owner: studentId }).populate(["createdBy", "updatedBy"]).lean();

   // * Creates a new array of archives with the data of the corresponding filepaths
   const archivesComputed = [];
   for (let i = 0; i < archivesFound.length; i++) {
      archivesComputed.push({ ...archivesFound[i], file: fs.readFileSync(archivesFound[i].filepath) });
   }

   // * Sends the archives as response
   res.json(archivesComputed);
}


export const updateArchiveById = async (req, res) => {
   // * Initializes values
   const studentId = req.params.studentId;
   const archiveId = req.params.archiveId;
   const { name, description, authorId } = req.fields;
   const tempFile = req.files.file;

   // * Checks if the student exists
   const studentExist = await Student.findById(studentId).lean();
   if (!studentExist) return res.status(500).json("Este candidato ya no existe");

   // * Check if the archive exists, if not then delete the temporal file
   const archiveExist = await Archive.findById(archiveId).lean();
   if (!archiveExist) {
      if (tempFile) {
         fs.unlinkSync(tempFile.path);
      }
      return res.status(500).json("Este archivo ya no existe");
   }

   // * Updates the archive with new values
   const archiveUpdated = await Archive.findByIdAndUpdate(
      archiveId,
      {
         name: name,
         description: description,
         updatedBy: authorId
      },
      { new: true }
   ).populate(["createdBy", "updatedBy"]).lean();

   // * If theres a temporal file, updates the file corresponding to this archive
   if (tempFile) {
      // * Creates a new file
      fs.writeFileSync(archiveUpdated.filepath, fs.readFileSync(tempFile.path));

      // * Deletes the temporal file
      fs.unlinkSync(tempFile.path);
   }

   // * Reads the archive file
   const archiveComputed = { ...archiveUpdated };
   archiveComputed.file = fs.readFileSync(archiveComputed.filepath);

   // * Sends the updated archive as response
   res.json(archiveComputed);
}

export const deleteArchiveById = async (req, res) => {
   // * Gets the parameters
   const studentId = req.params.studentId;
   const archiveId = req.params.archiveId;

   // * Checks if the student exists
   const studentExist = await Student.findById(studentId).lean();
   if (!studentExist) return res.status(500).json("Este candidato ya no existe");

   // * Checks if the archive exists
   const archiveExist = await Archive.findById(archiveId).lean();
   if (!archiveExist) return res.status(500).json("Este archivo ya no existe");

   // * Deletes the archive
   const archiveDeleted = await Archive.findByIdAndDelete(archiveId).lean();

   // * Deletes the file
   fs.unlinkSync(archiveDeleted.filepath);

   // * Removes the archive id from the corresponding student
   await Student.findByIdAndUpdate(studentId, { $pull: { archives: archiveId } }).lean();

   // * Sends a deleted archive as response
   res.json(archiveDeleted);
}



