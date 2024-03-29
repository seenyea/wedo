import { isNumber } from '@src/libs/utils'
import { DataViewItemProperty } from '@src/model/portal/model';
var data = [
    ['r1', 'r2', 'r3', 'r4', 'r5', 'b1', 'b2', 'NO', 'time'],
    ["05", "17", "30", "34", "35", "02", "09", "22076", "2022-07-06"],
    ["05", "10", "11", "16", "19", "01", "10", "22077", "2022-07-09"],
    ["02", "03", "18", "20", "27", "01", "02", "22078", "2022-07-11"],
    ["07", "10", "19", "26", "32", "08", "12", "22079", "2022-07-13"],
    ["10", "17", "30", "31", "34", "03", "06", "22080", "2022-07-16"],
    ["05", "10", "19", "31", "32", "09", "10", "22081", "2022-07-18"],
    ["04", "26", "27", "30", "33", "02", "09", "22082", "2022-07-20"],
    ["02", "09", "17", "26", "32", "04", "06", "22083", "2022-07-23"],
    ["03", "11", "19", "25", "27", "04", "12", "22084", "2022-07-25"],
    ["11", "16", "31", "33", "35", "06", "08", "22085", "2022-07-27"],
    ["04", "10", "21", "28", "31", "08", "11", "22086", "2022-07-30"],
    ["04", "06", "10", "24", "28", "06", "12", "22087", "2022-08-01"],
    ["01", "08", "10", "20", "35", "06", "11", "22088", "2022-08-03"],
    ["01", "20", "21", "31", "33", "03", "11", "22089", "2022-08-06"],
    ["01", "20", "24", "25", "31", "09", "12", "22090", "2022-08-08"],
    ["02", "11", "20", "22", "34", "04", "12", "22091", "2022-08-10"],
    ["01", "04", "12", "23", "29", "05", "12", "22092", "2022-08-13"],
    ["07", "11", "14", "21", "29", "07", "10", "22093", "2022-08-15"],
    ["03", "04", "07", "12", "19", "02", "05", "22094", "2022-08-17"],
    ["05", "08", "22", "25", "35", "02", "07", "22095", "2022-08-20"],
    ["16", "19", "24", "27", "33", "01", "06", "22096", "2022-08-22"],
    ["05", "13", "22", "28", "29", "05", "11", "22097", "2022-08-24"],
    ["01", "03", "06", "11", "13", "03", "11", "22098", "2022-08-27"],
    ["07", "18", "25", "27", "33", "04", "05", "22099", "2022-08-29"],
    ["10", "19", "20", "23", "31", "03", "07", "22100", "2022-08-31"],
    ["02", "04", "06", "07", "08", "03", "06", "22101", "2022-09-03"],
    ["01", "05", "14", "20", "30", "02", "04", "22102", "2022-09-05"],
    ["08", "12", "16", "21", "32", "01", "12", "22103", "2022-09-07"],
    ["03", "05", "13", "19", "25", "02", "05", "22104", "2022-09-10"],
    ["01", "08", "09", "21", "22", "01", "04", "22105", "2022-09-12"],
    ["16", "17", "21", "28", "32", "04", "07", "22106", "2022-09-14"],
    ["07", "09", "19", "28", "29", "08", "10", "22107", "2022-09-17"],
    ["04", "07", "13", "26", "28", "07", "11", "22108", "2022-09-19"],
    ["05", "09", "24", "29", "35", "05", "12", "22109", "2022-09-21"],
    ["02", "13", "16", "18", "23", "03", "06", "22110", "2022-09-24"],
    ["06", "12", "16", "19", "31", "06", "10", "22111", "2022-09-26"],
    ["04", "11", "18", "20", "26", "06", "12", "22112", "2022-09-28"],
    ["13", "15", "22", "31", "33", "05", "12", "22113", "2022-10-05"],
    ["11", "21", "24", "27", "28", "05", "10", "22114", "2022-10-08"],
    ["17", "19", "20", "23", "27", "03", "08", "22115", "2022-10-10"],
    ["01", "07", "20", "22", "31", "07", "12", "22116", "2022-10-12"],
    ["09", "12", "15", "21", "32", "02", "07", "22117", "2022-10-15"],
    ["02", "05", "15", "17", "26", "02", "08", "22118", "2022-10-17"],
    ["01", "09", "16", "25", "29", "04", "09", "22119", "2022-10-19"],
    ["11", "22", "26", "30", "33", "03", "05", "22120", "2022-10-22"],
    ["04", "15", "16", "20", "21", "04", "05", "22121", "2022-10-24"],
    ["04", "15", "17", "19", "25", "06", "12", "22122", "2022-10-26"],
    ["02", "20", "28", "29", "30", "07", "10", "22123", "2022-10-29"],
    ["02", "04", "11", "25", "30", "06", "12", "22124", "2022-10-31"],
    ["03", "07", "14", "16", "19", "01", "11", "22125", "2022-11-02"],
    ["04", "05", "08", "22", "35", "01", "03", "22126", "2022-11-05"],
    ["02", "03", "08", "09", "20", "04", "10", "22127", "2022-11-07"],
    ["10", "19", "21", "23", "35", "04", "10", "22128", "2022-11-09"],
    ["10", "17", "23", "34", "35", "01", "04", "22129", "2022-11-12"],
    ["05", "07", "15", "18", "23", "05", "10", "22130", "2022-11-14"],
    ["02", "06", "08", "10", "17", "05", "06", "22131", "2022-11-16"],
    ["02", "27", "30", "34", "35", "09", "12", "22132", "2022-11-19"],
    ["01", "02", "14", "30", "31", "06", "09", "22133", "2022-11-21"],
    ["03", "16", "23", "27", "32", "03", "06", "22134", "2022-11-23"],
    ["09", "10", "27", "31", "32", "01", "03", "22135", "2022-11-26"],
    ["01", "11", "15", "17", "33", "03", "11", "22136", "2022-11-28"],
    ["05", "06", "08", "15", "20", "07", "08", "22137", "2022-11-30"],
    ["05", "13", "16", "27", "33", "07", "12", "22138", "2022-12-03"],
    ["01", "13", "14", "22", "35", "02", "05", "22139", "2022-12-05"],
    ["05", "15", "25", "26", "29", "04", "12", "22140", "2022-12-07"],
    ["05", "06", "14", "24", "25", "02", "04", "22141", "2022-12-10"],
    ["07", "12", "14", "29", "35", "01", "11", "22142", "2022-12-12"],
    ["10", "13", "14", "27", "33", "07", "08", "22143", "2022-12-14"],
    ["03", "04", "08", "15", "21", "04", "07", "22144", "2022-12-17"],
    ["10", "20", "29", "30", "35", "06", "09", "22145", "2022-12-19"],
    ["01", "21", "23", "28", "35", "07", "09", "22146", "2022-12-21"],
    ["04", "12", "22", "28", "30", "09", "11", "22147", "2022-12-24"],
    ["04", "05", "06", "26", "27", "07", "12", "22148", "2022-12-26"],
    ["15", "19", "22", "26", "28", "02", "07", "22149", "2022-12-28"],
    ["06", "07", "26", "29", "30", "03", "12", "22150", "2022-12-31"],
    ["18", "19", "24", "27", "34", "11", "12", "23001", "2023-01-02"],
    ["11", "14", "21", "26", "27", "02", "07", "23002", "2023-01-04"],
    ["05", "06", "14", "21", "22", "02", "09", "23003", "2023-01-07"],
    ["04", "13", "15", "20", "22", "04", "08", "23004", "2023-01-09"],
    ["01", "03", "10", "20", "29", "06", "11", "23005", "2023-01-11"],
    ["02", "04", "12", "27", "35", "06", "07", "23006", "2023-01-14"],
    ["02", "03", "24", "30", "32", "01", "06", "23007", "2023-01-16"],
    ["04", "09", "17", "22", "25", "01", "05", "23008", "2023-01-18"],
    ["01", "05", "11", "15", "33", "01", "10", "23009", "2023-01-30"],
    ["05", "06", "13", "23", "26", "01", "06", "23010", "2023-02-01"],
    ["02", "07", "08", "17", "25", "01", "03", "23011", "2023-02-04"],
    ["07", "16", "17", "18", "28", "02", "03", "23012", "2023-02-06"],
    ["01", "02", "09", "23", "25", "02", "06", "23013", "2023-02-08"],
    ["03", "08", "18", "22", "24", "01", "09", "23014", "2023-02-11"],
    ["08", "16", "24", "25", "34", "08", "12", "23015", "2023-02-13"],
    ["02", "04", "12", "31", "32", "07", "11", "23016", "2023-02-15"],
    ["02", "05", "09", "22", "27", "10", "11", "23017", "2023-02-18"],
    ["04", "08", "17", "26", "30", "03", "11", "23018", "2023-02-20"],
    ["05", "08", "09", "11", "15", "06", "08", "23019", "2023-02-22"],
    ["05", "06", "23", "25", "28", "06", "09", "23020", "2023-02-25"],
    ["02", "09", "18", "23", "27", "03", "05", "23021", "2023-02-27"],
    ["07", "11", "15", "26", "28", "08", "10", "23022", "2023-03-01"],
    ["09", "21", "23", "25", "33", "03", "10", "23023", "2023-03-04"],
    ["11", "15", "24", "27", "30", "01", "10", "23024", "2023-03-06"],
    ["03", "09", "27", "30", "31", "11", "12", "23025", "2023-03-08"]
];

const _props = data.shift();
const properties: any = [];
const first = data[0];
first.forEach((d, i) => {
    const key = _props[i]
    const isNum = isNumber(d);
    const o: DataViewItemProperty = {
        isNumber: isNum,
        key,
        name: key,
        id: `${i + 1}`,
        description: key,
        type: isNum ? 'number' : 'other',
        isSelected: i === 0
    }
    properties.push(o);
})
const originData: any = [];
data.forEach(d => {
    const o: any = {};
    d.forEach((value,i) => {
        const key = _props[i];
        o[key] = value;
    })
    originData.push(o);
})

const data_dlt: any = {
    id: '2',
    type: {
        imgSrc: '/public/imgs/common/andrew-avatar.png',
        content: ''
    },
    title: {
        main: '彩票',
        subject: '大乐透',
    },
    description: '大乐透数据',
    isSelected: false,
    properties,
    originData
};

export {data_dlt};