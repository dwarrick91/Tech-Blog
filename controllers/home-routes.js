const router = require('express').Router();
const { Blog } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');

// GET all galleries for homepage
router.get('/', async (req, res) => {
  try {
    const dbBlogData = await Blog.findAll({
          attributes: ['title', 'description'],
        
      
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
router.get('/gallery/:id', withAuth, async (req, res) => {
  try {
    const dbGalleryData = await Gallery.findByPk(req.params.id, {
      include: [
        {
          model: Blog,
          attributes: [
            'id',
            'title',
            // 'artist',
            // 'exhibition_date',
            // 'filename',
            'description',
          ],
        },
      ],
    });

    const gallery = dbGalleryData.get({ plain: true });
    res.render('gallery', { gallery, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one Blog
// Use the custom middleware before allowing the user to access the Blog
router.get('/blog/:id', withAuth, async (req, res) => {
  try {
    const dbBlogData = await Blog.findByPk(req.params.id);

    const blog = dbBlogData.get({ plain: true});

    res.render('blog', { blog, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// get all Blogs
router.get('/dashboard', async (req, res) => {
  try {
    const dbBlogData = await Blog.findAll({
          attributes: ['title', 'description']
        
      
    });
    console.log(dbBlogData, "THIS IS BLOG DATA");
    const blogs = dbBlogData.map((blog) =>
      blog.get({ plain: true })
      
    );

    res.render('dashboard', {
      blogs,
    
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
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

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
