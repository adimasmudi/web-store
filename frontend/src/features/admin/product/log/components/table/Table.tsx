'use client';

import { formatTimestampToDate } from '@/utils/time';
import { LogResData } from '@/data/log/dto';
import styles from './styles.module.css';

interface LogTableProps {
  logsData: LogResData[];
}
export const LogTable = ({ logsData }: LogTableProps) => {
  return (
    <table
      className={`w-full border-collapse border border-gray-300 ${styles['table']}`}
    >
      <thead>
        <tr className="bg-gray-200">
          <th className={styles['table-content']}>Id</th>
          <th className={styles['table-content']}>Title</th>
          <th className={styles['table-content']}>Category</th>
          <th className={styles['table-content']}>Message</th>
          <th className={styles['table-content']}>Created At</th>
        </tr>
      </thead>
      <tbody>
        {logsData.map((item: LogResData, idx: number) => {
          return (
            <tr key={idx} className="hover:bg-gray-100">
              <td
                className={`border border-gray-300 px-4 py-2 ${styles['table-content']}`}
              >
                {item.id}
              </td>
              <td
                className={`border border-gray-300 px-4 py-2 ${styles['table-content']}`}
              >
                {item.title}
              </td>

              <td
                className={`border border-gray-300 px-4 py-2 ${styles['table-content']}`}
              >
                {item.category}
              </td>
              <td
                className={`border border-gray-300 px-4 py-2 ${styles['table-content']}`}
              >
                {item.message}
              </td>
              <td
                className={`border border-gray-300 px-4 py-2 ${styles['table-content']}`}
              >
                {formatTimestampToDate(item.created_at)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
