const ProductRepository = require('./productRepository');

describe('ProductRepository', function () {
  let productRepository, fastifyMock, dbMock, productResult, productInput;

  beforeEach(function () {
    dbMock = {
      query: sinon.stub()
    };

    fastifyMock = {
      pg: dbMock
    };

    productRepository = new ProductRepository(fastifyMock);

    productInput = {
      title: 'New Product4',
      price: 29.99,
      category: 'electronics',
      image_path: 'https://example.com/image.jpg'
    };

    productResult = {
      id: '3',
      title: 'Mens Cotton Jacket',
      price: '55.99',
      description:
        'great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.',
      category: "men's clothing",
      image_path: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
      stock: 85,
      created_at: '2025-03-06T04:21:22.402Z',
      updated_at: '2025-03-06T04:21:22.402Z'
    };
  });

  afterEach(function () {
    sinon.restore();
  });

  describe('getAllProducts', function () {
    it('should return all products', async function () {
      const products = [productResult];
      const count = 1;
      sinon.stub(productRepository, '_countProducts').resolves(1);
      dbMock.query
        .withArgs(sinon.match.string, sinon.match.array)
        .resolves({ rows: products });

      const requestQuery = {
        limitInt: 10,
        pageInt: 1
      };
      const result = await productRepository.getAllProducts(requestQuery);

      expect(result.items).to.deep.equal(products);
      expect(result.totalItems).to.equal(count);
    });

    it('should return empty array if no products exist', async function () {
      sinon.stub(productRepository, '_countProducts').resolves(0);
      dbMock.query
        .withArgs(sinon.match.string, sinon.match.array)
        .resolves({ rows: [] });

      const requestQuery = {
        search: 'Men',
        category: "men's clot",
        limitInt: 10,
        pageInt: 1
      };
      const result = await productRepository.getAllProducts(requestQuery);

      expect(result.items).to.deep.equal([]);
      expect(result.totalItems).to.deep.equal(0);
    });
  });

  describe('getProductById', function () {
    it('should return product data', async function () {
      const product = productResult;
      dbMock.query
        .withArgs(sinon.match.string, sinon.match.array)
        .resolves({ rows: [product] });

      const result = await productRepository.getProductById(1);

      expect(result).to.deep.equal(product);
    });

    it('should return undefined if product with particular id does not exist', async function () {
      dbMock.query
        .withArgs(sinon.match.string, sinon.match.array)
        .resolves({ rows: [] });

      const result = await productRepository.getProductById(200);

      expect(result).to.deep.equal(undefined);
    });
  });

  describe('getProductByTitle', function () {
    it('should return product data', async function () {
      const product = productResult;
      dbMock.query
        .withArgs(sinon.match.string, sinon.match.array)
        .resolves({ rows: [product] });

      const result = await productRepository.getProductByTitle(
        "men's clothing"
      );

      expect(result).to.deep.equal(product);
    });

    it('should return undefined if product with particular title does not exist', async function () {
      dbMock.query
        .withArgs(sinon.match.string, sinon.match.array)
        .resolves({ rows: [] });

      const result = await productRepository.getProductByTitle('dggsa');

      expect(result).to.deep.equal(undefined);
    });
  });

  describe('addProduct', function () {
    it('should insert a product successfully', async function () {
      dbMock.query.resolves({ rows: [productResult] });

      const result = await productRepository.addProduct(productInput);

      expect(result).to.deep.equal(productResult);
      expect(dbMock.query.calledOnce).to.be.true;
    });

    it('should insert a product with stock successfully', async function () {
      dbMock.query.resolves({ rows: [productResult] });

      productInput.stock = 10;
      const result = await productRepository.addProduct(productInput);

      expect(result).to.deep.equal(productResult);
      expect(dbMock.query.calledOnce).to.be.true;
    });

    it('should return an error if insertion fails', async function () {
      const errorMock = new Error('DB error');
      dbMock.query.rejects(errorMock);

      await expect(
        productRepository.addProduct(productInput)
      ).to.be.rejectedWith('DB error');
    });
  });

  describe('updateProduct', function () {
    it('should update a product successfully', async function () {
      dbMock.query.resolves({ rows: [productResult] });

      const result = await productRepository.updateProduct(productInput, 1);

      expect(result).to.deep.equal(productResult);
      expect(dbMock.query.calledOnce).to.be.true;
    });

    it('should return an error if update fails', async function () {
      const errorMock = new Error('DB error');
      dbMock.query.rejects(errorMock);

      await expect(
        productRepository.updateProduct(productInput, 1)
      ).to.be.rejectedWith('DB error');
    });
  });

  describe('updateProductStock', function () {
    it('should update a product stock with delta successfully', async function () {
      dbMock.query.resolves({ rows: [productResult] });

      const result = await productRepository.updateProductStock(10, 1);

      expect(result).to.deep.equal(productResult);
      expect(dbMock.query.calledOnce).to.be.true;
    });

    it('should return an error if update stock fails', async function () {
      const errorMock = new Error('DB error');
      dbMock.query.rejects(errorMock);

      await expect(
        productRepository.updateProductStock(10, 200)
      ).to.be.rejectedWith('DB error');
    });
  });

  describe('deleteProduct', function () {
    it('should delete a product successfully', async function () {
      dbMock.query.resolves({ rows: [productResult] });

      const result = await productRepository.deleteProduct(1);

      expect(result).to.deep.equal(productResult);
      expect(dbMock.query.calledOnce).to.be.true;
    });

    it('should return an error if delete fails', async function () {
      const errorMock = new Error('DB error');
      dbMock.query.rejects(errorMock);

      await expect(productRepository.deleteProduct(-1)).to.be.rejectedWith(
        'DB error'
      );
    });
  });

  describe('_countProducts', function () {
    it('should return the count of products', async function () {
      dbMock.query.resolves({ rows: [{ count: '5' }] });

      const result = await productRepository._countProducts(
        'SELECT * FROM products',
        []
      );

      expect(result).to.equal(5);
    });

    it('should return zero if count query returns empty', async function () {
      dbMock.query.resolves({ rows: [{ count: '0' }] });

      const result = await productRepository._countProducts(
        'SELECT * FROM products',
        []
      );

      expect(result).to.equal(0);
    });
  });
});
