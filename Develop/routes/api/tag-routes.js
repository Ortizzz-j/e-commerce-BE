const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({ include: [Product] });
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json(error.message);
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findOne({ where: { id: req.params.id }, include: [Product] });
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json(error.message);
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try {
    const nTag = await Tag.create(req.body);
    res.status(200).json(nTag);
  } catch (error) {
    res.status(500).json(error.message);
  }
  // create a new tag
});

router.put('/:id', async (req, res) => {
  try {
    const tagUpdate = Tag.update(
      {tag_name: req.body.tag_name},
      {where: {id: req.params.id}}
    );
    res.status(200).json(tagUpdate);
  } catch (error) {
    res.status(500).json(error.message);
  }
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const delTag = await Tag.destroy({where: {id: req.params.id}});
    res.status(200).json(delTag);
    if(!delTag){
      res.status(400).json({message: 'No tag with this id has been found'});
      return;
    }
  } catch (error) {
    res.status(500).json(error.message)
  }
  // delete on tag by its `id` value
});

module.exports = router;
