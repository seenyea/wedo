import React from 'react'
import './style.scss';

export default () => {
  return <nav className="panel business-portal-left-nav">
    <p className="panel-heading">
      数据列表
    </p>
    <div className="panel-block">
      <p className="control has-icons-left">
        <input className="input" type="text" placeholder="Search" />
        <span className="icon is-left">
          <i className="fas fa-search" aria-hidden="true"></i>
        </span>
      </p>
    </div>
    <div className="panel-block">
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">
            数据1
          </p>
          <button className="card-header-icon" aria-label="more options">
            <span className="icon">
              <i className="fas fa-angle-down" aria-hidden="true"></i>
            </span>
          </button>
        </header>
        <div className="card-content">
          <div className="content">
            数据1描述
          </div>
        </div>
        <footer className="card-footer">
          <a href="#" className="card-footer-item">保存</a>
          <a href="#" className="card-footer-item">编辑</a>
          <a href="#" className="card-footer-item">删除</a>
        </footer>
      </div>
    </div>
  </nav>
}