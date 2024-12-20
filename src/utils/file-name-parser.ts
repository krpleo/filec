import * as path from "node:path";

export const parseFileName = (filePath: string) => {
    const fileNameWithExtension = path.basename(filePath);
    const { name: fileNameWithoutExtension } = path.parse(fileNameWithExtension);



    return `${process.cwd()}/${fileNameWithoutExtension}.json`;
}
