const fs = require('fs');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const excelToJson = require('convert-excel-to-json');

const argsOptions = {
    'source': {
        alias: 's',
        description: 'Source file (supported: xlsx, xls, ods)',
        demandOption: true,
    },
    'target': {
        alias: 't',
        description: 'Target directory',
        demandOption: true,
        default: 'dist/'
    },
    'dirs': {
        alias: 'd',
        description: 'Create directory every files',
        choices: ['true', 'false'],
        demandOption: true,
        default: 'true'
    },
    'header': {
        alias: 'h',
        description: 'The source incluse is header',
        choices: ['true', 'false'],
        demandOption: true,
        default: 'true'
    },
    'addheaderkey': {
        alias: 'a',
        description: 'Add header key in content',
        choices: ['true', 'false'],
        demandOption: true,
        default: 'true'
    },
    'join': {
        alias: 'j',
        description: 'The target file content line and header separator',
        demandOption: true,
        default: '='
    }

}

const argv = yargs(hideBin(process.argv))
    .usage('Usage: $0 -t [string]')
    .option(argsOptions)
    .help()
    .argv;

const source = argv['source'];
const target = argv['target'] + (!argv['target'].endsWith("/") ? "/" : "");
const createDirs = argv['dirs'] ? argv['dirs'] === "true" : false;
const addkey = argv['addheaderkey'] ? argv['addheaderkey'] === "true" : false;
const join = argv['join'] ? argv['join'] : false;

if (!fs.existsSync(target)) {
    fs.mkdirSync(target);
}

const result = excelToJson({
    sourceFile: source,
    header:{
        rows: 1
    },
    columnToKey: {
        '*': '{{columnHeader}}'
    }
});
console.info("Excel beolvasva.")

const sheetNames = Object.keys(result);
let count = 0;
sheetNames.forEach(name => {
    let fileDir = `${target}${name}/`;

    if (!fs.existsSync(fileDir)) fs.mkdirSync(fileDir)

    result[name].forEach(data => {
        if (!data.name) {
            console.error("Hiányzó név tulajdonság!")
            return;
        }
        let filePath = fileDir; 
        if (createDirs) {
            filePath = `${fileDir}${data.name}/`;
        }

        if (!fs.existsSync(filePath)) fs.mkdirSync(filePath);

        const name = data.name + (data.extension?`.${data.extension}`: "");
        const writedData = Object.keys(data)
            .filter(key => key !== "name" && key!=="extension" )
            .map(key => `${addkey?key+join:""}${data[key]}`);
        fs.writeFileSync(`${filePath}${name}`,  writedData.join("\n"));
        count++;
    })
});

console.log(`Kész. Létrehozva ${sheetNames.length}db könyvtár (${sheetNames.join(", ")}) benne ${count}db állomány.`)

