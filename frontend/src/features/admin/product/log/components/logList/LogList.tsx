'use client';

import { useFetch } from '@/hooks/useFetch';
import styles from './styles.module.css';
import { getProducts } from '@/data/product/api';
import { ProductResData } from '@/data/product/dto';
import { AppButton } from '@/components/button/Button';
import { ArrowLeft, ArrowRight, Table, Trash2 } from 'lucide-react';
import { Spinner } from '@/components/spinner/Spinner';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogTable } from '../table/Table';
import { getLogs } from '@/data/log/api';

export const LogList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, isLoading, error } = useFetch({
    fn: getLogs,
    params: { page: currentPage }
  });

  return (
    <div className="mt-96 w-11/12">
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <p>There is error when trying to display product data</p>
      ) : (
        <>
          <div className="flex flex-row justify-between">
            <h2>Logs Table</h2>
          </div>

          {data?.data.items.length > 0 ? (
            <>
              {data && <LogTable logsData={data?.data.items} />}

              <div className="flex flex-row justify-between">
                <div>
                  <span>
                    Displaying Page {currentPage} of {data?.data.numberOfPage}{' '}
                    Pages
                  </span>
                </div>
                <div>
                  <AppButton
                    variant="outline"
                    state={currentPage === 1 ? 'Disabled' : 'Active'}
                    onClick={() => {
                      if (currentPage === 1) {
                        return;
                      }
                      setCurrentPage((prevState) => prevState - 1);
                    }}
                  >
                    <ArrowLeft />
                  </AppButton>
                  <AppButton
                    variant="outline"
                    state={
                      currentPage === data?.data.numberOfPage
                        ? 'Disabled'
                        : 'Active'
                    }
                    onClick={() => {
                      if (currentPage === data?.data.numberOfPage) {
                        return;
                      }
                      setCurrentPage((prevState) => prevState + 1);
                    }}
                  >
                    <ArrowRight />
                  </AppButton>
                </div>
              </div>
            </>
          ) : (
            'There is no data to be displayed'
          )}
        </>
      )}
    </div>
  );
};
