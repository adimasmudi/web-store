const { getAllLogsSchema } = require('../schemas/logSchema');

async function logRoutes(fastify, options) {
  const { logController } = options;

  fastify.get('/', { schema: getAllLogsSchema }, async (req, res) =>
    logController.getAllLogs(req, res)
  );
}

module.exports = logRoutes;
