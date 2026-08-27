import * as path from 'path'

import * as XLSX from 'xlsx'

export class ExcelReader {

    static read<T>(fileName: string= 'SauceDemoTestData.xlsx', sheetName: string ): T[] {

        let filePath = path.join(process.cwd(), 'testdata', fileName)
        let workBook = XLSX.readFile(filePath)
        let workSheet = workBook.Sheets[sheetName]

        if (!workSheet) {
            throw new Error(`sheet "${sheetName}" not found in the ${fileName}`)

        }

        return XLSX.utils.sheet_to_json(workSheet, { defval: '', raw: false })
    }

    static getRowByTestCaseId<T>(fileName: string, sheetName: string, testCaseID: string): T | undefined {

        let rows = this.read<T>(fileName, sheetName)
        return rows.find((row: any) => {
            return String(row.TestCaseID ?? '').trim() === testCaseID.trim()
        })

    }

    static getCellValue<T>(fileName: string = 'SauceDemoTestData.xlsx', sheetName: string, testCaseID: string, columnName: string): any {

        let row: any = this.getRowByTestCaseId(fileName, sheetName, testCaseID)
        return String(row?.[columnName] ?? '').trim()

    }

}