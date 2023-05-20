const express = require('express');

//middlewares
const validations = require('./../middlewares/validations.middleware');
const authMiddleware = require('./../middlewares/auth.middleware');
const { upload } = require('../utils/multer');

//controllers
const authController = require('../controllers/auth.controller');

const router = express.Router();

/**
 * @swagger
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *  schemas:
 *    Auth:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: user name
 *        email:
 *          type: string
 *          description: user email
 *        description:
 *          type: string
 *          description: user description
 *        password:
 *          type: string
 *          description: user password
 *        role:
 *          type: string
 *          description: user role, could be user or admin
 *        status:
 *          type: string
 *          description: user status
 *      required:
 *        - name
 *        - email
 *        - description
 *        - password
 *      example:
 *        name: luis
 *        email: luis@mail.com
 *        description: programmer
 *        password: root123
 */

/**
 * @swagger
 * /api/v1/auth/signup:
 *  post:
 *    summary: register user
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: user name
 *              email:
 *                type: string
 *                description: user email
 *              description:
 *                type: string
 *                description: user description
 *              password:
 *                type: string
 *                description: user password
 *              profileImgUrl:
 *                type: string
 *                format: binary
 *                description: Profile img url
 *                example: ''
 *            required:
 *              - name
 *              - email
 *              - description
 *              - password
 *              - profileImgUrl
 *    responses:
 *      201:
 *        description: new user created
 */

router.post(
  '/signup',
  upload.single('profileImgUrl'),
  validations.createUserValidation,
  authController.signup
);

router.post('/login', validations.loginUserValidation, authController.login);

router.use(authMiddleware.protect);

router.get('/renew', authController.renew);

module.exports = router;
