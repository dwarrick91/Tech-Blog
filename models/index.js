const User = require('./User');
const Gallery = require('./Gallery');
const Blog = require('./Blog');

Gallery.hasMany(Blog, {
  foreignKey: 'gallery_id',
});

Blog.belongsTo(Gallery, {
  foreignKey: 'gallery_id',
});

module.exports = { User, Gallery, Blog };
