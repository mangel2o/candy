import Observation from "../models/Observation.js";
import Mongoose from "mongoose";
import Candidate from "../models/Candidate.js";

export const createObservation = async (req, res) => {
   // * Initializes values
   const candidateId = req.params.candidateId;
   const { name, comment, authorId } = req.fields;

   // * Checks if the candidate exists
   const candidateExist = await Candidate.findById(candidateId).lean();
   if (!candidateExist) return res.json({ warning: "Este candidato ya no existe" });

   // * Creates a new archive
   const newId = new Mongoose.Types.ObjectId();
   const observationCreated = await new Observation({
      _id: newId,
      name: name,
      comment: comment,
      owner: candidateId,
      createdBy: authorId,
   }).save();

   // * Adds the new template id to the category
   await Candidate.findByIdAndUpdate(candidateExist, { $push: { observations: observationCreated._id } }).lean();

   // * Sends the created template as response
   res.json(observationCreated);
}

export const getObservations = async (req, res) => {
   // * Gets the parameters
   const candidateId = req.params.candidateId;

   // * Finds all observations from the respective candidate
   const observationsFound = await Observation.find({ owner: candidateId }).lean();

   // * Sends the observations as response
   res.json(observationsFound);
}

export const updateObservationById = async (req, res) => {
   // * Initializes values
   const candidateId = req.params.candidateId;
   const observationId = req.params.observationId;
   const { name, comment, authorId } = req.fields;

   // * Checks if the category exists
   const candidateExist = await Candidate.findById(candidateId).lean();
   if (!candidateExist) return res.json({ error: "Este candidato ya no existe" });

   // * Check if the template exists, if not then delete the temporal file
   const observationExist = await Observation.findById(observationId).lean();
   if (!observationExist) return res.json({ error: "Esta observación ya no existe" });


   // * Updates the template with new values
   const observationUpdated = await Observation.findByIdAndUpdate(
      observationId,
      {
         name: name,
         comment: comment,
         updatedBy: authorId
      },
      { new: true }
   ).lean();

   // * Sends a success response
   res.json({ success: "Se realizo la operación exitosamente" });
}

export const deleteObservationById = async (req, res) => {
   // * Gets the parameters
   const candidateId = req.params.candidateId;
   const observationId = req.params.observationId;

   // * Checks if the category exists
   const candidateExist = await Candidate.findById(candidateId).lean();
   if (!candidateExist) return res.json({ error: "Este candidato ya no existe" });

   // * Checks if the template exists
   const observationExist = await Observation.findById(observationId).lean();
   if (!observationExist) return res.json({ error: "Esta observación ya no existe" });

   // * Deletes the archive
   const observationDeleted = await Observation.findByIdAndDelete(observationId).lean();

   // * Removes the template id from the corresponding category
   await Candidate.findByIdAndUpdate(candidateId, { $pull: { observations: observationId } }).lean();

   // * Sends a success response
   res.json({ success: "Se realizo la operación exitosamente" });
}



