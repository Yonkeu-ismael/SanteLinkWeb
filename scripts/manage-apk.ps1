# Script principal pour gérer l'APK Android
# Usage: .\scripts\manage-apk.ps1 [build|install|build-and-install|clean|info]

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("build", "install", "build-and-install", "clean", "info")]
    [string]$Action,
    
    [Parameter(Mandatory=$false)]
    [ValidateSet("debug", "release")]
    [string]$BuildType = "debug"
)

function Show-Info {
    Write-Host "📱 Gestionnaire d'APK SanteLink" -ForegroundColor Cyan
    Write-Host "=================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📋 Actions disponibles:" -ForegroundColor Yellow
    Write-Host "  build              - Générer l'APK" -ForegroundColor White
    Write-Host "  install            - Installer l'APK sur l'appareil" -ForegroundColor White
    Write-Host "  build-and-install  - Générer et installer l'APK" -ForegroundColor White
    Write-Host "  clean              - Nettoyer les builds" -ForegroundColor White
    Write-Host "  info               - Afficher les informations" -ForegroundColor White
    Write-Host ""
    Write-Host "🔧 Options:" -ForegroundColor Yellow
    Write-Host "  -BuildType debug|release" -ForegroundColor White
    Write-Host ""
    Write-Host "📝 Exemples:" -ForegroundColor Yellow
    Write-Host "  .\scripts\manage-apk.ps1 build" -ForegroundColor White
    Write-Host "  .\scripts\manage-apk.ps1 build -BuildType release" -ForegroundColor White
    Write-Host "  .\scripts\manage-apk.ps1 build-and-install" -ForegroundColor White
    Write-Host ""
}

function Show-ProjectInfo {
    Write-Host "📊 Informations du projet:" -ForegroundColor Cyan
    Write-Host "==========================" -ForegroundColor Cyan
    
    # Informations du package.json
    $packageJson = Get-Content "package.json" | ConvertFrom-Json
    Write-Host "📦 Nom: $($packageJson.name)" -ForegroundColor White
    Write-Host "📋 Version: $($packageJson.version)" -ForegroundColor White
    
    # Informations Capacitor
    $capacitorConfig = Get-Content "capacitor.config.ts" | Select-String "appId|appName|webDir"
    Write-Host "🔧 Configuration Capacitor:" -ForegroundColor White
    foreach ($line in $capacitorConfig) {
        Write-Host "   $line" -ForegroundColor Gray
    }
    
    # Vérifier les APK existants
    Write-Host "📱 APK disponibles:" -ForegroundColor White
    $apkFiles = Get-ChildItem "SanteLink-*.apk" -ErrorAction SilentlyContinue
    if ($apkFiles) {
        foreach ($apk in $apkFiles) {
            $size = [math]::Round($apk.Length / 1MB, 2)
            $date = $apk.LastWriteTime.ToString("dd/MM/yyyy HH:mm")
            Write-Host "   📄 $($apk.Name) ($size MB) - $date" -ForegroundColor Green
        }
    } else {
        Write-Host "   ❌ Aucun APK trouvé" -ForegroundColor Red
    }
    
    # Vérifier les appareils connectés
    try {
        $devices = adb devices 2>$null
        $connectedDevices = ($devices | Select-String "device$").Count
        Write-Host "📱 Appareils connectés: $connectedDevices" -ForegroundColor White
    } catch {
        Write-Host "📱 ADB non disponible" -ForegroundColor Yellow
    }
}

function Clean-Builds {
    Write-Host "🧹 Nettoyage des builds..." -ForegroundColor Yellow
    
    # Nettoyer le build web
    if (Test-Path "dist") {
        Remove-Item "dist" -Recurse -Force
        Write-Host "✅ Dossier dist supprimé" -ForegroundColor Green
    }
    
    # Nettoyer les APK
    $apkFiles = Get-ChildItem "SanteLink-*.apk" -ErrorAction SilentlyContinue
    if ($apkFiles) {
        Remove-Item $apkFiles -Force
        Write-Host "✅ APK supprimés" -ForegroundColor Green
    }
    
    # Nettoyer le build Android
    if (Test-Path "android") {
        Set-Location android
        if (Test-Path "gradlew.bat") {
            .\gradlew.bat clean 2>$null
        } else {
            .\gradlew clean 2>$null
        }
        Set-Location ..
        Write-Host "✅ Build Android nettoyé" -ForegroundColor Green
    }
    
    Write-Host "🎉 Nettoyage terminé!" -ForegroundColor Green
}

# Script principal
switch ($Action) {
    "info" {
        Show-Info
        Show-ProjectInfo
    }
    "build" {
        Write-Host "🚀 Génération de l'APK ($BuildType)..." -ForegroundColor Green
        & ".\scripts\build-apk.ps1" $BuildType
    }
    "install" {
        Write-Host "📱 Installation de l'APK ($BuildType)..." -ForegroundColor Green
        & ".\scripts\install-apk.ps1" $BuildType
    }
    "build-and-install" {
        Write-Host "🚀 Génération et installation de l'APK ($BuildType)..." -ForegroundColor Green
        & ".\scripts\build-apk.ps1" $BuildType
        if ($LASTEXITCODE -eq 0) {
            & ".\scripts\install-apk.ps1" $BuildType
        }
    }
    "clean" {
        Clean-Builds
    }
    default {
        Show-Info
    }
}
