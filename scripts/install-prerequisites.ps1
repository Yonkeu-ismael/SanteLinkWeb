# Script d'installation des prérequis pour l'APK Android
# Usage: .\scripts\install-prerequisites.ps1

Write-Host "🔧 Installation des prérequis pour l'APK Android..." -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Green

# Vérifier si on est administrateur
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")

if (-not $isAdmin) {
    Write-Host "⚠️  Ce script nécessite des droits administrateur pour installer les prérequis" -ForegroundColor Yellow
    Write-Host "💡 Relancez PowerShell en tant qu'administrateur" -ForegroundColor Yellow
    exit 1
}

# Fonction pour vérifier si une commande existe
function Test-Command {
    param([string]$Command)
    try {
        Get-Command $Command -ErrorAction Stop | Out-Null
        return $true
    } catch {
        return $false
    }
}

# Fonction pour ajouter au PATH
function Add-ToPath {
    param([string]$Path)
    $currentPath = [Environment]::GetEnvironmentVariable("PATH", "Machine")
    if ($currentPath -notlike "*$Path*") {
        $newPath = "$currentPath;$Path"
        [Environment]::SetEnvironmentVariable("PATH", $newPath, "Machine")
        Write-Host "✅ Ajouté au PATH: $Path" -ForegroundColor Green
    } else {
        Write-Host "ℹ️  Déjà dans le PATH: $Path" -ForegroundColor Cyan
    }
}

# 1. Vérifier Java JDK
Write-Host "`n☕ Vérification de Java JDK..." -ForegroundColor Yellow
if (Test-Command "java") {
    $javaVersion = java -version 2>&1 | Select-String "version"
    Write-Host "✅ Java trouvé: $javaVersion" -ForegroundColor Green
} else {
    Write-Host "❌ Java JDK non trouvé" -ForegroundColor Red
    Write-Host "💡 Installez OpenJDK 11 ou Oracle JDK 8" -ForegroundColor Yellow
    Write-Host "   Lien: https://adoptium.net/temurin/releases/" -ForegroundColor Cyan
    Write-Host "   Ou utilisez: winget install EclipseAdoptium.Temurin.11.JDK" -ForegroundColor Cyan
}

# 2. Vérifier Android SDK Platform Tools
Write-Host "`n📱 Vérification d'Android SDK Platform Tools..." -ForegroundColor Yellow
if (Test-Command "adb") {
    $adbVersion = adb version 2>&1 | Select-String "Version"
    Write-Host "✅ ADB trouvé: $adbVersion" -ForegroundColor Green
} else {
    Write-Host "❌ ADB non trouvé dans le PATH" -ForegroundColor Red
    
    # Vérifier l'installation existante
    $existingPlatformTools = "E:\Android\SDK\platform-tools"
    if (Test-Path $existingPlatformTools) {
        Write-Host "✅ Installation existante trouvée: $existingPlatformTools" -ForegroundColor Green
        Write-Host "💡 Ajout au PATH système..." -ForegroundColor Yellow
        
        # Ajouter au PATH
        Add-ToPath $existingPlatformTools
        
        # Configurer ANDROID_HOME
        $androidHome = "E:\Android\SDK"
        $currentAndroidHome = [Environment]::GetEnvironmentVariable("ANDROID_HOME", "Machine")
        if ($currentAndroidHome -ne $androidHome) {
            [Environment]::SetEnvironmentVariable("ANDROID_HOME", $androidHome, "Machine")
            Write-Host "✅ ANDROID_HOME configuré: $androidHome" -ForegroundColor Green
        }
        
        Write-Host "✅ Configuration terminée" -ForegroundColor Green
    } else {
        Write-Host "❌ Installation non trouvée dans: $existingPlatformTools" -ForegroundColor Red
        Write-Host "💡 Vérifiez le chemin ou installez Android SDK Platform Tools" -ForegroundColor Yellow
    }
}

# 3. Vérifier Gradle
Write-Host "`n🔨 Vérification de Gradle..." -ForegroundColor Yellow
if (Test-Command "gradle") {
    $gradleVersion = gradle --version 2>&1 | Select-String "Gradle"
    Write-Host "✅ Gradle trouvé: $gradleVersion" -ForegroundColor Green
} else {
    Write-Host "ℹ️  Gradle non trouvé (sera utilisé via gradlew)" -ForegroundColor Yellow
}

# 4. Vérifier les variables d'environnement
Write-Host "`n🌍 Configuration des variables d'environnement..." -ForegroundColor Yellow

# ANDROID_HOME
$androidHome = "E:\Android\SDK"
if (Test-Path $androidHome) {
    $currentAndroidHome = [Environment]::GetEnvironmentVariable("ANDROID_HOME", "Machine")
    if ($currentAndroidHome -ne $androidHome) {
        [Environment]::SetEnvironmentVariable("ANDROID_HOME", $androidHome, "Machine")
        Write-Host "✅ ANDROID_HOME configuré: $androidHome" -ForegroundColor Green
    } else {
        Write-Host "ℹ️  ANDROID_HOME déjà configuré" -ForegroundColor Cyan
    }
} else {
    Write-Host "⚠️  ANDROID_HOME non trouvé: $androidHome" -ForegroundColor Yellow
}

# JAVA_HOME
if (Test-Command "java") {
    $javaHome = (Get-Command java).Path | Split-Path -Parent | Split-Path -Parent
    $currentJavaHome = [Environment]::GetEnvironmentVariable("JAVA_HOME", "Machine")
    if ($currentJavaHome -ne $javaHome) {
        [Environment]::SetEnvironmentVariable("JAVA_HOME", $javaHome, "Machine")
        Write-Host "✅ JAVA_HOME configuré: $javaHome" -ForegroundColor Green
    } else {
        Write-Host "ℹ️  JAVA_HOME déjà configuré" -ForegroundColor Cyan
    }
}

# 5. Vérifier les appareils Android
Write-Host "`n📱 Vérification des appareils Android..." -ForegroundColor Yellow
if (Test-Command "adb") {
    $devices = adb devices 2>&1
    $connectedDevices = ($devices | Select-String "device$").Count
    
    if ($connectedDevices -gt 0) {
        Write-Host "✅ $connectedDevices appareil(s) connecté(s)" -ForegroundColor Green
        $devices | Select-String "device$" | ForEach-Object {
            Write-Host "   📱 $($_.ToString().Trim())" -ForegroundColor Cyan
        }
    } else {
        Write-Host "⚠️  Aucun appareil Android connecté" -ForegroundColor Yellow
        Write-Host "💡 Connectez un appareil Android via USB et activez le débogage USB" -ForegroundColor Yellow
        Write-Host "   Paramètres > À propos du téléphone > Numéro de build (7 fois)" -ForegroundColor Cyan
        Write-Host "   Paramètres > Options pour les développeurs > Débogage USB" -ForegroundColor Cyan
    }
} else {
    Write-Host "❌ ADB non disponible" -ForegroundColor Red
}

# 6. Résumé final
Write-Host "`n📊 Résumé de l'installation:" -ForegroundColor Cyan
Write-Host "=============================" -ForegroundColor Cyan

$javaOk = Test-Command "java"
$adbOk = Test-Command "adb"
$gradleOk = Test-Command "gradle"

Write-Host "☕ Java JDK: $(if($javaOk){'✅' }else{'❌'})" -ForegroundColor $(if($javaOk){'Green'}else{'Red'})
Write-Host "📱 ADB: $(if($adbOk){'✅' }else{'❌'})" -ForegroundColor $(if($adbOk){'Green'}else{'Red'})
Write-Host "🔨 Gradle: $(if($gradleOk){'✅' }else{'ℹ️'})" -ForegroundColor $(if($gradleOk){'Green'}else{'Yellow'})

if ($javaOk -and $adbOk) {
    Write-Host "`n🎉 Tous les prérequis sont installés!" -ForegroundColor Green
    Write-Host "🚀 Vous pouvez maintenant générer l'APK avec:" -ForegroundColor Cyan
    Write-Host "   .\scripts\manage-apk.ps1 build" -ForegroundColor White
} else {
    Write-Host "`n⚠️  Certains prérequis manquent" -ForegroundColor Yellow
    Write-Host "💡 Installez les composants manquants et relancez ce script" -ForegroundColor Yellow
}

Write-Host "`n💡 Redémarrez votre terminal pour que les changements de PATH prennent effet" -ForegroundColor Yellow
