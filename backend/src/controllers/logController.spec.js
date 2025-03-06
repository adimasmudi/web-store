const LogController = require('./logController');

describe('LogController', function () {
  let logController,
    services,
    successResponse,
    errorResponse,
    log,
    paginatedLogs;

  const sandbox = sinon.createSandbox();

  beforeEach(function () {
    services = {
      logService: {
        getAllLogs: sinon.stub()
      }
    };
    logController = new LogController(services);

    req = {
      params: {},
      query: {},
      body: {}
    };

    res = {
      code: sandbox.stub().returnsThis(),
      send: sandbox.stub()
    };
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
    successResponse = {
      status: 'success',
      statusCode: 200,
      message: 'success',
      data: paginatedLogs
    };
    errorResponse = {
      status: 'error',
      statusCode: 500,
      message: 'error'
    };
  });

  afterEach(function () {
    sinon.restore();
    sandbox.restore();
  });

  describe('getAllLogs', function () {
    it('should return success response with logs data', async function () {
      services.logService.getAllLogs.resolves(paginatedLogs);
      successResponse.message = 'Logs retrieved successfully';
      res.send = sinon.stub().resolves({ ...successResponse });

      const result = await logController.getAllLogs(req, res);

      expect(result).to.deep.equal(successResponse);
    });

    it('should return error response', async function () {
      const errorMessage = 'limit should be integer';
      services.logService.getAllLogs.rejects(errorMessage);
      errorResponse.message = errorMessage;
      errorResponse.statusCode = 400;
      res.send = sinon.stub().resolves({ ...errorResponse });
      req.query.limit = 'abc';

      const result = await logController.getAllLogs(req, res);

      expect(result).to.deep.equal(errorResponse);
    });
  });
});
