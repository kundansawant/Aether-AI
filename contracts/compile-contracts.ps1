# PowerShell script to build and run the custom Midnight Compact compiler

$contractPath = "contracts/marketplace.compact"
$outDir = "src/lib/generated"
$imageName = "midnight-compact-compiler"
$dockerfilePath = "contracts/Dockerfile.compact"

Write-Host "--- Stage 1: Building Custom Compiler Image ---" -ForegroundColor Cyan
docker build -t $imageName -f $dockerfilePath contracts

if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to build the compiler Docker image."
    exit $LASTEXITCODE
}

Write-Host "`n--- Stage 2: Compiling Smart Contract ---" -ForegroundColor Cyan
# Ensure the output directory exists
if (!(Test-Path $outDir)) {
    New-Item -ItemType Directory -Force -Path $outDir
}

docker run --rm -v "${PWD}:/app" -w /app $imageName compile $contractPath $outDir

if ($LASTEXITCODE -ne 0) {
    Write-Error "Contract compilation failed."
    exit $LASTEXITCODE
}

Write-Host "`n[SUCCESS] Contract compiled. Findings in $outDir" -ForegroundColor Green
