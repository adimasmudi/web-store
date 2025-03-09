const ProductService = require('./productService');

describe('ProductService', function () {
  let productService, repositories, product, paginatedProducts;

  beforeEach(function () {
    repositories = {
      productRepository: {
        getAllProducts: sinon.stub(),
        addProduct: sinon.stub(),
        updateProduct: sinon.stub(),
        deleteProduct: sinon.stub(),
        updateProductStock: sinon.stub(),
        getProductByTitle: sinon.stub(),
        getProductById: sinon.stub()
      },
      logRepository: {
        addLog: sinon.stub()
      }
    };
    productService = new ProductService(repositories);

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
  });

  afterEach(function () {
    sinon.restore();
  });

  describe('getAllProducts', function () {
    it('should return products data', async function () {
      repositories.productRepository.getAllProducts.resolves(paginatedProducts);
      const requestQuery = {
        search: 'Men',
        category: "men's clothing",
        limit: 10,
        page: 1
      };

      const result = await productService.getAllProducts(requestQuery);

      expect(result).to.deep.equal(paginatedProducts);
    });
  });

  describe('getProductById', function () {
    it('should return product data', async function () {
      repositories.productRepository.getProductById.resolves(product);

      const result = await productService.getProductById(1);

      expect(result).to.deep.equal(product);
    });

    it('should return error if product with particular id does not exist', async function () {
      repositories.productRepository.getProductById.resolves(undefined);
      const errorMessage = `product with id 1 doesn't exist`;

      await expect(productService.deleteProduct(1)).to.be.rejectedWith(
        errorMessage
      );
    });
  });

  describe('addProduct', function () {
    it('should return product data', async function () {
      repositories.productRepository.getProductByTitle.resolves(undefined);
      repositories.productRepository.addProduct.resolves(product);

      const result = await productService.addProduct(productInput);

      expect(result).to.deep.equal(product);
    });

    it('should return error if product with the same title already exist', async function () {
      repositories.productRepository.getProductByTitle.resolves(product);
      const errorMessage = `product with title ${productInput.title} already exist`;

      await expect(productService.addProduct(productInput)).to.be.rejectedWith(
        errorMessage
      );
    });
  });

  describe('updateProduct', function () {
    it('should return product data', async function () {
      repositories.productRepository.getProductById.resolves(product);
      repositories.productRepository.getProductByTitle.resolves(undefined);
      repositories.productRepository.updateProduct.resolves(product);

      const result = await productService.updateProduct(productInput, 1);

      expect(result).to.deep.equal(product);
    });

    it('should return error if product with particular id does not exist', async function () {
      repositories.productRepository.getProductById.resolves(undefined);
      const errorMessage = `product with id 1 doesn't exist`;

      await expect(
        productService.updateProduct(productInput, 1)
      ).to.be.rejectedWith(errorMessage);
    });

    it('should return error if product with particular title already exist', async function () {
      repositories.productRepository.getProductById.resolves(product);
      repositories.productRepository.getProductByTitle.resolves({
        ...product,
        id: 101
      });
      const errorMessage = `product with title ${productInput.title} already exist`;

      await expect(
        productService.updateProduct(productInput, 1)
      ).to.be.rejectedWith(errorMessage);
    });
  });

  describe('updateProductStock', function () {
    it('should return product data', async function () {
      repositories.productRepository.getProductById.resolves(product);
      repositories.productRepository.updateProductStock.resolves(product);
      repositories.logRepository.addLog.resolves(undefined);

      const result = await productService.updateProductStock(10, 1);

      expect(result).to.deep.equal(product);
    });

    it('should return error if product with the particular id does not exist', async function () {
      repositories.productRepository.getProductById.resolves(undefined);
      const errorMessage = `product with id 1 doesn't exist`;

      await expect(productService.updateProductStock(10, 1)).to.be.rejectedWith(
        errorMessage
      );
    });

    it('should return error if product stock after added by delta stock is less than 0', async function () {
      repositories.productRepository.getProductById.resolves(product);
      const errorMessage = `product stock should at least 0`;

      await expect(
        productService.updateProductStock(-100, 1)
      ).to.be.rejectedWith(errorMessage);
    });

    it('should return error there is error when trying to add new log', async function () {
      repositories.productRepository.getProductById.resolves(product);
      repositories.productRepository.updateProductStock.resolves(product);
      const errorMessage = 'error when trying to add new log';
      repositories.logRepository.addLog.resolves(errorMessage);

      await expect(productService.updateProductStock(10, 1)).to.be.rejectedWith(
        errorMessage
      );
    });
  });

  describe('deleteProduct', function () {
    it('should return product data', async function () {
      repositories.productRepository.getProductById.resolves(product);
      repositories.productRepository.deleteProduct.resolves(product);

      const result = await productService.deleteProduct(1);

      expect(result).to.deep.equal(product);
    });

    it('should return error if product with particular id does not exist', async function () {
      repositories.productRepository.getProductById.resolves(undefined);
      const errorMessage = `product with id 1 doesn't exist`;

      await expect(productService.deleteProduct(1)).to.be.rejectedWith(
        errorMessage
      );
    });
  });
});
