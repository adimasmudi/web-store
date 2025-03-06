const LogService = require('../services/logService');
const { errorResponse, successResponse } = require('../utils/response');
const { successCode, internalServerErrorCode } = require('../utils/constants');

class LogController {
  constructor(fastify) {
    this.logService = new LogService(fastify);
  }

  async getAllLogs(req, res) {
    try {
      const logs = await this.logService.getAllLogs(req.query);
      return res
        .code(successCode)
        .send(successResponse(logs, 'Logs retrieved successfully'));
    } catch (error) {
      return res
        .code(internalServerErrorCode)
        .send(errorResponse(error.message));
    }
  }
}

module.exports = LogController;
