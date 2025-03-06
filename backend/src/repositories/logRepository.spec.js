const LogRepository = require('./logRepository');

describe('LogRepository', function () {
  let logRepository, fastifyMock, dbMock;

  beforeEach(function () {
    dbMock = {
      query: sinon.stub()
    };

    fastifyMock = {
      pg: dbMock
    };

    logRepository = new LogRepository(fastifyMock);
  });

  afterEach(function () {
    sinon.restore();
  });

  describe('getAllLogs', function () {
    it('should return paginated logs', async function () {
      const logs = [
        {
          id: 1,
          title: 'Product 1',
          category: 'Category 1',
          message: 'Log 1',
          created_at: new Date()
        }
      ];
      const count = 1;
      sinon.stub(logRepository, '_countLogs').resolves(1);
      dbMock.query
        .withArgs(sinon.match.string, sinon.match.array)
        .resolves({ rows: logs });

      const result = await logRepository.getAllLogs({
        limitInt: 10,
        pageInt: 1
      });

      expect(result.items).to.deep.equal(logs);
      expect(result.totalItems).to.equal(count);
    });

    it('should return empty array if no logs exist', async function () {
      sinon.stub(logRepository, '_countLogs').resolves(0);
      dbMock.query
        .withArgs(sinon.match.string, sinon.match.array)
        .resolves({ rows: [] });

      const result = await logRepository.getAllLogs({
        limitInt: 10,
        pageInt: 1
      });

      expect(result.items).to.deep.equal([]);
      expect(result.totalItems).to.deep.equal(0);
    });
  });

  describe('addLog', function () {
    it('should insert a log entry successfully', async function () {
      dbMock.query.resolves({ error: null });

      const result = await logRepository.addLog(1, 'Test log message');

      expect(result).to.be.null;
      expect(dbMock.query.calledOnce).to.be.true;
    });

    it('should return an error if insertion fails', async function () {
      const errorMock = new Error('DB error');
      dbMock.query.rejects(errorMock);

      await expect(
        logRepository.addLog(1, 'Test log message')
      ).to.be.rejectedWith('DB error');
    });
  });

  describe('_countLogs', function () {
    it('should return the count of logs', async function () {
      dbMock.query.resolves({ rows: [{ count: '5' }] });

      const result = await logRepository._countLogs('SELECT * FROM logs', []);

      expect(result).to.equal(5);
    });

    it('should return zero if count query returns empty', async function () {
      dbMock.query.resolves({ rows: [{ count: '0' }] });

      const result = await logRepository._countLogs('SELECT * FROM logs', []);

      expect(result).to.equal(0);
    });
  });
});
