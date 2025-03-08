'use client';

import { useEffect, useState } from 'react';
import { AppButton } from '@/components/button/Button';
import { Input } from '@/shadcn/components/ui/input';
import { Textarea } from '@/shadcn/components/ui/textarea';
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
import { getProductBYId, updateProduct } from '@/data/product/api';
import { useMutation } from '@/hooks/useMutation';
import { useParams, useRouter } from 'next/navigation';
import { Label } from '@/shadcn/components/ui/label';
import { useFetch } from '@/hooks/useFetch';
import { toast } from 'sonner';

export const UpdateForm = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const [formData, setFormData] = useState({
    title: '',
    price: 0,
    category: '',
    image_path: '',
    description: ''
  });

  const { data } = useFetch({
    fn: getProductBYId,
    params: { id: id }
  });

  useEffect(() => {
    if (data?.data) {
      setFormData({
        title: data.data.title || '',
        price: Number(data.data.price) || 0,
        category: data.data.category || '',
        image_path: data.data.image_path || '',
        description: data.data.description || ''
      });
    }
  }, [data]);

  const { mutate, isLoading, error } = useMutation({
    fn: updateProduct
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate(
      {
        id: id,
        reqBody: formData
      },
      {
        onSuccess: (data) => {
          toast.success('Product updated successfully!');
          router.push('/admin');
        },
        onError: (err) => {
          toast.error(`Failed to update: ${err?.message || 'Unknown error'}`);
        }
      }
    );
  };

  return (
    <div className="bg-app_white h-3/5 w-3/5 rounded shadow">
      <form
        onSubmit={handleSubmit}
        className=" flex flex-col justify-center h-full"
      >
        <div className="flex flex-col  gap-5">
          <div className="flex flex-row justify-evenly flex-wrap gap-10">
            <div className="h-full flex flex-col gap-3">
              <div className="h-14 w-56">
                <Label htmlFor="title">Title</Label>
                <Input
                  placeholder="Enter title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div className="h-14 w-56">
                <Label htmlFor="price">Price</Label>
                <Input
                  placeholder="Enter price"
                  name="price"
                  type="number"
                  value={formData.price || ''}
                  onChange={handleChange}
                  min="0"
                />
              </div>
              <div className="h-14 w-56">
                <Label htmlFor="category">Category</Label>
                <Select
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value })
                  }
                  value={formData.category}
                  name="category"
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Category</SelectLabel>

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
            </div>
            <div className="h-full flex flex-col gap-3">
              <div className="h-14 w-56">
                <Label htmlFor="image_path">Image Path</Label>
                <Input
                  placeholder="image_path"
                  name="image_path"
                  value={formData.image_path}
                  onChange={handleChange}
                />
              </div>
              <div className="h-30">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  placeholder="Enter description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-center">
            <AppButton
              state={isLoading ? 'Loading' : 'Active'}
              variant="primary"
              type="submit"
            >
              Submit
            </AppButton>
          </div>
        </div>
      </form>
    </div>
  );
};
