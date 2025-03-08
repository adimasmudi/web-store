'use client';

import { useFetch } from '@/hooks/useFetch';
import styles from './styles.module.css';
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
    <div className={`w-[96%] ${styles['log-list-container']}`}>
      {isLoading ? (
        <Spinner variant="large" />
      ) : error ? (
        <p>There is error when trying to display logs data</p>
      ) : (
        <>
          <div
            className={`flex flex-row items-end justify-between ${styles['log-list-header']}`}
          >
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
                <div className="flex flex-row gap-2">
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
