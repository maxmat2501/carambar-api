const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Carambar & co API',
      version: '1.0.0',
      description: 'API pour gérer les blagues Carambar',
    },
    servers: [
      {
        url: 'https://carambar-api-0cqu.onrender.com/api/v1',
      },
    ],
  },
  apis: ['./routes/*.js'], // fichiers où Swagger va chercher les annotations
};

const specs = swaggerJsdoc(options);

function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}

module.exports = setupSwagger;

