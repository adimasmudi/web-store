'use client';

import { formatTimestampToDate } from '@/utils/time';
import { useRouter } from 'next/navigation';
import { LogResData } from '@/data/log/dto';

interface LogTableProps {
  logsData: LogResData[];
}
export const LogTable = ({ logsData }: LogTableProps) => {
  const router = useRouter();
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th>Id</th>
          <th>Title</th>
          <th>Category</th>
          <th>Message</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        {logsData.map((item: LogResData, idx: number) => {
          return (
            <tr key={idx} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{item.id}</td>
              <td className="border border-gray-300 px-4 py-2">{item.title}</td>

              <td className="border border-gray-300 px-4 py-2">
                {item.category}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.message}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {formatTimestampToDate(item.created_at)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
