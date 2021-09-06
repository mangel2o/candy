import Category from "../models/Category";

export const createCategory = async (req, res) => {
   const { name, description } = req.fields;
   console.log(req.fields);

   console.log(name, description);
   res.json("something")
}

export const getCategories = async (req, res) => {

}

export const getCategoryById = async (req, res) => {

}

export const updateCategoryById = async (req, res) => {

}

export const deleteCategoryById = async (req, res) => {

}



