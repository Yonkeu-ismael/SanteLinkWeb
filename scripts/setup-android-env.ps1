# Script pour configurer l'environnement Android (sans droits administrateur)
# Usage: .\scripts\setup-android-env.ps1

Write-Host "🔧 Configuration de l'environnement Android..." -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green

# Configuration des chemins
$androidHome = "E:\Android\SDK"
$platformToolsPath = "$androidHome\platform-tools"

# Vérifier que les chemins existent
if (-not (Test-Path $androidHome)) {
    Write-Host "❌ Erreur: Android SDK non trouvé dans $androidHome" -ForegroundColor Red
    exit 1
}

if (-not (Test-Path $platformToolsPath)) {
    Write-Host "❌ Erreur: Platform Tools non trouvé dans $platformToolsPath" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Android SDK trouvé: $androidHome" -ForegroundColor Green
Write-Host "✅ Platform Tools trouvé: $platformToolsPath" -ForegroundColor Green

# Ajouter au PATH de la session actuelle
$currentPath = $env:PATH
if ($currentPath -notlike "*$platformToolsPath*") {
    $env:PATH = "$platformToolsPath;$currentPath"
    Write-Host "✅ Platform Tools ajouté au PATH de la session" -ForegroundColor Green
} else {
    Write-Host "ℹ️  Platform Tools déjà dans le PATH" -ForegroundColor Cyan
}

# Configurer ANDROID_HOME pour la session
$env:ANDROID_HOME = $androidHome
Write-Host "✅ ANDROID_HOME configuré: $androidHome" -ForegroundColor Green

# Vérifier Java
Write-Host "`n☕ Vérification de Java..." -ForegroundColor Yellow
if (Get-Command java -ErrorAction SilentlyContinue) {
    $javaVersion = java -version 2>&1 | Select-String "version"
    Write-Host "✅ Java trouvé: $javaVersion" -ForegroundColor Green
} else {
    Write-Host "❌ Java non trouvé dans le PATH" -ForegroundColor Red
    Write-Host "💡 Installez Java JDK 8 ou 11 et ajoutez-le au PATH" -ForegroundColor Yellow
}

# Vérifier ADB
Write-Host "`n📱 Vérification d'ADB..." -ForegroundColor Yellow
try {
    $adbVersion = adb version 2>&1 | Select-String "Version"
    Write-Host "✅ ADB fonctionne: $adbVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Erreur avec ADB: $($_.Exception.Message)" -ForegroundColor Red
}

# Vérifier les appareils connectés
Write-Host "`n📱 Vérification des appareils..." -ForegroundColor Yellow
try {
    $devices = adb devices 2>&1
    $connectedDevices = ($devices | Select-String "device$").Count
    
    if ($connectedDevices -gt 0) {
        Write-Host "✅ $connectedDevices appareil(s) connecté(s)" -ForegroundColor Green
        $devices | Select-String "device$" | ForEach-Object {
            Write-Host "   📱 $($_.ToString().Trim())" -ForegroundColor Cyan
        }
    } else {
        Write-Host "⚠️  Aucun appareil connecté" -ForegroundColor Yellow
        Write-Host "💡 Connectez un appareil Android via USB et activez le débogage USB" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ Erreur lors de la vérification des appareils" -ForegroundColor Red
}

Write-Host "`n🎉 Configuration terminée!" -ForegroundColor Green
Write-Host "💡 Cette configuration est valide pour cette session PowerShell uniquement" -ForegroundColor Yellow
Write-Host "🚀 Vous pouvez maintenant utiliser les commandes Android:" -ForegroundColor Cyan
Write-Host "   .\scripts\manage-apk.ps1 info" -ForegroundColor White
Write-Host "   .\scripts\manage-apk.ps1 build" -ForegroundColor White
