export interface DataViewItemPropertyDescription{
    desc: string
}

export interface DataViewItemProperty{
    id: string,
    name: string,
    description: string,
    type: string,
    isNumber?: boolean,
    key?: string,
    isSelected?: boolean
}

export interface DataViewItem {
    id: string,
    name: string,
    description: string,
    type: string,
    properties: DataViewItemProperty[]
}

