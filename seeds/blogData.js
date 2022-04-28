const { Blog } = require('../models');

const blogdata = [
  {
    title: 'Tech Blog',
    description: 'This is a blog designed to give individuals ability to share technology information that they find interesting to them.',
    user_id: 1
  },
  {
    title: 'Sequelize',
    description: "Sequelize is a promise-based Node.js ORM tool for Postgres, MySQL, MariaDB, SQLite, Microsoft SQL Server, Amazon Redshift and Snowflake's Data Cloud. It features solid transaction support, relations, eager and lazy loading, read replication and more.",
    user_id: 2

  },
  {
    title: 'Express',
    description: 'Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.',
    user_id: 3

  },
  {
    title: 'Handlebarsjs',
    description: 'Handlebars compiles templates into JavaScript functions. This makes the template execution faster than most other template engines.',
    user_id: 3

  },
  
];

const seedBlog = () => Blog.bulkCreate(blogdata);

module.exports = seedBlog;
