'use client';

import { AppButton } from '@/components/button/Button';
import { deleteProduct } from '@/data/product/api';
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
import { Trash2 } from 'lucide-react';
import styles from './styles.module.css';
import { Dispatch, SetStateAction, useState } from 'react';
import { toast } from 'sonner';

interface DeleteDialogButtonProps {
  id: string;
  setToggleRefetch: Dispatch<SetStateAction<boolean>>;
}
export const DeleteDialogButton = ({
  id,
  setToggleRefetch
}: DeleteDialogButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { mutate, isLoading } = useMutation({
    fn: deleteProduct
  });
  const handleDelete = () => {
    setIsOpen(false);

    mutate(
      { id: Number(id) },
      {
        onSuccess: () => {
          toast.success('Item deleted successfully');
          setToggleRefetch((prevState) => !prevState);
        },
        onError: (err) => {
          toast.error(`Failed to delete: ${err?.message || 'Unknown error'}`);
        }
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <AppButton
          variant="outline"
          className="rounded-r rounded-l-none border-l-0"
        >
          <Trash2 className="text-red-500" />
        </AppButton>
      </DialogTrigger>
      <DialogContent
        className={`sm:max-w-[425px] ${styles['dialog-container']}`}
        color="text-navy"
      >
        <DialogHeader>
          <DialogTitle className="flex justify-center text-navy font-semibold pt-6">
            Delete !
          </DialogTitle>
          <DialogDescription className="flex justify-center text-navy">
            Are you sure want to delete?
          </DialogDescription>
        </DialogHeader>
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
              onClick={handleDelete}
            >
              Yes
            </AppButton>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
