const router = require('express').Router();
const Info=require('../models/Info');
const Category=require('../models/Category');


//Here I am making Endpoint for creating info with random names
router.post('/createInfo', async (req, res) => {
    try {
      const info = new Info({ name: generateRandomString(10) });
      await info.save();
      res.json(info);
    } catch (error) {
      console.error('Error creating info:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
// Here I am making Endpoint for creating a category
router.post('/createCategory', async (req, res) => {
    try {
      const { name, infoList } = req.body;
  
      // Here Checking if the category with the given name already exists
      const existingCategory = await Category.findOne({ name });
  
      if (existingCategory) {
        // If the category exists, updating it by adding info items that are not already in the infoList
        const newInfoList = infoList.filter(infoId => !existingCategory.infoList.includes(infoId));
        existingCategory.infoList = [...existingCategory.infoList, ...newInfoList];
       
  
        
        await existingCategory.save();
  
        // Updating the info items with the category ID
        await Info.updateMany({ _id: { $in: newInfoList } }, { $set: { category: existingCategory._id } });
  
        res.json(existingCategory);
      } else {
        // If the category does not exist, creating a new category
        const category = new Category({ name, infoList });
        await category.save();
  
        // Updating the info items with the category ID
        await Info.updateMany({ _id: { $in: infoList } }, { $set: { category: category._id } });
  
        res.json(category);
      }
    } catch (error) {
      console.error('Error creating/updating category:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
  // Fetching all Infolist
  router.get('/getInfoList', async (req, res) => {
      try {
        const infoList = await Info.find();
        res.json(infoList);
      } catch (error) {
        console.error('Error fetching info list:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });
router.get('/getCategories', async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
  router.get('/searchInfoByCategory/:categoryName', async (req, res) => {
      try {
        const categoryName = req.params.categoryName;

    
        // Using $regex with $options directly in the query to perform a case-insensitive search
        const category = await Category.findOne({ name: { $regex: categoryName, $options: 'i' } })
          .populate('infoList', 'name');
    
        res.json(category.infoList);
      } catch (error) {
        // Sending an error response to the client for best debug
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });
     
  
  // Writing Function to generate a random string of given length
  function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
  module.exports=router;