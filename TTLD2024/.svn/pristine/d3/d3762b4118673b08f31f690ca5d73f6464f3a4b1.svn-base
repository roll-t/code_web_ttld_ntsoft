using GemBox.Spreadsheet;
using Spire.Doc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using Syncfusion.DocIO.DLS;
using Syncfusion.DocToPDFConverter;
using Syncfusion.Pdf;
using Syncfusion.OfficeChartToImageConverter;

namespace TTLD2024.Class
{
    public static class OfficeConvert
    {
        /// <summary>
        /// Hàm chuyển đổi file docx sang pdf
        /// </summary>
        /// <param name="path"></param>
        //public static bool DocxToPDF(string path)
        //{
        //    try
        //    {
        //        string fileDocx = HttpContext.Current.Server.MapPath(path);
        //        string filePDF = fileDocx.Replace(".docx", ".pdf").Replace(".DOCX", ".pdf");

        //        // Nếu file Pdf đã tồn tại thì xóa đi.
        //        if (File.Exists(filePDF)) { File.Delete(filePDF); }
        //        using (Document document = new Document())
        //        {

        //            document.LoadFromFile(fileDocx, Spire.Doc.FileFormat.Docx);
        //            ToPdfParameterList toPdf = new ToPdfParameterList();
        //            document.SaveToFile(filePDF, toPdf);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return false;
        //    }
        //    return true;
        //}
        public static bool DocxToPDF(string path)
        {
            /*
            5 UnlockKeys
            @31382e342e30FOoltCski20McPzO5WyzuWcP/5VuIWOBUL5A8GW53Ao=
            @31382e342e30E51YtpIBDNMaLX45vPhZSLXDhv+dyyEAR1p+nbw8U2M=
            @31382e342e30fYrLNvPga3RGQYJkahn+tStR+wkqYm3GO2uBG7rOusY=
            @31382e342e30GijR87wmkZ4jLGx68pGA59Qfvc0Bssz9M12sSTmO6ns=
            @31382e342e30SCy7Hf7+DM8+MOtWzsNnY0HMSdqas4rReRPaBAaXAq4=
            5 LicenseKeys
            MTQwNUAzMTM4MmUzNDJlMzBGT29sdENza2kyME1jUHpPNVd5enVXY1AvNVZ1SVdPQlVMNUE4R1c1M0FvPQ==
            NDgzNUAzMTM4MmUzNDJlMzBFNTFZdHBJQkROTWFMWDQ1dlBoWlNMWERoditkeXlFQVIxcCtuYnc4VTJNPQ==
            NDU1N0AzMTM4MmUzNDJlMzBmWXJMTnZQZ2EzUkdRWUprYWhuK3RTdFIrd2txWW0zR08ydUJHN3JPdXNZPQ==
            NDQ4NkAzMTM4MmUzNDJlMzBHaWpSODd3bWtaNGpMR3g2OHBHQTU5UWZ2YzBCc3N6OU0xMnNTVG1PNm5zPQ==
            NTYwN0AzMTM4MmUzNDJlMzBTQ3k3SGY3K0RNOCtNT3RXenNOblkwSE1TZHFhczRyUmVSUGFCQWFYQXE0PQ==
             */
            //Convert the input word document to a PDF file
            #region Convert Doc to PDF
            string fileDocx = HttpContext.Current.Server.MapPath("~" + path);
            string filePdf = fileDocx.Replace(".docx", ".pdf").Replace(".DOCX", ".pdf");
            Stream readFile = File.OpenRead(fileDocx);
            try
            {
                Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense("MTQwNUAzMTM4MmUzNDJlMzBGT29sdENza2kyME1jUHpPNVd5enVXY1AvNVZ1SVdPQlVMNUE4R1c1M0FvPQ==");
                WordDocument wordDoc = null;
                string ext = Path.GetExtension(fileDocx);
                if (ext == ".doc")
                    wordDoc = new WordDocument(readFile, Syncfusion.DocIO.FormatType.Doc);
                else if (ext == ".docx")
                    wordDoc = new WordDocument(readFile, Syncfusion.DocIO.FormatType.Docx);

                //Initialize chart to image converter for converting charts in word to pdf conversion
                wordDoc.ChartToImageConverter = new ChartToImageConverter();
                wordDoc.ChartToImageConverter.ScalingMode = Syncfusion.OfficeChart.ScalingMode.Normal;

                DocToPDFConverter converter = new DocToPDFConverter();
                //Enable Direct PDF rendering mode for faster conversion.
                //converter.Settings.EnableFastRendering = chkBox1.Checked;
                //converter.Settings.AutoTag = CheckBox1.Checked;
                //converter.Settings.PreserveFormFields = CheckBox2.Checked;
                //converter.Settings.EmbedCompleteFonts = CheckBox4.Checked;
                //converter.Settings.EmbedFonts = CheckBox5.Checked;
                //converter.Settings.ExportBookmarks = CheckBox3.Checked ? Syncfusion.DocIO.ExportBookmarkType.Headings :
                //                                    Syncfusion.DocIO.ExportBookmarkType.Bookmarks;
                //if (CheckBox6.Checked)
                //    wordDoc.RevisionOptions.ShowMarkup = RevisionType.Deletions | RevisionType.Formatting | RevisionType.Insertions;
                //Convert word document into PDF document
                PdfDocument pdfDoc = converter.ConvertToPDF(wordDoc);

                pdfDoc.Save(filePdf);

                readFile.Close();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return false;
            #endregion Convert Doc to PDF
        }
        /// <summary>
        /// Hàm chuyển đổi file docx sang pdf
        /// </summary>
        /// <param name="path"></param>
        public static bool XlsxToPDF(string path)
        {
            try
            {
                string fileXlsx = HttpContext.Current.Server.MapPath("~" + path);
                string filePDF = fileXlsx.Replace(".xlsx", ".pdf").Replace(".xlsx", ".pdf");

                // Nếu file Pdf đã tồn tại thì xóa đi.
                if (File.Exists(filePDF)) { File.Delete(filePDF); }
                GemBox.Spreadsheet.SpreadsheetInfo.SetLicense("ETZX-IT28-33Q6-1HA2");
                ExcelFile workbook = ExcelFile.Load(fileXlsx);
                ExcelWorksheet worksheet = workbook.Worksheets.ActiveWorksheet;
                worksheet.PrintOptions.FitToPage = true;
                worksheet.PrintOptions.LeftMargin =
                worksheet.PrintOptions.RightMargin =
                worksheet.PrintOptions.TopMargin =
                worksheet.PrintOptions.BottomMargin = 0.393700787;
                worksheet.PrintOptions.FitWorksheetWidthToPages = 1;
                worksheet.PrintOptions.HorizontalCentered = true;
                worksheet.PrintOptions.FitWorksheetHeightToPages = 0;
                worksheet.PrintOptions.PaperType = PaperType.A4;
                workbook.Save(filePDF);
            }
            catch (Exception ex)
            {
                return false;
            }
            return true;
        }
        public static bool XlsxToPDF2(string path)
        {
            try
            {
                string fileXlsx = path;
                string filePDF = fileXlsx.Replace(".xlsx", ".pdf").Replace(".xlsx", ".pdf");

                // Nếu file Pdf đã tồn tại thì xóa đi.
                if (File.Exists(filePDF)) { File.Delete(filePDF); }
                GemBox.Spreadsheet.SpreadsheetInfo.SetLicense("ETZX-IT28-33Q6-1HA2");
                ExcelFile workbook = ExcelFile.Load(fileXlsx);
                ExcelWorksheet worksheet = workbook.Worksheets.ActiveWorksheet;
                worksheet.PrintOptions.FitToPage = true;
                worksheet.PrintOptions.LeftMargin =
                worksheet.PrintOptions.RightMargin =
                worksheet.PrintOptions.TopMargin =
                worksheet.PrintOptions.BottomMargin = 0.393700787;
                worksheet.PrintOptions.FitWorksheetWidthToPages = 1;
                worksheet.PrintOptions.HorizontalCentered = true;
                worksheet.PrintOptions.FitWorksheetHeightToPages = 0;
                worksheet.PrintOptions.PaperType = PaperType.A4;
                workbook.Save(filePDF);
            }
            catch (Exception ex)
            {
                return false;
            }
            return true;
        }
        /// <summary>
        /// Hàm chuyển đổi file docx sang pdf
        /// </summary>
        /// <param name="path"></param>
        public static string XlsxToHTML(string path)
        {
            try
            {
                string fileXlsx = HttpContext.Current.Server.MapPath(path);
                GemBox.Spreadsheet.SpreadsheetInfo.SetLicense("ETZX-IT28-33Q6-1HA2");

                if (!fileXlsx.Contains(".xlsx") && fileXlsx.Contains(".xls"))
                {
                    ExcelFile.Load(fileXlsx).Save(fileXlsx.Replace(".xls", ".xlsx"));
                    fileXlsx = fileXlsx.Replace(".xls", ".xlsx");
                }
                string fileHTML = fileXlsx.Replace(".xlsx", ".html").Replace(".xls", ".html");
                // Nếu file Pdf đã tồn tại thì xóa đi.
                if (File.Exists(fileHTML)) { File.Delete(fileHTML); }
                ExcelFile workbook = ExcelFile.Load(fileXlsx);
                ExcelWorksheet worksheet = workbook.Worksheets.ActiveWorksheet;  
                var options = new HtmlSaveOptions()
                {
                    HtmlType = HtmlType.HtmlTable,
                    SelectionType = SelectionType.ActiveSheet
                };
                workbook.Save(fileHTML, options);
                return path.Replace(".xlsx", ".html").Replace(".xls", ".html").Replace("~", "");
            }
            catch (Exception ex)
            {
                return "";    
            }    
        }
        public static string XlsToXlsx(string path)
        {
            try
            {
                string fileXlsx = HttpContext.Current.Server.MapPath(path);
                GemBox.Spreadsheet.SpreadsheetInfo.SetLicense("ETZX-IT28-33Q6-1HA2");

                if (fileXlsx.Contains(".xls") && !fileXlsx.Contains(".xlsx"))
                {
                    if (File.Exists(fileXlsx.Replace(".xls", ".xlsx"))) { File.Delete(fileXlsx.Replace(".xls", ".xlsx")); }
                    ExcelFile.Load(fileXlsx).Save(fileXlsx.Replace(".xls", ".xlsx"));
                    fileXlsx = fileXlsx.Replace(".xls", ".xlsx");
                    
                    //ExcelFile workbook = ExcelFile.Load(fileXlsx);
                    //ExcelWorksheet worksheet = workbook.Worksheets.ActiveWorksheet;
                    //workbook.Save(fileXlsx);
                    return fileXlsx;
                }
                else
                {
                    return fileXlsx;
                }    
             
            }
            catch (Exception ex)
            {
                return "";
            }
        }
    }
}