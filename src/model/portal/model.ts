export interface DataViewItemPropertyDescription{
    desc: string
}

export interface DataViewItemProperty{
    id: string,
    name: string,
    description: DataViewItemPropertyDescription,
    type: string,
}

export interface DataViewItem {
    id: string,
    name: string,
    description: string,
    type: string,
    properties: DataViewItemProperty[]
}

