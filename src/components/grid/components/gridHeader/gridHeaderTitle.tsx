import React from "react";

interface Props {
  title?: string;
}

const GridHeaderTitle: React.FC<Props> = ({ title }) => {
  if (!title) return null;
  
  return (
    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
      <h2 className="text-lg font-semibold text-gray-800 text-right">{title}</h2>
    </div>
  );
};

export default GridHeaderTitle;
