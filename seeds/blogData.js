const { Blog } = require('../models');

const blogdata = [
  {
    title: 'Tech Blog',
    description: 'This is a blog designed to give individuals ability to share technology information that they find interesting to them.',
    user_id: 1
  },
  {
    title: 'Cosmos Flowers',
    description: 'Pink cosmos flowers against a blue sky.',
    user_id: 2

  },
  {
    title: 'Sand + Sea = Summer',
    description: 'Sandy beach with the blue sea and sky in the background.',
    user_id: 3

  },
  {
    title: 'Beach Chairs',
    description: 'Two beach chairs under a beach umbrella on the beach.',
    user_id: 3

  },
  
];

const seedBlog = () => Blog.bulkCreate(blogdata);

module.exports = seedBlog;
