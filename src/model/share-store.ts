const shareDataRoot: any = {};
const actionLists: any = {};

export const addShareStore = (module: string, value: any): any => {
    console.log('addShareStore', module, value);
    if(shareDataRoot[module]){
        console.warn(`module ${module} is duplicated`);
        return;
    }

    shareDataRoot[module] = value;
    return shareDataRoot;
}

export const getModuleData = (module: string): any => {
    console.log('getModuleData', module, shareDataRoot);
    return shareDataRoot[module] ? shareDataRoot[module] : null;
}

export const bindUpdateToStore = (module: string, props: string, fn: any): void => {
    actionLists[module] = actionLists[module] || {};
    const actionList = actionLists[module];
    const fns = actionList[props] || [];
    fns.push(fn);
    actionList[props] = fns;
    console.log('bindUpdateToStore', actionLists);
}

export const callUpdateToStroe = (module: string, props: string, data: any): void => {
    actionLists[module] = actionLists[module] || {};
    const actionList = actionLists[module];
    const fns = actionList[props] || [];
    console.log('callUpdateToStroe', actionLists, fns);
    fns.forEach((fn: any) => {
        fn(data)
    });
}