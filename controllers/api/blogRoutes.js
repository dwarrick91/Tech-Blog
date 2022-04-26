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
        user_id: req.session.userId, 
        
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
  router.delete('/:id', withAuth, async (req, res) => {
    try {
      const blogData = await Blog.destroy({
        where: {
          id: req.params.id,
          
        },
      });
  
      if (!blogData) {
        res.status(404).json({ message: 'No blog found with this id!' });
        return;
      }
  
      res.status(200).json(blogData);
    } catch (err) {
      
      
      res.status(500).json(err);
      console.log(err);
    }
  });






module.exports = router;
