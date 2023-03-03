import React from "react"
import "./style.scss"

interface NavBarProps {
    onAddNew: any
}

export default (navBarProps: NavBarProps) => {
    const { onAddNew } = navBarProps;
    return (
        <nav className="navbar composite-navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item logo" href="/">
                    WeDo
                </a>

                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div className="navbar-menu">
                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <a href="#" onClick={onAddNew} className="button is-primary">
                                <strong>添加数据</strong>
                            </a>
                            <a className="button is-light">
                                联系我
                            </a>
                        </div>
                    </div>
                    <div className="navbar-item has-dropdown is-hoverable">
                        <a className="navbar-link">
                            中文
                        </a>
                        <div className="navbar-dropdown">
                            <a className="navbar-item">
                                中文
                            </a>
                            <a className="navbar-item">
                                English
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}