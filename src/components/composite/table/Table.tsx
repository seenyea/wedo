import React from 'react'

import EmptyPanel  from '../../composite/empty-panel/EmptyPanel'

interface TableHeaderPors {
    columns: any
}

const TableHeader = (tableHeaderPors: TableHeaderPors) => {
    const { columns } = tableHeaderPors;

    if (!columns) return null;
    if(columns.length === 0) return null;

    return <thead>
        <tr>
            {columns.map((column: any) => {
                const { name, abbr } = column;
                return <th><abbr title={name}>{abbr}</abbr></th>
            })}
        </tr>
    </thead>
}

interface TableBodyProps{
    data: any,
    columns: any
}

const TableBody = (tableBodyProps: TableBodyProps) => {
    const { data, columns } = tableBodyProps;

    if (!data || !columns) return null;
    if(data.length === 0) return null;
    return  <tbody>
        {data.map((item: any, index: number) => {
            return <tr>
                {columns.map((c: any, i: number) => {
                    const { render } = columns[i];
                    return <td>{render(item, index, data)}</td>
                })}
            </tr>
        })}
    </tbody>
}


interface TableProps {
    data: any,
    columns: any,
    isBorder?: boolean
}

export default (tableProps: TableProps) => {
    const { columns, data, isBorder = false } = tableProps;
    const cls = ['table', 'is-fullwidth'];
    if(isBorder){
        cls.push('is-bordered')
    }
    return <div>
        <table className={cls.join(' ')}>
            <TableHeader columns={columns} />
            <TableBody data={data} columns={columns} />
        </table>
        {(!data || !columns || !data.length) ? <EmptyPanel /> : null}
    </div>
    

}

