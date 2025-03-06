class LogService {
  constructor(repositories) {
    this.logRepository = repositories.logRepository;
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
