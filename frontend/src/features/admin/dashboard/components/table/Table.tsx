'use client';

import { ProductResData } from '@/data/product/dto';
import { AppButton } from '@/components/button/Button';
import { PenIcon } from 'lucide-react';
import { DeleteDialogButton } from '../dialog/DeleteDialog';
import { formatTimestampToDate } from '@/utils/time';
import { useRouter } from 'next/navigation';
import { UpdateStockDialogButton } from '../dialog/UpdateStockDialog';
import { Dispatch, SetStateAction } from 'react';
import styles from './styles.module.css';

interface TableProps {
  productsData: ProductResData[];
  setToggleRefetch: Dispatch<SetStateAction<boolean>>;
}
export const ProductTable = ({
  productsData,
  setToggleRefetch
}: TableProps) => {
  const router = useRouter();
  return (
    <table
      className={`w-full border-collapse border border-gray-300 ${styles['table']}`}
    >
      <thead>
        <tr className="bg-gray-200">
          <th className={styles['table-content']}>Id</th>
          <th className={styles['table-content']}>Title</th>
          <th className={styles['table-content']}>Image</th>
          <th className={styles['table-content']}>Category</th>
          <th className={styles['table-content']}>Price</th>
          <th className={styles['table-content']}>Stock</th>
          <th className={styles['table-content']}>Created At</th>
          <th className={styles['table-content']}>Updated At</th>
          <th className={styles['table-content']}>Action</th>
        </tr>
      </thead>
      <tbody>
        {productsData.map((item: ProductResData, idx: number) => {
          return (
            <tr key={idx} className={`hover:bg-gray-100 `}>
              <td
                className={`border border-gray-300 px-4 py-2 ${styles['table-content']}`}
              >
                {item.id}
              </td>
              <td
                className={`border border-gray-300 px-4 py-2 ${styles['table-content']}`}
              >
                <span className="line-clamp-2">{item.title}</span>
              </td>
              <td
                className={`border border-gray-300 px-4 py-2 ${styles['table-content']}`}
              >
                <img
                  src={`${item.image_path}`}
                  alt={`${item.title}`}
                  className="w-8 h-8"
                />
              </td>
              <td
                className={`border border-gray-300 px-4 py-2 ${styles['table-content']}`}
              >
                {item.category}
              </td>
              <td
                className={`border border-gray-300 px-4 py-2 ${styles['table-content']}`}
              >
                {item.price}
              </td>
              <td
                className={`border border-gray-300 px-4 py-2 ${styles['table-content']}`}
              >
                {String(item.stock)}
              </td>
              <td
                className={`border border-gray-300 px-4 py-2 ${styles['table-content']}`}
              >
                {formatTimestampToDate(item.created_at)}
              </td>
              <td
                className={`border border-gray-300 px-4 py-2 ${styles['table-content']}`}
              >
                {formatTimestampToDate(item.updated_at)}
              </td>
              <td
                className={`border border-gray-300 px-4 py-2 ${styles['table-content']}`}
              >
                <div className="flex flex-row justify-center gap-2">
                  <AppButton
                    variant="default"
                    onClick={() =>
                      router.push(`/admin/product/update/${item.id}`)
                    }
                  >
                    <PenIcon />
                  </AppButton>
                  <UpdateStockDialogButton
                    id={item.id}
                    stock={item.stock}
                    setToggleRefetch={setToggleRefetch}
                  />
                  <DeleteDialogButton
                    id={item.id}
                    setToggleRefetch={setToggleRefetch}
                  />
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
