
# PowerShell script to convert PDF to PNG using Windows Runtime
# This requires Windows 10/11
Add-Type -AssemblyName System.Runtime.WindowsRuntime
Add-Type -Path "C:\Windows\System32\Windows.Graphics.Pdf.dll"

function Convert-PdfToPng($PdfPath, $PngPath) {
    # Load the PDF file
    $file = Get-Item $PdfPath
    $stream = [Windows.Storage.StorageFile]::GetFileFromPathAsync($file.FullName).GetResults()
    $pdfDoc = [Windows.Graphics.Pdf.PdfDocument]::LoadFromFileAsync($stream).GetResults()
    
    # Get the first page
    $page = $pdfDoc.GetPage(0)
    
    # Create the output file
    $pngFile = New-Item -ItemType File -Path $PngPath -Force
    $outStream = [Windows.Storage.StorageFile]::GetFileFromPathAsync($pngFile.FullName).GetResults().OpenAsync([Windows.Storage.FileAccessMode]::ReadWrite).GetResults()
    
    # Options
    $options = New-Object Windows.Graphics.Pdf.PdfPageRenderOptions
    # Rendering...
    $page.RenderToStreamAsync($outStream).GetResults()
    $outStream.FlushAsync().GetResults()
    $outStream.Close()
    Write-Host "Converted $PdfPath to $PngPath"
}

# Loop through all 12
for ($i = 1; $i -le 12; $i++) {
    $pdfName = "Primrose Broucher 2026  $i.pdf"
    $pngName = "page_$i.png"
    if (Test-Path $pdfName) {
        Convert-PdfToPng -PdfPath $pdfName -PngPath $pngName
    }
}
