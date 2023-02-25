import { type HTMLProps } from 'react';
import clsx from 'clsx';
import { OptionProps } from '@/utils/types';
import { FieldValues, UseFormRegister } from 'react-hook-form';

type SelectProps = HTMLProps<HTMLSelectElement> & {
  options: OptionProps[];
  label: string;
  errors?: any;
  name: string;
  register: UseFormRegister<FieldValues>;
  validation?: any;
  fullWidth?: boolean;
};

export const Select = ({
  label,
  name,
  options = [],
  errors,
  register,
  validation,
  fullWidth,
  ...props
}: SelectProps) => {
  const hasError = errors && !!errors?.errors?.[name];

  return (
    <div>
      {label && (
        <label htmlFor={name} className="mb-2">
          {label}
        </label>
      )}
      <select
        {...props}
        {...register(name, validation)}
        className={clsx(fullWidth && 'w-full')}
      >
        {options.map(({ name, value }) => (
          <option key={value} value={value}>
            {name}
          </option>
        ))}
      </select>
      {hasError && (
        <p className="pt-1 text-xs text-rose-400">
          {errors.errors[name].message}
        </p>
      )}
    </div>
  );
};

export default Select;
