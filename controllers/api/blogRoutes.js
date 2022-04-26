const router = require('express').Router();
const { Blog } = require('../../models');
// Import the custom middleware
const withAuth = require('../../utils/auth');

// create blog and render on dashboard
router.post('/', 
withAuth, 
async (req, res) => {
    console.log("Blog Post");
    try {
      const blogData = await Blog.create({
        title: req.body.title,
        description: req.body.description,
        
      });
      res.render('dashboard', {
        blogData,
        loggedIn: req.session.loggedIn,
      });
      res.status(200).json(blogData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  router.put('/:id', async (req, res) => {
   
    try {
      const blog = await Blog.update(
        {
          title: req.body.title,
          description: req.body.description,
          username: req.body.username,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      
      res.status(200).json(blog);
    } catch (err) {
      res.status(500).json(err);
    }
  });






module.exports = router;
