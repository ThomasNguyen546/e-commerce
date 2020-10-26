const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Get All Tags
router.get('/', (req, res) => {
  Tag.findAll({
    attributes: [
      'id',
      'tag_name'
    ],
    // be sure to include its associated Product data
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock'],
        through: ProductTag,
        as: 'product_tags'
      }
    ]
  })
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get Single Tag by ID
router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'tag_name'
    ],
    // be sure to include its associated Product data
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock'],
        through: ProductTag,
        as: 'product_tags'
      }
    ]
  })
    .then(dbTagData => {
      if (!dbTagData) {
        res.status(404).json({ message: 'No Tag found with this id.' });
        return;
      }
      res.json(dbTagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Create a New Tag
router.post('/', (req, res) => {
  Tag.create({
    title: req.body.title,
    tag_url: req.body.tag_url
  })
    .then(dbTagData => res.json(dbTagData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

// Update a Tag's Name by ID
router.put('/:id', (req, res) => {
  Tag.update(
    {
      title: req.body.title
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbTagData => {
      if (!dbTagData) {
        res.status(404).json({ message: 'No tag found with this id.' });
        return;
      }
      res.json(dbtagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Delete Tag by ID
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbTagData => {
      if (!dbTagData) {
        res.status(404).json({ message: 'No Tag found with this id.' });
        return;
      }
      res.json(dbTagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
