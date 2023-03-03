import React from 'react';
import './style.scss';

interface TileProps {
  children?: React.ReactNode;
}

export default ({ children }: TileProps) => {
  return (
    <div className="business-analysis-tile">
      {children}
    </div>
  );
};