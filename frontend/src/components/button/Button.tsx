'use client';

import { ReactNode } from 'react';
import styles from './styles.module.css';
import { Spinner } from '../spinner/Spinner';
import { Button } from '@/shadcn/components/ui/button';

type AppButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'outline-destructive'
  | 'outline-primary'
  | 'default'
  | 'destructive'
  | 'ghost'
  | 'link';
type AppButtonState = 'Active' | 'Loading' | 'Disabled';
type ShadcnButtonVariant =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link'
  | null
  | undefined;

interface AppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant: AppButtonVariant;
  state?: AppButtonState;
  loadingText?: string;
}

export const AppButton = ({
  children,
  variant,
  state,
  loadingText,
  ...rest
}: AppButtonProps) => {
  let style: string = '';
  let shadcnVariant: ShadcnButtonVariant = undefined;
  if (variant == 'primary') {
    style = `${styles['btn-primary']}`;
    shadcnVariant = 'default';
  } else if (variant == 'secondary') {
    shadcnVariant = 'secondary';
  } else if (variant == 'outline') {
    shadcnVariant = 'outline';
  } else if (variant == 'default') {
    shadcnVariant = 'default';
  } else if (variant == 'destructive') {
    shadcnVariant = 'destructive';
  } else if (variant == 'ghost') {
    shadcnVariant = 'ghost';
  } else if (variant == 'link') {
    shadcnVariant = 'link';
  } else if (variant == 'outline-destructive') {
    style = `border border-red-500 hover:bg-red-500 hover:text-white`;
    shadcnVariant = 'outline';
  } else if (variant == 'outline-primary') {
    style = `border border-app_primary hover:bg-app_primary hover:text-white`;
    shadcnVariant = 'outline';
  }

  if (rest.className) {
    style += ` ${rest.className}`;
  }

  style += ` ${styles['btn-base']}`;

  if (state != undefined && state == 'Loading') {
    return (
      <Button
        {...rest}
        variant={shadcnVariant}
        className={style + ' relative'}
        disabled
      >
        <Spinner />
        {loadingText !== undefined ? loadingText : 'Loading'}
      </Button>
    );
  }

  return (
    <Button
      {...rest}
      variant={shadcnVariant}
      className={style}
      disabled={state === 'Disabled'}
    >
      {children}
    </Button>
  );
};
