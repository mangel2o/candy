import Candidate from "../models/Candidate";

export const createCandidate = async (req, res) => {
   console.log(req.fields);
}

export const getCandidates = async (req, res) => {
   const candidates = await Candidate.find();
   res.json(candidates);
}

export const getCandidateById = async (req, res) => {

}

export const updateCandidateById = async (req, res) => {

}

export const deleteCandidateById = async (req, res) => {

}



