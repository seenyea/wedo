import { DataViewItem } from '@src/model/portal/model';
import { getModuleData, callUpdateToStroe } from '@src/model/share-store';
import { moduleName, Lists } from '@src/pages/portal/module'

const portal: any = getModuleData(moduleName);

export const getDataViewItems = (): DataViewItem[] => {
    console.log(`getDataViewItems before`, portal);
    portal[Lists] = portal[Lists] || [];
    console.log(`getDataViewItems after`, portal);
    return portal[Lists];
}

export const updateDataViewItems = (data: any) => {
    portal[Lists].push(data);
    console.log('updateDataViewItems', portal[Lists]);
    callUpdateToStroe(moduleName, Lists, portal[Lists]);
}