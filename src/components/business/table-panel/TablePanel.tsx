import React from 'react'

import Table from '@src/components/composite/table/Table'

import './style.scss'

interface TablePanelProps{
    columns: any,
    data: any
}


export default (tablePanelProps: TablePanelProps) => {

    const { columns, data  } = tablePanelProps;
    return <div className="composite-table-panel">
        <div className="composite-table-panel-filter">
            filter
        </div>
        <div className="composite-table-panel-content">
            <div className="composite-table-panel-content-table-wrapper">
                <Table columns={columns} data={data} />
            </div>
        </div>
    </div>
}