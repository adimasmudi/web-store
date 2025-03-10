import { ErrorResponse, SuccessResponse } from '@/types/response';
import axios from 'axios';
import {
  GetProductsResData,
  ProductReqBody,
  ProductResData,
  UpdateProductStockReqBody
} from './dto';
import { config } from '../config';
import { DEFAULT_LIMIT } from '@/types/constants';

export const getProducts = async (params: {
  search?: string;
  category?: string;
  limit?: number;
  page?: number;
}) => {
  try {
    let url = `${config.API_BASE_URL}/products`;
    let currentLimit = DEFAULT_LIMIT;
    let currentPage = 1;

    if (params.limit) {
      currentLimit = params.limit;
    }

    if (params.page) {
      currentPage = params.page;
    }

    url += `?limit=${currentLimit}&page=${currentPage}`;

    if (params.search && params.search !== '') {
      url += `&search=${params.search}`;
    }

    if (params.category && params.category !== '') {
      url += `&category=${params.category}`;
    }

    const response = await axios.get<
      SuccessResponse<GetProductsResData> | ErrorResponse<GetProductsResData>
    >(url);

    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw err.response?.data;
    }
    throw new Error('unable to get products');
  }
};

export const getProductById = async (params: { id: string }) => {
  try {
    const url = `${config.API_BASE_URL}/products/${params.id}`;

    const response = await axios.get<
      SuccessResponse<ProductResData> | ErrorResponse<ProductResData>
    >(url);

    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw err.response?.data;
    }
    throw new Error('unable to get product');
  }
};

export const addProduct = async (
  reqBody: ProductReqBody
): Promise<SuccessResponse<ProductResData> | ErrorResponse<ProductResData>> => {
  try {
    const response = await axios.post<
      SuccessResponse<ProductResData> | ErrorResponse<ProductResData>
    >(`${config.API_BASE_URL}/products`, reqBody);

    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw err.response?.data;
    }
    throw new Error('unable to add product');
  }
};

export const updateProduct = async (params: {
  id: string;
  reqBody: ProductReqBody;
}): Promise<
  SuccessResponse<ProductResData> | ErrorResponse<ProductResData>
> => {
  try {
    const response = await axios.put<
      SuccessResponse<ProductResData> | ErrorResponse<ProductResData>
    >(`${config.API_BASE_URL}/products/${params.id}`, params.reqBody);

    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw err.response?.data;
    }
    throw new Error('unable to update product');
  }
};

export const updateProductStock = async (params: {
  id: string;
  reqBody: UpdateProductStockReqBody;
}): Promise<
  SuccessResponse<ProductResData> | ErrorResponse<ProductResData>
> => {
  try {
    const response = await axios.patch<
      SuccessResponse<ProductResData> | ErrorResponse<ProductResData>
    >(`${config.API_BASE_URL}/products/${params.id}/stock`, params.reqBody);

    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw err.response?.data;
    }
    throw new Error('unable to update product stock');
  }
};

export const deleteProduct = async (params: {
  id: number;
}): Promise<
  SuccessResponse<ProductResData> | ErrorResponse<ProductResData>
> => {
  try {
    const response = await axios.delete<
      SuccessResponse<ProductResData> | ErrorResponse<ProductResData>
    >(`${config.API_BASE_URL}/products/${params.id}`);

    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw err.response?.data;
    }
    throw new Error('unable to delete product');
  }
};
