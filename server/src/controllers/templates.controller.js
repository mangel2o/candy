import Template from "../models/Template";

export const createTemplate = async (req, res) => {
   const fields = req.fields;
   const file = req.files.file;
   console.log(fields);
   console.log(file);
   res.setHeader('Content-Type', 'application/pdf');
   res.send(file);
}

export const getTemplates = async (req, res) => {

}

export const updateTemplateById = async (req, res) => {

}

export const deleteTemplateById = async (req, res) => {

}



