'use strict';
const excelToJson = require('convert-excel-to-json');
 
const result = excelToJson({
    sourceFile: 't.xlsx',
    columnToKey: {
        '*': '{{columnHeader}}'
    }
});

console.log(Object.values(result))