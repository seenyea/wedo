import React from "react";

interface EmptyPanelProps {
  children?: any
}

export default (emptyPanelProps: EmptyPanelProps) => {
  const { children } = emptyPanelProps;
  return <div className="composite-empty-panel">
    {children ? children : `没有数据`}
  </div>

}