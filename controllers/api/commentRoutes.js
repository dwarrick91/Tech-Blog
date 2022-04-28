const router = require('express').Router();
const { Comment, Blog } = require('../../models');
// Import the custom middleware
const withAuth = require('../../utils/auth');

// create blog and render on dashboard
router.post('/', 
withAuth, 
async (req, res) => {
    console.log("Comment Post", req.body);
    try {
      const commentData = await Comment.create({
        description: req.body.description,
        user_id: req.session.userId, 
        blog_id:  req.body.blog_id
          
        
      
      });
     
      res.status(200).json(commentData);
      console.log(commentData);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  });

module.exports = router;
