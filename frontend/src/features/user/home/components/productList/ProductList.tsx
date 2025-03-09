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
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './styles.module.css';

export const ProductList = () => {
  const [products, setProducts] = useState<ProductResData[]>([]);
  const [category, setCategory] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [searchTemp, setSearchTemp] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState(true);

  const { data, isLoading, error } = useFetch({
    fn: getProducts,
    params: { search, category, page: currentPage }
  });

  const observer = useRef<IntersectionObserver | null>(null);
  const lastProductRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading || !hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  useEffect(() => {
    if (data?.data.items.length > 0) {
      setProducts((prevState) => {
        const newItems = data?.data.items.filter(
          (item: ProductResData) =>
            !prevState.some((prevItem) => prevItem.id === item.id)
        );
        return [...prevState, ...newItems];
      });
    } else {
      setHasMore(false);
    }
  }, [data?.data.items]);

  useEffect(() => {
    setProducts([]);
    setCurrentPage(1);
    setHasMore(true);

    console.log('cat', category);
    if (category === '' && searchTemp === '') {
      setSearch('');
    }
  }, [search, category]);

  return (
    <div className={`w-[96%]`}>
      <h2>List of Products</h2>
      <div className="flex flex-row flex-wrap justify-between gap-2">
        <div>
          <Select
            onValueChange={(val) => {
              setCategory(val === 'select_all' ? '' : val);
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
                {PRODUCT_CATEGORIES.map((pc, idx) => (
                  <SelectItem key={idx} value={pc}>
                    {pc}
                  </SelectItem>
                ))}
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
              if (e.key === 'Enter' && searchTemp.length >= 3) {
                setSearch(searchTemp);
              }
            }}
          />
          <AppButton
            variant="primary"
            state={searchTemp.length >= 3 ? 'Active' : 'Disabled'}
            onClick={() => {
              if (searchTemp.length >= 3) setSearch(searchTemp);
            }}
          >
            Search
          </AppButton>
        </div>
      </div>
      <div
        className={`grid mx-5 xl:mx-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 ${styles['product-list-container']}`}
      >
        {products.map((product: ProductResData, idx: number) => (
          <div
            key={product.id}
            ref={idx === products.length - 1 ? lastProductRef : null}
          >
            <ProductCard data={product} />
          </div>
        ))}
        {isLoading && <Spinner variant="large" />}
        {error && <p className="text-red-500">Error loading products.</p>}
      </div>
    </div>
  );
};
