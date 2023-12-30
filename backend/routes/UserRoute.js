const router = require('express').Router();
const Info=require('../models/Info');
const Category=require('../models/Category');


// Endpoint to create info with random names
router.post('/createInfo', async (req, res) => {
    const info = new Info({ name: generateRandomString(10) });
    await info.save();
    res.json(info);
  });
  
  // Endpoint to create a category
  router.post('/createCategory', async (req, res) => {
    const { name, infoList } = req.body;
    const category = new Category({ name, infoList });
    await category.save();
    await Info.updateMany({ _id: { $in: infoList } }, { $set: { category: category._id } });
    res.json(category);
  });
  
  // Endpoit to get all Infolist
  router.get('/getInfoList', async (req, res) => {
      try {
        const infoList = await Info.find();
        res.json(infoList);
      } catch (error) {
        console.error('Error fetching info list:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });
  // Endpoint to get all categories
  router.get('/getCategories', async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
  });
  
  router.get('/searchInfoByCategory/:categoryName', async (req, res) => {
      try {
        const categoryName = req.params.categoryName;

    
        // Use $regex with $options directly in the query to perform a case-insensitive search
        const category = await Category.findOne({ name: { $regex: categoryName, $options: 'i' } })
          .populate('infoList', 'name');
    
        res.json(category.infoList);
      } catch (error) {
        // Send an error response to the client
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });
     
  
  // Function to generate a random string of given length
  function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
  module.exports=router;