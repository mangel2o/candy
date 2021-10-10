import Mongoose from "mongoose";
import Candidate from "../models/Candidate.js";
import Template from "../models/Template.js";
import Document from "../models/Document.js";
import Observation from "../models/Observation.js";
import User from "../models/User.js";
import Archive from "../models/Archive.js";
import fs from "fs";

/**
 * * Creates a new candidate and user
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const createCandidate = async (req, res) => {
   // * Gets values
   const data = req.fields;
   data.number = data.number.toLowerCase();
   const categoryIds = data.categories.split(',');

   // * Checks if the candidate already exists
   const candidateExist = await Candidate.findOne({ number: data.number }).lean();
   if (candidateExist) return res.json({ error: "Esta matricula ya esta en uso" });

   // TODO: Create a random generated password

   // * Creates a new user
   const userCreated = await new User({
      name: data.name,
      number: data.number,
      campus: data.campus,
      personalEmail: data.personalEmail,
      institutionalEmail: data.number + "@tecmilenio.mx",
      password: await User.encryptPassword("password"),
      role: "user"
   }).save();

   // TODO: Implement a way of sending emails to newly created users/candidates

   // * Creates a new candidate
   const candidateCreated = await new Candidate({
      name: data.name,
      number: data.number,
      level: data.level,
      campus: data.campus,
      genre: data.genre,
      active: data.active,
      career: data.career,
      phone: data.phone,
      personalEmail: data.personalEmail,
      institutionalEmail: data.number + "@tecmilenio.mx",
      modality: data.modality,
      terminationPeriod: data.terminationPeriod,
      terminationYear: data.terminationYear,
      graduationPeriod: data.graduationPeriod,
      graduationYear: data.graduationYear,
      status: "Vacio",
      categories: categoryIds,
      owner: userCreated._id,
      createdBy: data.authorId,
   })

   // * Creates the documents for the candidate based on the categories selected
   for (const categoryId of categoryIds) {
      const templates = await Template.find({ category: categoryId }).lean();
      for (const template of templates) {
         const documentCreated = await new Document({
            name: template.name,
            description: template.description,
            category: template.category,
            comment: "",
            status: "Vacio",
            examplePath: template.examplePath,
            template: template._id,
            owner: candidateCreated._id,
            createdBy: data.authorId
         }).save();
         candidateCreated.documents.push(documentCreated._id);
      }
   }

   // * Saves the candidate
   candidateCreated.save();

   // * Sends the created candidate as the response
   res.json(candidateCreated);
}

/**
 * * Gets all existing candidates
 * @param {*} req 
 * @param {*} res 
 */
export const getCandidates = async (req, res) => {
   // * Finds all candidates and sends them to the client
   const candidates = await Candidate.find().lean();
   res.json(candidates);
}

/**
 * * Gets candidate by id
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const getCandidateById = async (req, res) => {
   // * Checks if the request parameter is a valid ObjectId
   const candidateId = req.params.candidateId;
   if (!Mongoose.Types.ObjectId.isValid(candidateId)) return res.json({ error: "Este candidato no existe" });

   // * Checks if the candidate exists
   const candidateExist = await Candidate.findById(candidateId).lean().populate("categories");
   if (!candidateExist) return res.json({ error: "Este candidato no existe" });

   // * Sends the candidate as response
   res.json(candidateExist);
}

/**
 * * Updates candidate by id
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const updateCandidateById = async (req, res) => {
   // * Checks if the request parameter is a valid ObjectId
   const candidateId = req.params.candidateId;
   if (!Mongoose.Types.ObjectId.isValid(candidateId)) return res.json({ error: "Este candidato no existe" });

   // * Gets values
   const data = req.fields;
   data.number = data.number.toLowerCase();
   const categoryIds = data.newCategories ? data.newCategories.split(',') : [];

   // * Checks if the candidate exists
   const candidateExist = await Candidate.findById(candidateId).lean();
   if (!candidateExist) return res.json({ error: "Este candidato ya no existe" });

   // * Checks if the new candidate's number isn't used already
   const candidateExistByNumber = await Candidate.findOne({ _id: { $ne: candidateId }, number: data.number }).lean();
   if (candidateExistByNumber) return res.json({ error: "Esta matricula ya esta en uso" });

   // * Updates the user based on the candidate data
   await User.findByIdAndUpdate(
      candidateId,
      {
         name: data.name,
         number: data.number,
         campus: data.campus,
         personalEmail: data.personalEmail,
         institutionalEmail: data.number + "@tecmilenio.mx",
      }
   ).lean();

   // * Creates the documents for the candidate based on the categories selected
   const documentIds = [];
   for (const categoryId of categoryIds) {
      const templates = await Template.find({ category: categoryId });
      for (const template of templates) {
         const documentCreated = await new Document({
            name: template.name,
            description: template.description,
            category: template.category,
            status: "Vacio",
            examplePath: template.examplePath,
            template: template._id,
            owner: candidateId,
            createdBy: data.authorId
         }).save();
         documentIds.push(documentCreated._id);
      }
   }

   // * Updates the existing candidate with the new values
   const candidateUpdated = await Candidate.findByIdAndUpdate(
      candidateId,
      {
         name: data.name,
         number: data.number,
         level: data.level,
         campus: data.campus,
         genre: data.genre,
         active: data.active,
         career: data.career,
         phone: data.phone,
         personalEmail: data.personalEmail,
         institutionalEmail: data.number + "@tecmilenio.mx",
         modality: data.modality,
         terminationPeriod: data.terminationPeriod,
         terminationYear: data.terminationYear,
         graduationPeriod: data.graduationPeriod,
         graduationYear: data.graduationYear,
         $push: {
            categories: { $each: categoryIds },
            documents: { $each: documentIds }
         },
         updatedBy: data.authorId,
      }, { new: true }
   ).populate("categories").lean();

   // * Sends a success response
   res.send(candidateUpdated);
}

/**
 * * Deletes candidate by id
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const deleteCandidateById = async (req, res) => {
   // * Checks if the request parameter is a valid ObjectId
   const candidateId = req.params.candidateId;
   if (!Mongoose.Types.ObjectId.isValid(candidateId)) return res.json({ error: "Este candidato no existe" });

   // * Checks if the candidate exists
   const candidateExist = await Candidate.findById(candidateId).lean();
   if (!candidateExist) return res.json({ error: "Este candidato ya no existe" });

   // * Deletes the candidate
   const candidateDeleted = await Candidate.findByIdAndDelete(candidateId).lean();

   // * Deletes the user
   await User.findOneAndDelete({ number: candidateDeleted.number }).lean();

   // * Deletes all documents from the candidate
   const documents = await Document.find({ owner: candidateId }).lean();
   if (documents) {
      await Document.deleteMany({ owner: candidateId });
      for (const document of documents) {
         if (document.filepath) {
            fs.unlinkSync(document.filepath);
         }
      }
   }

   // * Deletes all archives from the candidate
   const archives = await Archive.find({ owner: candidateId }).lean();
   if (archives) {
      await Archive.deleteMany({ owner: candidateId });
      for (const archive of archives) {
         fs.unlinkSync(archive.filepath);
      }
   }

   // * Deletes all observations from the candidate
   await Observation.deleteMany({ owner: candidateId });

   // * Sends a success response
   res.json({ success: "Se realizo la operación exitosamente" });
}



