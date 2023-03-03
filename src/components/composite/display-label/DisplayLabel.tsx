import React from "react";
import './style.scss'

interface DisplayLabelProps {
  label: string,
  content: string
}

export default (displayLabelProps: DisplayLabelProps) => {
  const { label, content } = displayLabelProps;
  return <div className="composite-display-label">
    <div className="label-wrapper">
      {label}: 
    </div>
    <div className="context-wrapper">
      {content}
    </div>
  </div>

}