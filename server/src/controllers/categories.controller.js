import Category from "../models/Category";
import User from "../models/User";

export const createCategory = async (req, res) => {
   const { name, description, authorId } = req.fields;

   const trimmedName = name.toLowerCase().replace(/\s/g, "-");
   const categoryFound = await Category.findOne({ name: trimmedName });

   if (categoryFound) return res.json({ warningCategory: "Esta categoria ya existe" });

   const newCategory = await new Category({
      name: trimmedName,
      description: description,
      createdBy: authorId
   }).save();

   console.log(newCategory);
   res.json(newCategory)
}

export const getCategories = async (req, res) => {
   const categories = await Category.find();
   res.json(categories);
}

export const getCategoryById = async (req, res) => {
   const categoryName = req.params.categoryName;
   const categoryFound = await Category.findOne({ name: categoryName });

   if (!categoryFound) return res.json({ warningCategory: "Esta categoria no existe" });

   res.json(categoryFound);
}

export const updateCategoryById = async (req, res) => {
   const categoryName = req.params.categoryName;
   const { name, description, authorId } = req.fields;
   const trimmedName = name.toLowerCase().replace(/\s/g, "-");

   const categoryExists = await Category.findOne({ name: trimmedName });

   if (categoryExists) return res.json({ warningCategory: "Esta categoria ya existe" });

   const updatedCategory = await Category.findOneAndUpdate(
      { name: categoryName },
      {
         name: trimmedName,
         description: description,
         updatedBy: authorId
      },
      {
         new: true
      }
   )
   res.json(updatedCategory);
}

export const deleteCategoryById = async (req, res) => {
   const categoryName = req.params.categoryName;
   const categoryExists = await Category.findOne({ name: categoryName });

   if (!categoryExists) return res.json({ warningCategory: "Esta categoria ya no existe" });

   const deletedCategory = await Category.findOneAndDelete({ name: categoryName });
   res.json(deletedCategory);
}



