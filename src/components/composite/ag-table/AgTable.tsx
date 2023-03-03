import React, { useCallback, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './style.scss';
import {
    ColDef,
    GridReadyEvent,
} from 'ag-grid-community';

interface AgTableDataProps { }
interface AgTableProps {
    data: any[],
    columns: ColDef[]
}

const data = [{
    val: 1
}];

export default (agTableProps: AgTableProps) => {
    const { data, columns } = agTableProps;
    const gridRef = useRef<AgGridReact<AgTableDataProps>>(null);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
    const [rowData, setRowData] = useState<AgTableDataProps[]>(data);
    const [columnDefs, setColumnDefs] = useState<ColDef[]>(columns);
    const defaultColDef = useMemo<ColDef>(() => {
        return {
            resizable: true,
        };
    }, []);

    return (
        <div className="composite-ag-table">
            <div style={gridStyle} className="ag-theme-alpine">
                <AgGridReact<AgTableDataProps>
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                ></AgGridReact>
            </div>
        </div>
    );
};