const express = require('express');
const router = express.Router();
const Users = require('./userDb');

// SECTION Complete
router.post('/', validateUser, (req, res) => {
  Users.insert(req.body)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      res.status(500).json({ errorMessage: 'Failed to add the user.' });
    });
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

// SECTION Complete
router.get('/', (req, res) => {
  Users.get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(500).json({ errorMessage: 'Failed to retrieve users.' });
    });
});

// SECTION Complete
router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

// SECTION Complete
router.get('/:id/posts', validateUserId, (req, res) => {
  Users.getUserPosts(req.user.id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ errorMessage: "Failed to retrieve desired user's posts" });
    });
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware
// SECTION Complete
function validateUserId(req, res, next) {
  const id = req.params.id;
  Users.getById(id)
    .then((user) => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: 'Enter a valid user ID.' });
      }
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: 'Failed to retrieve users.' });
    });
}

// SECTION Complete
function validateUser(req, res, next) {
  console.log(req.body);
  /*
    Option 2) 
    if(res.body.name === undefined) 
 */
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ error: 'Missing post data.' });
  } else if (req.body.name === '') {
    res.status(400).json({ error: 'Missing required text field.' });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
