const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog Api',
      version: '1.0.0',
    },
  },
  apis: [
    './routes/auth.routes.js',
    './../models/user.model.js',
    './routes/post.routes.js',
    './models/post.model.js',
  ],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
  app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/api/v1/docs.json', (req, res) => {
    res.setHeader('Content-type', 'aplication/json');
    res.send(swaggerSpec);
  });

  console.log(`Docs are available at http://localhost:${port}/api/v1/docs`);
};

module.exports = swaggerDocs;
