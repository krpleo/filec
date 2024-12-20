import fs from "fs";
import * as path from "node:path";

type FileTypes = 'xls' | 'xlsx';

interface FileOption {
    name: string;
    value: string;
}

export const listAvailableFiles = (types: FileTypes[]) => {
    const currentDir = process.cwd();
    let available: FileOption[] = [];

    try {
        const files = fs.readdirSync(currentDir);
        const usableFiles = files.filter(file => {
            const extension = file.split('.').pop();
            return types.includes(extension as FileTypes);
        });

        if (usableFiles.length === 0) {
            console.error(`No file types matching [${types.map(type => `.${type}`).join(' | ')}] found in this directory.`);
            return []
        }

        available = usableFiles.map(file => ({name: file, value: path.join(currentDir, file)}));

    } catch (error) {
        console.error(error);
        return []
    }
    return available;
}
