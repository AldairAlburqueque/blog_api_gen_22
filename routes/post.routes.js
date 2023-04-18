const express = require('express');

//controllers
const postController = require('../controllers/post.controller');

//middlewares
const authMiddleware = require('../middlewares/auth.middleware');
const validationsMiddleware = require('../middlewares/validations.middleware');
const userMiddleware = require('./../middlewares/user.middleware');
const postMiddleware = require('./../middlewares/post.middleware');

const router = express.Router();

router.use(authMiddleware.protect);

router
  .route('/')
  .get(postController.findAllPost)
  .post(validationsMiddleware.createPostValidation, postController.createPost);

router.get('/me', postController.findMyPosts);

router.get(
  '/profile/:id',
  userMiddleware.validIfExistUser,
  postController.findUserPost
);

router
  .use('/:id', postMiddleware.validIfExistPost)
  .route('/:id')
  .get(postController.findOnePost)
  .patch(
    validationsMiddleware.createPostValidation,
    authMiddleware.protectAccountOwner,
    postController.updatePost
  )
  .delete(authMiddleware.protectAccountOwner, postController.deletePost);

module.exports = router;