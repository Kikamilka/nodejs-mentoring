import * as fs from 'fs';
import csv from "csvtojson";
import { pipeline } from 'stream';

const filePath = 'src/task1/csv/nodejs-hw1-ex1.csv';
const outputFilePath = 'src/task1/csv/result-json.json';

pipeline(
    fs.createReadStream(filePath),
    csv(),
    fs.createWriteStream(outputFilePath),
    (err) => {
        if (err) {
            console.error('Pipeline failed.', err);
        } else {
            console.log('Pipeline succeeded.\nYou can find output file \"result-json.json\" in directory \"task1\\cvs\" /');
        }
    }
);
