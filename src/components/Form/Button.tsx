import React, { type HTMLProps } from 'react';

type ButtonProps = HTMLProps<HTMLButtonElement> & {
  children: React.ReactNode;
  type?: 'submit' | 'button' | 'reset';
};

export const Button = ({
  children,
  type = 'button',
  ...props
}: ButtonProps) => {
  return (
    <>
      <button
        className="rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        type={type}
        {...props}
      >
        {children}
      </button>
    </>
  );
};
