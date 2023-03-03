import React, { useCallback, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {
    ColDef,
    GridReadyEvent,
} from 'ag-grid-community';

import { DataViewItem } from '@src/model/portal/model';
import { getDataViewItems } from '@src/model/portal/api';

function TotalValueRenderer(props: any) {
    console.log('TotalValueRenderer => ', props);
    const cellValue = props.value ? props.value : props.valueFormatted;

    const buttonClicked = (e: React.MouseEvent) => {
        e.preventDefault();
        alert(`${cellValue} medals won!`)
    }

    return (
        <a onClick={buttonClicked} href="#">属性共{cellValue.length}条</a>
    );
}

const TypeMaps = {

};

function TypeValueRenderer(props: any) {
    const cellValue = props.valueFormatted ? props.valueFormatted : props.value;

    return <>
        <span className="tag is-primary">{cellValue}</span>
        <span className="tag is-link">{cellValue}</span>
        <span className="tag is-success">{cellValue}</span>
    </>
}


function ActionColumnRender(props: any) {
    const cellValue = props.valueFormatted ? props.valueFormatted : props.value;

    const editButton = (e: React.MouseEvent) => {
        e.preventDefault();
        alert(`${cellValue} 编辑`)
    }

    const analysisButton = (e: React.MouseEvent) => {
        e.preventDefault();
        alert(`${cellValue} 分析`)
    }
    return <p className="panel-tabs">
        <a onClick={editButton} href="#">编辑</a>
        <a onClick={analysisButton} href="#">分析</a>
    </p>
}

export default () => {
    const gridRef = useRef<AgGridReact<DataViewItem>>(null);
    const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [rowData, setRowData] = useState<DataViewItem[]>();
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        {
            field: 'name',
            headerName: '数据名称',
            filter: 'agTextColumnFilter',
            filterParams: {
                buttons: ['reset', 'apply'],
            },
            pinned: 'left'
        },
        {
            field: 'description',
            headerName: '数据描述',
            filter: 'agNumberColumnFilter',
            filterParams: {
                buttons: ['apply', 'reset'],
                closeOnApply: true,
            },
        },
        {
            field: 'type',
            headerName: '数据类型',
            filter: 'agTextColumnFilter',
            filterParams: {
                buttons: ['clear', 'apply'],
            },
            cellRenderer: TypeValueRenderer
        },
        {
            field: 'properties',
            headerName: '数据属性',
            filter: 'agNumberColumnFilter',
            filterParams: {
                buttons: ['apply', 'cancel'],
                closeOnApply: true,
            },
            cellRenderer: TotalValueRenderer
        },
        { field: 'id', headerName: '操作', pinned: 'right', cellRenderer: ActionColumnRender },
    ]);
    const defaultColDef = useMemo<ColDef>(() => {
        return {
            flex: 1,
            minWidth: 150,
            filter: true,
        };
    }, []);

    const onGridReady = useCallback((params: GridReadyEvent) => {
        const data: DataViewItem[] = getDataViewItems();
        setRowData(data)
    }, []);

    return (
        <div style={containerStyle}>
            <div style={gridStyle} className="ag-theme-alpine">
                <AgGridReact<DataViewItem>
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    onGridReady={onGridReady}
                ></AgGridReact>
            </div>
        </div>
    );
};