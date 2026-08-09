# QART Brand Rename Script
# Run from the project root:
# powershell -ExecutionPolicy Bypass -File .\rename-to-qart.ps1

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$extensions = @("*.tsx", "*.ts", "*.css", "*.html", "*.json", "*.md")

$files = foreach ($extension in $extensions) {
    Get-ChildItem -Path $projectRoot -Recurse -File -Filter $extension |
        Where-Object {
            $_.FullName -notmatch "\\node_modules\\" -and
            $_.FullName -notmatch "\\.git\\"
        }
}

$changed = 0

foreach ($file in $files) {
    try {
        $content = Get-Content -LiteralPath $file.FullName -Raw -Encoding UTF8

        $updated = $content
        $updated = $updated -replace "SmartCart", "Qart"
        $updated = $updated -replace "SMARTCART", "QART"
        $updated = $updated -replace "smartcart", "qart"
        $updated = $updated -replace "Self-Checkout · Smart Supermarket", "Queue-free Automated Retail Transit"

        if ($updated -ne $content) {
            Set-Content -LiteralPath $file.FullName -Value $updated -Encoding UTF8 -NoNewline
            Write-Host "Updated: $($file.FullName)" -ForegroundColor Cyan
            $changed++
        }
    }
    catch {
        Write-Warning "Could not update: $($file.FullName)"
    }
}

Write-Host ""
Write-Host "QART branding update completed!" -ForegroundColor Green
Write-Host "Files changed: $changed" -ForegroundColor Green
Write-Host ""
Write-Host "Test with: npm.cmd run dev" -ForegroundColor Yellow
