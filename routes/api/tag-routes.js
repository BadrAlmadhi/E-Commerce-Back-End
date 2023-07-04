const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const getAllTags = await Tag.findAll({
      include: Product,
      // attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      // we only use that to select specific items
    });
    res.status(200).json(getAllTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const getOneTag = await Tag.findByPk(req.params.id, {
      include: Product,
      //attributes: ['id', 'product_name']
    })
    res.status(200).json(getOneTag);
  } catch (err) {
    res.status(500).json(err);
  }

});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const createTag = await Tag.create(req.body);
    res.status(200).json(createTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const updateTag = await Tag.update(
    {
      tag_name: req.body.tag_name,
      // use body without the URl
    },
    {
      where: {
        id: req.params.id,
      }
    }
  )
  res.json(updateTag);
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id,
      }
    });
    if (!deleteTag) {
      res.status(500).json({ message: 'No tag delete with this id' })
      return;
    }
    res.status(200).json(deleteTag);
  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;
