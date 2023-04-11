interface TerminalCommand{
    type?: string,
    commadCall: any,
    orginValue: string
}

const TerminalCommandLists = {
    'import': '导入',
    'excute': '执行',
    'transform': '转化'
}

export { TerminalCommand }