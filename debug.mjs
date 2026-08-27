import * as path from 'path';
import * as XLSX from 'xlsx';

export class ExcelReader {
    static read(fileName, sheetName = 'SauceDemoTestData.xlsx') {
        let filePath = path.join(process.cwd(), 'testdata', fileName);
        let workBook = XLSX.readFile(filePath);
        let workSheet = workBook.Sheets[sheetName];
        if (!workSheet) {
            throw new Error('sheet not found');
        }
        return XLSX.utils.sheet_to_json(workSheet, { defval: '', raw: false });
    }

    static getRowByTestCaseId(fileName, sheetName, testCaseID) {
        let rows = this.read(fileName, sheetName);
        return rows.find((row) => {
            return String(row.TestCaseID ?? '').trim() === testCaseID.trim()
        });
    }

    static getCellValue(fileName, sheetName, testCaseID, columnName) {
        let row = this.getRowByTestCaseId(fileName, sheetName, testCaseID);
        console.log('DEBUG: row =', row);
        console.log('DEBUG: row[columnName] =', row?.[columnName]);
        let result = String(row?.[columnName] ?? '').trim();
        console.log('DEBUG: result =', result, 'type =', typeof result);
        return result;
    }
}

const result = ExcelReader.getCellValue('SauceDemoTestData.xlsx', 'Products', 'PROD-01', 'ProductsCount');
console.log('Final result:', result);
console.log('Number(result):', Number(result));