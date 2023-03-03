import React, { useCallback, useMemo, useRef, useState } from 'react';
import AgGridReact from '@src/components/composite/ag-table/AgTable';
import {
  ColDef,
} from 'ag-grid-community';

const data = [{
    val: 1
}];

const columns: ColDef[] = [
    {
      headerName: '#',
      colId: 'rowNum',
      valueGetter: 'node.id',
      width: 80,
      pinned: 'left',
      resizable: false
    },
    { field: 'val', resizable: false},
  ]

export default () => {
  return (
    <div style={{height: 300}}>
      <div className="columns is-vcentered">
        <div className="column is-8">
            <AgGridReact data={data} columns={columns} />
        </div>
        <div className="column">
            <p className="bd-notification is-primary">Second column with more content. This is so you can see the vertical alignment.</p>
        </div>
      </div>
    </div>
  );
};