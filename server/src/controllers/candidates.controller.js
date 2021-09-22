import Candidate from "../models/Candidate";
import Template from "../models/Template";
import Document from "../models/Document";
import User from "../models/User";

export const createCandidate = async (req, res) => {
   const data = req.fields;
   const categoryNames = data.categories.split(',');

   const userExists = await User.findOne({ number: data.number });
   if (userExists) return res.json({ warning: "Esta matricula ya ha sido registrada" });

   const candidateExists = await Candidate.findOne({ number: data.number });
   if (candidateExists) return res.json({ warning: "Este candidato ya existe" });

   const userCreated = await new User({
      name: data.name,
      number: data.number,
      campus: data.campus,
      email: "al" + data.number + "@tecmilenio.mx",
      password: await User.encryptPassword("password"),
      role: "user"
   }).save();

   //TODO: Implement a way of sending emails to candidates

   const candidateCreated = await new Candidate({
      name: data.name,
      number: data.number,
      level: data.level,
      campus: data.campus,
      genre: data.genre,
      active: data.active,
      career: data.career,
      phone: data.phone,
      email: data.email,
      modality: data.modality,
      terminationPeriod: data.terminationPeriod,
      terminationYear: data.terminationYear,
      graduationPeriod: data.graduationPeriod,
      graduationYear: data.graduationYear,
      status: "Vacio",
      categories: categoryNames,
      owner: userCreated._id,
      createdBy: data.authorId,
   })

   candidateCreated.categories.forEach(async (categoryName) => {
      const templates = await Template.find({ category: categoryName });
      templates.forEach(async (template) => {
         const document = await new Document({
            name: template.name,
            description: template.description,
            category: template.category,
            status: "Vacio",
            examplePath: template.examplePath,
            owner: candidateCreated._id,
            createdBy: data.authorId
         }).save();

         candidateCreated.documents.push(document._id);
      });
   });

   candidateCreated.save();
   res.json(candidateCreated);
}


export const getCandidates = async (req, res) => {
   const candidates = await Candidate.find();
   res.json(candidates);
}

export const getCandidateById = async (req, res) => {
   const candidateNumber = req.params.candidateId;

   const candidateFound = await Candidate.findOne({ number: candidateNumber });
   if (!candidateFound) return res.json({ warning: "Este candidato no existe" });

   res.json(candidateFound);
}

export const updateCandidateById = async (req, res) => {
   const candidateNumber = req.params.candidateId;
   const data = req.fields;
   const categoryNames = data.categories.split(',');

   const candidateFound = await Candidate.findOne({ number: candidateNumber });
   if (!candidateFound) return res.json({ warning: "Este candidato no existe" });

}

export const deleteCandidateById = async (req, res) => {
   const candidateNumber = req.params.candidateId;

   const candidateFound = await Candidate.findOne({ number: candidateNumber });
   if (!candidateFound) return res.json({ warning: "Este candidato no existe" });

}



