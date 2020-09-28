import * as fs from 'fs';
import csv from "csvtojson";
import { pipeline } from 'stream';
import path from 'path';

const filePath = path.resolve('src/csv/nodejs-hw1-ex1.csv');
const outputFilePath = path.resolve('src/csv/nodejs-hw1-ex2.txt');

pipeline(
    fs.createReadStream(filePath),
    csv().subscribe(csvLine => {
        delete csvLine['Amount'];
        Object.keys(csvLine).forEach(key => renameProperty(csvLine, key, key.toLowerCase()));
    }),
    fs.createWriteStream(outputFilePath),
    (err) => {
        if (err) {
            console.error('Pipeline failed.', err);
        } else {
            console.log('Pipeline succeeded.\nYou can find output file \"nodejs-hw1-ex2.txt\" in directory \"task1\\cvs\" /');
        }
    }
);

function renameProperty(csvLine: any, fromKey: string, toKey: string) {
    csvLine[toKey] = csvLine[fromKey];
    delete csvLine[fromKey];
}
