const express = require('express');
const router = express.Router();
const Users = require('./userDb');

// STUB Complete
router.post('/', validateUser, (req, res) => {
  Users.insert(req.body)
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((error) => {
      res.status(500).json({ errorMessage: 'Failed to add the user.' });
    });
});

router.post('/:id/posts', validatePost, (req, res) => {});

// STUB Complete
router.get('/', (req, res) => {
  Users.get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(500).json({ errorMessage: 'Failed to retrieve users.' });
    });
});

// STUB Complete
router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

// STUB Complete
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

// STUB Complete
// REVIEW - Needs reviewed
router.delete('/:id', validateUserId, (req, res) => {
  Users.remove(req.user.id)
    .then(() => {
      res.status(200).json(req.user);
    })
    .catch((err) => {
      res.status(500).json({ errorMessage: 'Error deleting the user.' });
    });
});

// STUB Complete
// REVIEW - Needs reviewed
router.put('/:id', validateUserId, (req, res) => {
  // const id = req.params.id;
  Users.update(req.user.id, req.body).then(() => {
    res.status(200).json(req.body);
  });
});

//SECTION Custom Middleware

// STUB Complete
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

// STUB Complete
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
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ errorMessage: 'Missing post data' });
  } else if (req.body.text === '') {
    res.status(400).json({ errorMessage: 'Missing required text field' });
  } else {
    next();
  }
}

module.exports = router;
