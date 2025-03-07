'use client';

import { AppButton } from '@/components/button/Button';
import { deleteProduct, updateProductStock } from '@/data/product/api';
import { useMutation } from '@/hooks/useMutation';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/shadcn/components/ui/dialog';
import { Input } from '@/shadcn/components/ui/input';
import { Box, Trash2 } from 'lucide-react';

import { Dispatch, SetStateAction, useState } from 'react';

interface DeleteDialogButtonProps {
  id: string;
  stock: Number;
  setToggleRefetch: Dispatch<SetStateAction<boolean>>;
}
export const UpdateStockDialogButton = ({
  id,
  stock,
  setToggleRefetch
}: DeleteDialogButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [stockDeltaValue, setStockDeltaValue] = useState<number>(0);

  const { mutate, isLoading, error } = useMutation({
    fn: updateProductStock
  });
  const handleUpdateStock = () => {
    setIsOpen(false);

    mutate(
      { id: id, reqBody: { delta_stock: stockDeltaValue } },
      {
        onSuccess: (data) => {
          setToggleRefetch((prevState) => !prevState);
        },
        onError: (err) => {
          alert(
            `Failed to update product stock: ${err?.message || 'Unknown error'}`
          );
        }
      }
    );
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          setStockDeltaValue(0);
        }
      }}
    >
      <DialogTrigger asChild>
        <AppButton
          variant="secondary"
          className="rounded-r rounded-l-none border-l-0"
        >
          <Box />
        </AppButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" color="text-navy">
        <DialogHeader>
          <DialogTitle className="flex justify-center text-navy font-semibold pt-6">
            Update Stock Product
          </DialogTitle>
          <DialogDescription className="flex justify-center text-navy">
            Current Stock {String(stock)}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-row items-center justify-center gap-5">
          <AppButton
            variant={'outline'}
            onClick={() => {
              setStockDeltaValue((prevState) => prevState - 1);
            }}
          >
            -
          </AppButton>
          <div className=" flex flex-row justify-center items-center w-44 h-10 ">
            <Input
              type="number"
              placeholder="Enter delta value of stock"
              value={stockDeltaValue || ''}
              onChange={(e) => setStockDeltaValue(Number(e.target.value))}
            />
          </div>
          <AppButton
            variant="outline"
            onClick={() => {
              setStockDeltaValue((prevState) => prevState + 1);
            }}
          >
            +
          </AppButton>
        </div>
        <div className="w-full flex justify-center">
          <DialogFooter>
            <DialogClose asChild>
              <AppButton
                variant="outline"
                type="submit"
                className="bg-transparent text-navy border border-sky-900 transition transform hover:scale-105 hover:bg-transparent hover:text-navy"
              >
                Cancel
              </AppButton>
            </DialogClose>
            <AppButton
              variant="primary"
              type="submit"
              state={isLoading ? 'Loading' : 'Active'}
              className="bg-navy transition transform hover:scale-105 hover:bg-navy hover:text-navy px-8"
              onClick={handleUpdateStock}
            >
              Submit
            </AppButton>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
