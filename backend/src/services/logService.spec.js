const LogService = require('./logService');

describe('LogService', function () {
  let logService, repositories, fastifyMock, dbMock, log, paginatedLogs;

  beforeEach(function () {
    dbMock = {
      query: sinon.stub()
    };

    fastifyMock = {
      pg: dbMock
    };
    repositories = {
      logRepository: {
        getAllLogs: sinon.stub()
      }
    };
    logService = new LogService(repositories);

    log = {
      id: 1,
      title: 'Product 1',
      category: 'Category 1',
      message: 'Log 1',
      created_at: new Date()
    };
    paginatedLogs = {
      totalItems: 1,
      numberOfPage: 1,
      items: [log]
    };
  });

  afterEach(function () {
    sinon.restore();
  });

  describe('getAllLogs', function () {
    it('should return logs data', async function () {
      repositories.logRepository.getAllLogs.resolves(paginatedLogs);

      const result = await logService.getAllLogs({ limit: 10, page: 1 });

      expect(result).to.deep.equal(paginatedLogs);
    });
  });
});
