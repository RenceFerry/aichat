import React from "react";

type BtnProps = React.ComponentProps<'button'>;


export const Button = ({children, className, ...props}:  BtnProps) => {
  return (
    <button className={ `flex items-center justify-center ${className}`} {...props}>
      {children}
    </button>
  );
}
