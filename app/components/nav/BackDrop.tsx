import React from "react";

interface BackDropProps {
  onClick: () => void;
}

const BackDrop: React.FC<BackDropProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className=" bg-slate-200 z-20 opacity-50 w-screen h-screen top-0 fixed left-0"
    ></div>
  );
};

export default BackDrop;
