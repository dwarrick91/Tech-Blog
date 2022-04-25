const sequelize = require('../config/connection');
const seedGallery = require('./galleryData');
const seedBlog = require('./blogData');


const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedGallery();

  await seedBlog();

  process.exit(0);
};

seedAll();
