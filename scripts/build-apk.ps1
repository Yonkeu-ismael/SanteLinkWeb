# Script PowerShell pour générer l'APK Android
# Usage: .\scripts\build-apk.ps1 [debug|release]

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet("debug", "release")]
    [string]$BuildType = "debug"
)

Write-Host "🚀 Début de la génération de l'APK Android..." -ForegroundColor Green

# Vérifier si on est dans le bon répertoire
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Erreur: Ce script doit être exécuté depuis le répertoire racine du projet" -ForegroundColor Red
    exit 1
}

# Étape 1: Build de l'application web
Write-Host "📦 Build de l'application web..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors du build de l'application web" -ForegroundColor Red
    exit 1
}

# Étape 2: Synchronisation avec Capacitor
Write-Host "🔄 Synchronisation avec Capacitor..." -ForegroundColor Yellow
npx cap sync android
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors de la synchronisation Capacitor" -ForegroundColor Red
    exit 1
}

# Étape 3: Vérifier que le dossier android existe
if (-not (Test-Path "android")) {
    Write-Host "❌ Erreur: Le dossier android n'existe pas" -ForegroundColor Red
    exit 1
}

# Étape 4: Aller dans le dossier android
Set-Location android

# Étape 5: Nettoyer les builds précédents
Write-Host "🧹 Nettoyage des builds précédents..." -ForegroundColor Yellow
if (Test-Path "gradlew.bat") {
    .\gradlew.bat clean
} else {
    Write-Host "⚠️  gradlew.bat non trouvé, tentative avec gradlew..." -ForegroundColor Yellow
    .\gradlew clean
}

# Étape 6: Générer l'APK
Write-Host "🔨 Génération de l'APK ($BuildType)..." -ForegroundColor Yellow
if ($BuildType -eq "release") {
    if (Test-Path "gradlew.bat") {
        .\gradlew.bat assembleRelease
    } else {
        .\gradlew assembleRelease
    }
    $apkPath = "app\build\outputs\apk\release\app-release.apk"
} else {
    if (Test-Path "gradlew.bat") {
        .\gradlew.bat assembleDebug
    } else {
        .\gradlew assembleDebug
    }
    $apkPath = "app\build\outputs\apk\debug\app-debug.apk"
}

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur lors de la génération de l'APK" -ForegroundColor Red
    Set-Location ..
    exit 1
}

# Étape 7: Vérifier que l'APK a été généré
if (Test-Path $apkPath) {
    $apkSize = (Get-Item $apkPath).Length / 1MB
    Write-Host "✅ APK généré avec succès!" -ForegroundColor Green
    Write-Host "📱 Fichier: $apkPath" -ForegroundColor Cyan
    Write-Host "📏 Taille: $([math]::Round($apkSize, 2)) MB" -ForegroundColor Cyan
    
    # Copier l'APK dans le répertoire racine pour faciliter l'accès
    $targetPath = "..\SanteLink-$BuildType.apk"
    Copy-Item $apkPath $targetPath
    Write-Host "📋 APK copié vers: $targetPath" -ForegroundColor Green
} else {
    Write-Host "❌ L'APK n'a pas été généré" -ForegroundColor Red
}

# Retourner au répertoire racine
Set-Location ..

Write-Host "🎉 Processus terminé!" -ForegroundColor Green
