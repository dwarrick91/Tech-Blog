const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');

router.get('/new', 
withAuth, 
async (req, res) => {
  try {
    res.render('addBlog', {
      loggedIn: req.session.loggedIn
    })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET all blogs for homepage
router.get('/', async (req, res) => {
  try {
    const dbBlogData = await Blog.findAll({
          attributes: ['id','title', 'description'],      
      
    });

    const blogs = dbBlogData.map((blog) =>
      blog.get({ plain: true })
    );
    const fourBlogs = blogs.splice(0,4)
    res.render('homepage', {
      fourBlogs,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// GET one gallery
// Use the custom middleware before allowing the user to access the gallery

// GET one Blog
// Use the custom middleware before allowing the user to access the Blog
router.get('/blog/:id', withAuth, async (req, res) => {
  try {
    const dbBlogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {model: Comment,
          include: {
            model: User,
            attributes: ['username']
          }
        
      }

      ],
    });

    const blog = dbBlogData.get({ plain: true});
console.log(blog);
    res.render('blog', { blog, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// get all Blogs
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const dbBlogData = await Blog.findAll({
         
          include: [
            {
              model: User,
              attributes: ['username']
            }
          ]

        
      
    });
    console.log(dbBlogData, "THIS IS BLOG DATA");
    const blogs = dbBlogData.map((blog) =>
      blog.get({ plain: true })
      
    );
console.log(req.session.loggedIn);
    res.render('dashboard', {
      blogs,
    
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
