import { ErrorResponse, SuccessResponse } from '@/types/response';
import axios from 'axios';
import { GetProductsResData, ProductResData } from './dto';
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

    console.log('url', url);

    const response = await axios.get<
      SuccessResponse<GetProductsResData> | ErrorResponse
    >(url);

    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw err.response?.data;
    }
    throw new Error('unable to get products');
  }
};
