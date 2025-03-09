import { DEFAULT_LIMIT } from '@/types/constants';
import { config } from '../config';
import { ErrorResponse, SuccessResponse } from '@/types/response';
import axios from 'axios';
import { GetLogsResData } from './dto';

export const getLogs = async (params: { limit?: number; page?: number }) => {
  try {
    let url = `${config.API_BASE_URL}/logs`;
    let currentLimit = DEFAULT_LIMIT;
    let currentPage = 1;

    if (params.limit) {
      currentLimit = params.limit;
    }

    if (params.page) {
      currentPage = params.page;
    }

    url += `?limit=${currentLimit}&page=${currentPage}`;

    const response = await axios.get<
      SuccessResponse<GetLogsResData> | ErrorResponse<GetLogsResData>
    >(url);

    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw err.response?.data;
    }
    throw new Error('unable to get logs');
  }
};
