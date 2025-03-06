const LogController = require('../controllers/logController');
const { getAllLogsSchema } = require('../schemas/logSchema');

async function logRoutes(fastify) {
  const logController = new LogController(fastify);

  fastify.get('/', { schema: getAllLogsSchema }, async (req, res) =>
    logController.getAllLogs(req, res)
  );
}

module.exports = logRoutes;
