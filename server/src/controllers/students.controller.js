import Mongoose from "mongoose";
import Student from "../models/Student.js";
import Template from "../models/Template.js";
import Document from "../models/Document.js";
import Observation from "../models/Observation.js";
import User from "../models/User.js";
import Archive from "../models/Archive.js";
import fs from "fs";
import createAction from "../libs/actionCreator.js";


export const createStudent = async (req, res) => {
   // * Gets values
   const data = req.fields;
   const categoryIds = data.categories ? data.categories.split(',') : null;

   // * Checks if the student already exists
   const studentExist = await Student.findOne({ number: data.number }).lean();
   if (studentExist) return res.status(500).json("Esta matricula ya esta en uso");

   // TODO: Create a random generated password

   // * Creates a new user
   const userCreated = await new User({
      name: data.name,
      number: data.number,
      campus: data.campus,
      genre: data.genre,
      active: data.active,
      phone: data.phone,
      personalEmail: data.personalEmail,
      institutionalEmail: `al${data.number}@tecmilenio.mx`,
      password: await User.encryptPassword("password"),
      role: "Usuario"
   }).save();

   // TODO: Implement a way of sending emails to newly created users/students

   // * Creates a new student
   const studentCreated = await new Student({
      name: data.name,
      number: data.number,
      level: data.level,
      campus: data.campus,
      genre: data.genre,
      active: data.active,
      career: data.career,
      phone: data.phone,
      personalEmail: data.personalEmail,
      institutionalEmail: `al${data.number}@tecmilenio.mx`,
      modality: data.modality,
      terminationPeriod: data.terminationPeriod,
      terminationYear: data.terminationYear,
      graduationPeriod: data.graduationPeriod,
      graduationYear: data.graduationYear,
      status: "Vacio",
      owner: userCreated._id,
      createdBy: data.authorId,
   })

   if (categoryIds) {
      studentCreated.categories = categoryIds;

      // * Creates the documents for the student based on the categories selected
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
               owner: studentCreated._id,
               createdBy: data.authorId
            }).save();
            studentCreated.documents.push(documentCreated._id);
         }
      }
   }

   // * Saves the student
   studentCreated.save();

   // * Creates an action
   createAction("student", "create", "Creación de estudiante", JSON.stringify(studentCreated), data.authorId, { affectedStudent: studentCreated._id })

   // * Sends the created student as the response
   res.json(studentCreated);
}


export const getStudents = async (req, res) => {
   // * Finds all students and sends them to the client
   const studentsFound = await Student.find().lean();
   res.json(studentsFound);
}


export const getStudentById = async (req, res) => {
   // * Checks if the request parameter is a valid ObjectId
   const studentId = req.params.studentId;
   if (!Mongoose.Types.ObjectId.isValid(studentId)) return res.status(500).json("Este alumno no existe");

   // * Checks if the student exists
   const studentExist = await Student.findById(studentId).lean().populate("categories");
   if (!studentExist) return res.status(500).json("Este alumno no existe");

   // * Sends the student as response
   res.json(studentExist);
}


export const updateStudentById = async (req, res) => {
   // * Checks if the request parameter is a valid ObjectId
   const studentId = req.params.studentId;
   if (!Mongoose.Types.ObjectId.isValid(studentId)) return res.status(500).json("Este alumno no existe");

   // * Gets values
   const data = req.fields;
   const categoryIds = data.newCategories ? data.newCategories.split(',') : [];

   // * Checks if the student exists
   const studentExist = await Student.findById(studentId).lean();
   if (!studentExist) return res.status(500).json("Este alumno ya no existe");

   // * Checks if the new student's number isn't used already
   const studentExistByNumber = await Student.findOne({ _id: { $ne: studentId }, number: data.number }).lean();
   if (studentExistByNumber) return res.status(500).json("Esta matricula ya esta en uso");

   // * Updates the user based on the student data
   await User.findByIdAndUpdate(
      studentId,
      {
         name: data.name,
         number: data.number,
         campus: data.campus,
         personalEmail: data.personalEmail,
         institutionalEmail: `al${data.number}@tecmilenio.mx`,
      }
   ).lean();

   // * Creates the documents for the student based on the categories selected
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
            owner: studentId,
            createdBy: data.authorId
         }).save();
         documentIds.push(documentCreated._id);
      }
   }

   // * Updates the existing student with the new values
   const studentUpdated = await Student.findByIdAndUpdate(
      studentId,
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
         institutionalEmail: `al${data.number}@tecmilenio.mx`,
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

   // * Creates an action
   createAction("student", "update", "Actualización de estudiante", JSON.stringify(studentUpdated), data.authorId, { affectedStudent: studentId })

   // * Sends a success response
   res.send(studentUpdated);
}


export const deleteStudentById = async (req, res) => {
   // * Checks if the request parameter is a valid ObjectId
   const studentId = req.params.studentId;
   if (!Mongoose.Types.ObjectId.isValid(studentId)) return res.status(500).json("Este candidato no existe");
   const { authorId } = req.fields;

   // * Checks if the student exists
   const studentExist = await Student.findById(studentId).lean();
   if (!studentExist) return res.status(500).json("Este candidato ya no existe");

   // * Deletes the student
   const studentDeleted = await Student.findByIdAndDelete(studentId).lean();

   // * Deletes the user
   await User.findOneAndDelete({ number: studentDeleted.number }).lean();

   // * Deletes all documents from the student
   const documents = await Document.find({ owner: studentId }).lean();
   if (documents) {
      await Document.deleteMany({ owner: studentId });
      for (const document of documents) {
         if (document.filepath) {
            fs.unlinkSync(document.filepath);
         }
      }
   }

   // * Deletes all archives from the student
   const archives = await Archive.find({ owner: studentId }).lean();
   if (archives) {
      await Archive.deleteMany({ owner: studentId });
      for (const archive of archives) {
         fs.unlinkSync(archive.filepath);
      }
   }

   // * Deletes all observations from the student
   await Observation.deleteMany({ owner: studentId });

   // * Creates an action
   createAction("student", "delete", "Eliminación de estudiante", JSON.stringify(studentDeleted), authorId, { affectedStudent: studentId })

   // * Sends the deleted student as response
   res.json(studentDeleted);
}


export const createStudentsWithExcel = async (req, res) => {
   // TODO: USE xlsx OR ExcelJS to create students with an excel
}


export const getExcel = async (req, res) => {
   // TODO: Create an excel with the existing categories
}