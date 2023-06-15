const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  // this code well allow me to merge two tables into one by using the include method
  try {
    const findAllCategories = await Category.findAll({
      include: {
        model: Product,
        attributes: ["id", "Product_name", "price", "stock", "category_id"]
      }
    });
    res.status(200).json(findAllCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const findOneCategory = await Category.findByPk(req.params.id, {
      include: {
        model: Product,
        attributes: ["id", "Product_name", "price", "stock", "category_id"]
      }
    });
    res.status(200).json(findOneCategory);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const createCategory = await Category.create(req.body);
    res.status(200).json(createCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const updateCategory = await Category.update(
    {

      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      }
    }
  );
  res.json(updateCategory);
});

router.delete('/:id', async (req, res) => {

  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      }
    });
    if (!deleteCategory) {
      res.status(500).json({ message: 'No delete with this id' });
    }
    req.status(200).json(deleteCategory);
  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;
