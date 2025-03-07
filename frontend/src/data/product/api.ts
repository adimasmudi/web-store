import { ErrorResponse, SuccessResponse } from '@/types/response';
import axios from 'axios';
import { GetProductsResData, ProductResData } from './dto';
import { config } from '../config';
import { DEFAULT_LIMIT } from '@/types/constants';

export const getProducts = async (
  search?: string,
  category?: string,
  limit?: number,
  page?: number
) => {
  try {
    let url = `${config.API_BASE_URL}/products?`;
    let currentLimit = DEFAULT_LIMIT;
    let currentPage = 1;

    if (search && search !== '') {
      url += `&search=${search}`;
    }

    if (category && category !== '') {
      url += `&category=${category}`;
    }

    if (limit) {
      currentLimit = limit;
    }

    if (page) {
      currentPage = page;
    }

    url += `&limit=${currentLimit}&page=${currentPage}`;

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
