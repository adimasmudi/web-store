const ProductController = require('./productController');

describe('ProductController', function () {
  let productController,
    services,
    successResponse,
    errorResponse,
    product,
    paginatedProducts;

  const sandbox = sinon.createSandbox();

  beforeEach(function () {
    services = {
      productService: {
        getAllProducts: sinon.stub(),
        getProductById: sinon.stub(),
        addProduct: sinon.stub(),
        updateProduct: sinon.stub(),
        updateProductStock: sinon.stub(),
        deleteProduct: sinon.stub()
      }
    };
    productController = new ProductController(services);

    req = {
      params: {},
      query: {},
      body: {}
    };

    res = {
      code: sandbox.stub().returnsThis(),
      send: sandbox.stub()
    };
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
    product = {
      id: '5',
      title:
        "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
      price: '695.00',
      description:
        "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
      category: 'jewelery',
      image_path:
        'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
      stock: 7,
      created_at: '2025-03-06T04:21:22.402Z',
      updated_at: '2025-03-06T04:21:22.402Z'
    };
    paginatedProducts = {
      totalItems: 1,
      numberOfPage: 1,
      items: [product]
    };
    successResponse = {
      status: 'success',
      statusCode: 200,
      message: 'success',
      data: paginatedProducts
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

  describe('getAllProducts', function () {
    it('should return success response with products data', async function () {
      services.productService.getAllProducts.resolves(paginatedProducts);
      successResponse.message = 'Products retrieved successfully';
      res.send = sinon.stub().resolves(successResponse);

      const result = await productController.getAllProducts(req, res);

      expect(result).to.deep.equal(successResponse);
    });

    it('should return error response', async function () {
      const errorMessage = 'limit should be integer';
      services.productService.getAllProducts.rejects(errorMessage);
      errorResponse.message = errorMessage;
      errorResponse.statusCode = 400;
      res.send = sinon.stub().resolves(errorResponse);
      req.query.limit = 'abc';

      const result = await productController.getAllProducts(req, res);

      expect(result).to.deep.equal(errorResponse);
    });
  });

  describe('getProductById', function () {
    it('should return success response with product data', async function () {
      services.productService.getProductById.resolves(product);
      successResponse.message = 'Product retrieved successfully';
      res.send = sinon.stub().resolves(successResponse);

      const result = await productController.getProductById(req, res);

      expect(result).to.deep.equal(successResponse);
    });

    it('should return error response when trying to get product with id that does not exist', async function () {
      const errorMessage = `product with id 1 doesn't exist`;
      services.productService.getProductById.rejects(errorMessage);
      errorResponse.message = errorMessage;
      errorResponse.statusCode = 400;
      res.send = sinon.stub().resolves(errorResponse);

      const result = await productController.getProductById(req, res);

      expect(result).to.deep.equal(errorResponse);
    });
  });

  describe('addProduct', function () {
    it('should return success response with product data', async function () {
      services.productService.addProduct.resolves(product);
      successResponse.message = 'Product created successfully';
      res.send = sinon.stub().resolves(successResponse);

      const result = await productController.addProduct(req, res);

      expect(result).to.deep.equal(successResponse);
    });

    it('should return error response when trying to insert product with the same title', async function () {
      const errorMessage = `product with title ${productInput.title} already exist`;
      services.productService.addProduct.rejects(errorMessage);
      errorResponse.message = errorMessage;
      errorResponse.statusCode = 400;
      res.send = sinon.stub().resolves(errorResponse);

      const result = await productController.addProduct(req, res);

      expect(result).to.deep.equal(errorResponse);
    });
  });

  describe('updateProduct', function () {
    it('should return success response with product data', async function () {
      services.productService.updateProduct.resolves(product);
      successResponse.message = 'Product updated successfully';
      res.send = sinon.stub().resolves(successResponse);

      const result = await productController.updateProduct(req, res);

      expect(result).to.deep.equal(successResponse);
    });

    it('should return error response when trying to update product with id that does not exist', async function () {
      const errorMessage = `product with id 1 doesn't exist`;
      services.productService.updateProduct.rejects(errorMessage);
      errorResponse.message = errorMessage;
      errorResponse.statusCode = 400;
      res.send = sinon.stub().resolves(errorResponse);

      const result = await productController.updateProduct(req, res);

      expect(result).to.deep.equal(errorResponse);
    });
  });

  describe('updateProductStock', function () {
    it('should return success response with product data', async function () {
      services.productService.updateProductStock.resolves(product);
      successResponse.message = 'Product stock updated successfully';
      res.send = sinon.stub().resolves(successResponse);

      const result = await productController.updateProductStock(req, res);

      expect(result).to.deep.equal(successResponse);
    });

    it('should return error response when trying to update product stock with id that does not exist', async function () {
      const errorMessage = `product with id 1 doesn't exist`;
      services.productService.updateProductStock.rejects(errorMessage);
      errorResponse.message = errorMessage;
      errorResponse.statusCode = 400;
      res.send = sinon.stub().resolves(errorResponse);

      const result = await productController.updateProductStock(req, res);

      expect(result).to.deep.equal(errorResponse);
    });
  });

  describe('deleteProduct', function () {
    it('should return success response with product data', async function () {
      services.productService.deleteProduct.resolves(product);
      successResponse.message = 'Product deleted successfully';
      res.send = sinon.stub().resolves(successResponse);

      const result = await productController.deleteProduct(req, res);

      expect(result).to.deep.equal(successResponse);
    });

    it('should return error response when trying to delete product with id that does not exist', async function () {
      const errorMessage = `product with id 1 doesn't exist`;
      services.productService.deleteProduct.rejects(errorMessage);
      errorResponse.message = errorMessage;
      errorResponse.statusCode = 400;
      res.send = sinon.stub().resolves(errorResponse);

      const result = await productController.deleteProduct(req, res);

      expect(result).to.deep.equal(errorResponse);
    });
  });
});
