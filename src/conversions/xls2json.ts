import * as fs from "fs";
import XLSX from "xlsx";
import {listAvailableFiles} from "../utils/available-files";
import {select} from "@inquirer/prompts";
import {parseFileName} from "../utils/file-name-parser";

export const xls2json = async () => {
    const files = listAvailableFiles(['xls', "xlsx"])

    if (files.length === 0) {
        return
    }

    const selectable = await select({
        message: 'Selected file',
        choices: files
    })

    const newFileName = parseFileName(selectable)

    const workbook = XLSX.readFile(selectable)

    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    if (rows.length < 2) {
        console.error('The Excel file does not contain enough data.');
        process.exit(1);
    }

    const headers = rows[0];
    const data = rows.slice(1);

    if (!Array.isArray(headers)) {
        console.error('Invalid headers format.');
        process.exit(1);
    }

    const jsonData = data.map(row => {
        const rowObj: { [key: string]: unknown } = {};

        if (Array.isArray(row)) {
            headers.forEach((header, index) => {
                if (typeof header === 'string') {
                    rowObj[header] = row[index];
                }
            });
        }

        return rowObj;
    });

    fs.writeFileSync(newFileName, JSON.stringify(jsonData, null, 2), 'utf8');
}


