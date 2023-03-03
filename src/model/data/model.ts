export interface DataViewItemPropertyDescription{
    desc: string
}

export interface DataViewItemType{
    imgSrc: string,
    content: string
}

export interface DataViewItemProperty{
    id: string,
    name: string,
    description?: DataViewItemPropertyDescription,
    type?: string,
}

export interface DataItemTitle {
    main: string,
    subject: string
}

export interface DataViewItem {
    id: string,
    title: DataItemTitle,
    description: string,
    type: DataViewItemType,
    properties?: DataViewItemProperty[],
    isSelected?: boolean
}

