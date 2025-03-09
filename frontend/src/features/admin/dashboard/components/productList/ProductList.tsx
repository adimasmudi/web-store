'use client';

import { useFetch } from '@/hooks/useFetch';
import styles from './styles.module.css';
import { getProducts } from '@/data/product/api';
import { ProductResData } from '@/data/product/dto';
import { AppButton } from '@/components/button/Button';
import { ArrowLeft, ArrowRight, Table, Trash2 } from 'lucide-react';
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
import { ProductTable } from '../table/Table';
import { useRouter } from 'next/navigation';

export const ProductList = () => {
  const router = useRouter();
  const [category, setCategory] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [searchTemp, setSearchTemp] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [toggleRefetch, setToggleRefetch] = useState<boolean>(false);

  const { data, isLoading, error } = useFetch({
    fn: getProducts,
    params: { search: search, category: category, page: currentPage },
    refetch: toggleRefetch
  });

  return (
    <div className={`w-[96%] ${styles['product-list-container']}`}>
      {isLoading ? (
        <Spinner variant="large" />
      ) : error ? (
        <p>There is error when trying to display product data</p>
      ) : (
        <>
          <div
            className={`flex flex-row items-end justify-between ${styles['product-list-header']}`}
          >
            <h2>Products Table</h2>
            <AppButton
              variant="primary"
              onClick={() => router.push('/admin/product/create')}
            >
              Create Product
            </AppButton>
          </div>
          <div className="flex flex-row justify-between">
            <div>
              <Select
                onValueChange={(val) => {
                  if (val === 'select_all') {
                    setSearchTemp('');
                    setSearch('');
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
              {data && (
                <ProductTable
                  productsData={data?.data.items}
                  setToggleRefetch={setToggleRefetch}
                />
              )}

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
