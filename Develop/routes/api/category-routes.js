const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [Product]
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findOne({ where: {id: req.params.id}, include: [Product] });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const nCategory = await Category.create(req.body);
    res.status(200).json(nCategory)
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.put('/:id', async (req, res) => {
  try { 
  const categoryUpdate = await Category.update(
    {category_name: req.body.category_name},
    {where: {id: req.params.id}}
  );
  res.status(200).json(categoryUpdate);
  } catch (error) {
    res.status(500).json(error.message)
  }
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const category = await Category.destroy({ where: {id: req.params.id}});
    res.status(200).json(category);
    if (!category){
      res.status(404).json({ message: 'No category with this id has been found!'});
      return;
    }
    } catch (error) {
    res.status(500).json(error.message)
  }
});

module.exports = router;
