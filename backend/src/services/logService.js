const LogRepository = require('../repositories/logRepository');

class LogService {
  constructor(fastify) {
    this.logRepository = new LogRepository(fastify);
  }

  async getAllLogs(requestQuery) {
    const { limit, page } = requestQuery;
    const limitInt = parseInt(limit);
    const pageInt = parseInt(page);

    return this.logRepository.getAllLogs({
      limitInt,
      pageInt
    });
  }
}

module.exports = LogService;
