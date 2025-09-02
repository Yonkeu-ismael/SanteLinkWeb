# Script PowerShell pour installer l'APK sur un appareil Android
# Usage: .\scripts\install-apk.ps1 [debug|release]

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet("debug", "release")]
    [string]$BuildType = "debug"
)

Write-Host "📱 Installation de l'APK sur l'appareil Android..." -ForegroundColor Green

# Vérifier si ADB est disponible
try {
    $adbVersion = adb version 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Erreur: ADB n'est pas installé ou n'est pas dans le PATH" -ForegroundColor Red
        Write-Host "💡 Installez Android SDK Platform Tools pour utiliser ADB" -ForegroundColor Yellow
        exit 1
    }
} catch {
    Write-Host "❌ Erreur: ADB n'est pas installé" -ForegroundColor Red
    exit 1
}

# Vérifier les appareils connectés
Write-Host "🔍 Vérification des appareils connectés..." -ForegroundColor Yellow
$devices = adb devices
$connectedDevices = ($devices | Select-String "device$").Count

if ($connectedDevices -eq 0) {
    Write-Host "❌ Aucun appareil Android connecté" -ForegroundColor Red
    Write-Host "💡 Connectez un appareil Android via USB et activez le débogage USB" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ $connectedDevices appareil(s) connecté(s)" -ForegroundColor Green

# Déterminer le chemin de l'APK
$apkPath = "SanteLink-$BuildType.apk"
if (-not (Test-Path $apkPath)) {
    Write-Host "❌ APK non trouvé: $apkPath" -ForegroundColor Red
    Write-Host "💡 Générez d'abord l'APK avec: .\scripts\build-apk.ps1 $BuildType" -ForegroundColor Yellow
    exit 1
}

# Désinstaller l'ancienne version si elle existe
Write-Host "🗑️  Désinstallation de l'ancienne version..." -ForegroundColor Yellow
adb uninstall com.santelink.app 2>$null

# Installer la nouvelle version
Write-Host "📦 Installation de la nouvelle version..." -ForegroundColor Yellow
adb install $apkPath

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ APK installé avec succès!" -ForegroundColor Green
    Write-Host "🚀 Lancement de l'application..." -ForegroundColor Yellow
    
    # Lancer l'application
    adb shell am start -n com.santelink.app/.MainActivity
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Application lancée!" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Application installée mais impossible de la lancer automatiquement" -ForegroundColor Yellow
    }
} else {
    Write-Host "❌ Erreur lors de l'installation de l'APK" -ForegroundColor Red
    exit 1
}

Write-Host "🎉 Installation terminée!" -ForegroundColor Green
