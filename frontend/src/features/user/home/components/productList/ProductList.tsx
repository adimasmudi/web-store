'use client';

import { AppButton } from '@/components/button/Button';
import { ProductCard } from '@/components/card/ProductCard';
import { Spinner } from '@/components/spinner/Spinner';
import { getProducts } from '@/data/product/api';
import { ProductResData } from '@/data/product/dto';
import { useFetch } from '@/hooks/useFetch';
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
import { useState } from 'react';

export const ProductList = () => {
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
    <div className="mt-96 w-11/12">
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <p>There is error when trying to display product data</p>
      ) : (
        <>
          <h2>List of Products</h2>
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
          <div className="grid mx-5 xl:mx-0 grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {data?.data.items.length > 0
              ? data?.data.items.map((dt: ProductResData, idx: number) => {
                  return (
                    <ProductCard
                      key={idx}
                      id={Number(dt.id)}
                      title={dt.title}
                      price={Number(dt.price)}
                      description={dt.description}
                      category={dt.category}
                      image_path={dt.image_path}
                      stock={Number(dt.stock)}
                    />
                  );
                })
              : 'There is no data to display'}
          </div>
        </>
      )}
    </div>
  );
};
