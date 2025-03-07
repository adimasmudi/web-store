'use client';

import { ProductResData } from '@/data/product/dto';
import { AppButton } from '@/components/button/Button';
import { Box, PenIcon } from 'lucide-react';
import { DeleteDialogButton } from '../deleteDialog/DeleteDialog';
import { formatTimestampToDate } from '@/utils/time';
import { useRouter } from 'next/navigation';
import { UpdateStockDialogButton } from '../deleteDialog/UpdateStockDialog';

interface TableProps {
  productsData: ProductResData[];
}
export const ProductTable = ({ productsData }: TableProps) => {
  const router = useRouter();
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th>Id</th>
          <th>Title</th>
          <th>Image</th>
          <th>Category</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Created At</th>
          <th>Updated At</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {productsData.map((item: ProductResData, idx: number) => {
          return (
            <tr key={idx} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{item.id}</td>
              <td className="border border-gray-300 px-4 py-2">{item.title}</td>
              <td className="border border-gray-300 px-4 py-2">
                <img
                  src={`${item.image_path}`}
                  alt={`${item.title}`}
                  className="w-8 h-8"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {item.category}
              </td>
              <td className="border border-gray-300 px-4 py-2">{item.price}</td>
              <td className="border border-gray-300 px-4 py-2">
                {String(item.stock)}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {formatTimestampToDate(item.created_at)}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {formatTimestampToDate(item.updated_at)}
              </td>
              <td>
                <div>
                  <AppButton
                    variant="default"
                    onClick={() =>
                      router.push(`/admin/product/update/${item.id}`)
                    }
                  >
                    <PenIcon />
                  </AppButton>
                  <UpdateStockDialogButton id={item.id} stock={item.stock} />
                  <DeleteDialogButton id={item.id} />
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
