import Observation from "../models/Observation.js";
import Mongoose from "mongoose";
import Student from "../models/Student.js";
import createAction from "../libs/actionCreator.js";

export const createObservation = async (req, res) => {
   // * Initializes values
   const studentId = req.params.studentId;
   const { name, comment, authorId } = req.fields;

   // * Checks if the student exists
   const studentExist = await Student.findById(studentId).lean();
   if (!studentExist) return res.status(500).json("Este candidato ya no existe");

   // * Creates a new observation
   const newId = new Mongoose.Types.ObjectId();
   const observationCreated = await new Observation({
      _id: newId,
      name: name,
      comment: comment,
      owner: studentId,
      createdBy: authorId,
   }).save().then(observation => observation.populate("createdBy"));

   // * Adds the new observation id to the student
   await Student.findByIdAndUpdate(studentId, { $push: { observations: observationCreated._id } }).lean();

   // * Creates an action
   createAction("observation", "create", "Creación de observación", JSON.stringify(observationCreated), authorId, { affectedStudent: studentId })

   // * Sends the created observation as response
   res.json(observationCreated);
}

export const getObservations = async (req, res) => {
   // * Gets the parameters
   const studentId = req.params.studentId;
   if (!Mongoose.Types.ObjectId.isValid(studentId)) return res.status(500).json("Este alumno no existe");

   // * Finds all observations from the respective student
   const observationsFound = await Observation.find({ owner: studentId }).populate(["createdBy", "updatedBy"]).lean();

   // * Sends the observations as response
   res.json(observationsFound);
}

export const updateObservationById = async (req, res) => {
   // * Initializes values
   const studentId = req.params.studentId;
   const observationId = req.params.observationId;
   const { name, comment, authorId } = req.fields;

   // * Checks if the student exists
   const studentExist = await Student.findById(studentId).lean();
   if (!studentExist) return res.status(500).json("Este candidato ya no existe");

   // * Check if the observation exists
   const observationExist = await Observation.findById(observationId).lean();
   if (!observationExist) return res.status(500).json("Esta observación ya no existe");

   // * Updates the observation with new values
   const observationUpdated = await Observation.findByIdAndUpdate(
      observationId,
      {
         name: name,
         comment: comment,
         updatedBy: authorId
      },
      { new: true }
   ).populate(["createdBy", "updatedBy"]).lean();

   // * Creates an action
   createAction("observation", "update", "Actualización de observación", JSON.stringify(observationUpdated), authorId, { affectedStudent: studentId })

   // * Sends a success response
   res.json(observationUpdated);
}

export const deleteObservationById = async (req, res) => {
   // * Gets the parameters
   const studentId = req.params.studentId;
   const observationId = req.params.observationId;
   const { authorId } = req.fields;

   // * Checks if the student exists
   const studentExist = await Student.findById(studentId).lean();
   if (!studentExist) return res.status(500).json("Este candidato ya no existe");

   // * Checks if the observation exists
   const observationExist = await Observation.findById(observationId).lean();
   if (!observationExist) return res.status(500).json("Esta observación ya no existe");

   // * Deletes the archive
   const observationDeleted = await Observation.findByIdAndDelete(observationId).lean();

   // * Removes the observation id from the corresponding student
   await Student.findByIdAndUpdate(studentId, { $pull: { observations: observationId } }).lean();

   // * Creates an action
   createAction("observation", "delete", "Eliminación de observación", JSON.stringify(observationDeleted), authorId, { affectedStudent: studentId })

   // * Sends a success response
   res.json(observationDeleted);
}



