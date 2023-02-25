import React, { type HTMLProps } from 'react';
import cx from 'clsx';
import { FieldValues, UseFormRegister } from 'react-hook-form';

type CheckboxProps = HTMLProps<HTMLInputElement> & {
  label?: string;
  name: string;
  errors?: any;
  register: UseFormRegister<FieldValues>;
  validation?: any;
};

export const Checkbox = ({
  id,
  name,
  register,
  validation,
  errors,
  label,
  ...props
}: CheckboxProps) => {
  const hasError = errors && !!errors?.errors?.[name];

  return (
    <div className="flex items-center">
      <div className="flex h-5 items-center">
        <input
          id={id}
          aria-describedby={id}
          type="checkbox"
          className={cx(
            'text-light-violet focus:ring-light-violet h-5 w-5 rounded border-0',
            { 'border-2 border-solid border-rose-400': hasError }
          )}
          {...register(name, validation)}
          {...props}
        />
      </div>
      <div className="ml-3">
        <label htmlFor={id} className="text-base">
          {label}
        </label>
      </div>
    </div>
  );
};
