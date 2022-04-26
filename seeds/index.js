const sequelize = require('../config/connection');
// const seedGallery = require('./galleryData');
const {User} = require('../models')
const userData = require('./userData.json');
const seedBlog = require('./blogData');


const seedAll = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await seedBlog();

  process.exit(0);
};

seedAll();
