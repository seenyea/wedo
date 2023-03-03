import React from 'react';
import './style.scss';

interface RecommendPanelProps {
}

export default ({ }: RecommendPanelProps) => {
  return (
    <div className="business-recommend-panel">
      <div className="box">
        <div className="tabs is-centered">
          <ul>
            <li className="is-active"><a>简单线性回归</a></li>
            <li><a>时间序列分析</a></li>
            <li><a>Logistic线性回归</a></li>
            <li><a>线性插值</a></li>
            <li><a>多项式拟合</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};