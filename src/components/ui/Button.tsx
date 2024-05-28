import React from "react";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {}

function Button({ children, onClick, ...props }: ButtonProps) {
  return (
    <button
      type={"button"}
      className={
        "text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-4 text-center disabled:bg-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      }
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
