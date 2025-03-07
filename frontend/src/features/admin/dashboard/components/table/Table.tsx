'use client';

import { useFetch } from '@/hooks/useFetch';
import styles from './styles.module.css';
import { getProducts } from '@/data/product/api';
import { ProductResData } from '@/data/product/dto';
import { AppButton } from '@/components/button/Button';
import { ArrowLeft, ArrowRight, Trash2 } from 'lucide-react';
import { Spinner } from '@/components/spinner/Spinner';
import { useState } from 'react';
import { Input } from '@/shadcn/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/shadcn/components/ui/select';
import { PRODUCT_CATEGORIES } from '@/types/constants';

export const Table = () => {
  const [category, setCategory] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [searchTemp, setSearchTemp] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { data, isLoading, error } = useFetch({
    fn: getProducts,
    params: { search: search, category: category, page: currentPage }
  });

  return (
    <div className="mt-96 w-11/12">
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <p>There is error when trying to display product data</p>
      ) : (
        <>
          <h2>Products Table</h2>
          <div className="flex flex-row justify-between">
            <div>
              <Select
                onValueChange={(val) => {
                  if (val === 'select_all') {
                    setCategory('');
                    return;
                  }
                  setCategory(val);
                }}
                defaultValue={category}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="select_all">Display All</SelectItem>
                    {PRODUCT_CATEGORIES.map((pc, idx) => {
                      return (
                        <SelectItem key={idx} value={pc}>
                          {pc}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-row gap-4">
              <Input
                placeholder="Enter a search keyword"
                defaultValue={searchTemp}
                onChange={(e) => setSearchTemp(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setCurrentPage(1);
                    if (searchTemp.length >= 3) setSearch(searchTemp);
                  }
                }}
              />
              <AppButton
                variant="primary"
                state={searchTemp.length >= 3 ? 'Active' : 'Disabled'}
                onClick={() => {
                  setCurrentPage(1);
                  if (searchTemp.length >= 3) setSearch(searchTemp);
                }}
              >
                Search
              </AppButton>
            </div>
          </div>
          {data?.data.items.length > 0 ? (
            <>
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
                  {data &&
                    data.data.items.map((item: ProductResData, idx: number) => {
                      return (
                        <tr key={idx} className="hover:bg-gray-100">
                          <td className="border border-gray-300 px-4 py-2">
                            {item.id}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {item.title}
                          </td>
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
                          <td className="border border-gray-300 px-4 py-2">
                            {item.price}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {String(item.stock)}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {item.created_at}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {item.updated_at}
                          </td>
                          <td>
                            <div>
                              <AppButton variant="destructive">
                                <Trash2 />
                              </AppButton>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>

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
