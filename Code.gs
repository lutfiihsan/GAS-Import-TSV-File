function importFromTSV() {
    var tsvFile = DriveApp.getFilesByName('PET Internal - Sheet1.tsv').next().getBlob().getDataAsString();
    var delim = ",";
    if (tsvFile.indexOf("\t") != -1) delim = "\t";
    var tsvData = Utilities.parsetsv(tsvFile, delim);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName('Sheet1');
    if (sheet === null) {
      ss.insertSheet(sheetName);
      sheet = ss.getSheetByName(sheetName);
    }
    sheet.clear();
    var numRows = tsvData.length;
    var numCols = tsvData[0].length; // assume all rows are same width
    // Make a single call to spreadsheet API to write values to sheet.
    sheet.getRange(1, 1, numRows, numCols).setValues( tsvData );
}