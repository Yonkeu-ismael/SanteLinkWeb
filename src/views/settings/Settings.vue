<template>
  <div :class="$style.settings">
    <!-- Sidebar Navigation -->
    <div :class="$style.sidebarNavigation">
      <div :class="$style.content">
        <div :class="$style.nav">
          <div :class="$style.header">
            <div :class="$style.logo">
              <img :class="$style.santelinkIcon" src="/images/SanteLink.svg" alt="SanteLink" />
            </div>
          </div>
          <div :class="$style.navigation">
            <div :class="$style.navItemBase" @click="navigateToDashboard">
              <div :class="$style.settingsContent">
                <div :class="$style.home">
                  <img src="/home.svg" alt="Home" />
                </div>
                <div :class="$style.text">Home</div>
              </div>
            </div>
            <div :class="$style.navItemBase" @click="navigateToAppointment">
              <div :class="$style.settingsContent">
                <div :class="$style.home">
                  <img src="/calendar.svg" alt="Appointment" />
                </div>
                <div :class="$style.text">Appointment</div>
              </div>
            </div>
            <div :class="$style.navItemBase">
              <div :class="$style.settingsContent">
                <div :class="$style.home">
                  <img src="/messages.svg" alt="Messages" />
                </div>
                <div :class="$style.text">Messages</div>
              </div>
            </div>
            <div :class="$style.navItemBase3">
              <div :class="$style.settingsContent">
                <div :class="$style.home">
                  <img src="/setting-3.svg" alt="Settings" />
                </div>
                <div :class="$style.text">Settings</div>
              </div>
            </div>
          </div>
        </div>
        <div :class="$style.footer">
          <div :class="$style.settingsNavigation">
            <div :class="$style.navItemBase">
              <div :class="$style.settingsContent">
                <div :class="$style.home">
                  <img src="/life-buoy-01.svg" alt="Support" />
                </div>
                <div :class="$style.text">Support</div>
              </div>
            </div>
            <div :class="$style.navItemBase">
              <div :class="$style.settingsContent">
                <div :class="$style.home">
                  <img src="/notification.svg" alt="Notifications" />
                </div>
                <div :class="$style.text">Notifications</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div :class="$style.headerParent">
      <div :class="$style.settingsHeader">
        <div :class="$style.text6">
          <b :class="$style.settings2">Settings</b>
        </div>
      </div>
      <div :class="$style.frameWrapper">
        <div :class="$style.headerNavParent">
          <!-- User Profile Section -->
          <div :class="$style.headerNav">
            <div :class="$style.avatardesktopsmallParent">
              <div :class="$style.avatardesktopsmall">
                <img :class="$style.imageIcon" :src="userProfileImage" alt="Profile" />
              </div>
              <div :class="$style.content7">
                <div :class="$style.helloSandersWrapper">
                  <div :class="$style.helloSanders">{{ userName }}</div>
                </div>
                <div :class="$style.contentWrapper">
                  <div :class="$style.content8">
                    <div :class="$style.parisRueDe">{{ userEmail }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div :class="$style.home" @click="editProfile">
              <img src="/arrow-right.svg" alt="Edit" />
            </div>
          </div>

          <!-- Settings Menu Items -->
          <div :class="$style.menuItem">
            <div :class="$style.home">
              <img src="/notification.svg" alt="Location" />
            </div>
            <div :class="$style.itemTitreParent">
              <div :class="$style.itemTitre">Partager ma position avec le médecin</div>
              <div :class="$style.controlsSwitches">
                <div :class="[$style.knob, { [$style.knobActive]: shareLocation }]" @click="toggleShareLocation" />
              </div>
            </div>
          </div>

          <div :class="$style.menuItemParent">
            <div :class="$style.menuItem" @click="navigateToMedicalFolder">
              <div :class="$style.home">
                <img src="/folder-cloud.svg" alt="Medical Folder" />
              </div>
              <div :class="$style.itemTitreParent">
                <div :class="$style.itemTitre">Dossier médical</div>
                <div :class="$style.badge">
                  <div :class="$style.dot">
                    <div :class="$style.settingsDot" />
                  </div>
                  <div :class="$style.text7">+5</div>
                </div>
                <div :class="$style.home">
                  <img src="/arrow-right.svg" alt="Arrow" />
                </div>
              </div>
            </div>

            <div :class="$style.menuItem" @click="navigateToPaymentMethods">
              <div :class="$style.home">
                <img src="/card.svg" alt="Payment" />
              </div>
              <div :class="$style.itemTitreParent">
                <div :class="$style.itemTitre">Méthodes de paiement</div>
                <div :class="$style.home">
                  <img src="/arrow-right.svg" alt="Arrow" />
                </div>
              </div>
            </div>
          </div>

          <div :class="$style.menuItemParent">
            <div :class="$style.menuItem" @click="navigateToSecurity">
              <div :class="$style.home">
                <img src="/security-user.svg" alt="Security" />
              </div>
              <div :class="$style.itemTitreParent">
                <div :class="$style.itemTitre">Sécurité</div>
                <div :class="$style.home">
                  <img src="/arrow-right.svg" alt="Arrow" />
                </div>
              </div>
            </div>

            <div :class="$style.menuItem" @click="navigateToGeneralSettings">
              <div :class="$style.home">
                <img src="/setting-3.svg" alt="General Settings" />
              </div>
              <div :class="$style.itemTitreParent">
                <div :class="$style.itemTitre">Paramètres généraux</div>
                <div :class="$style.home">
                  <img src="/arrow-right.svg" alt="Arrow" />
                </div>
              </div>
            </div>

            <div :class="$style.menuItem" @click="navigateToHelp">
              <div :class="$style.home">
                <img src="/life-buoy-01.svg" alt="Help" />
              </div>
              <div :class="$style.itemTitreParent">
                <div :class="$style.itemTitre">Aide et support</div>
                <div :class="$style.home">
                  <img src="/arrow-right.svg" alt="Arrow" />
                </div>
              </div>
            </div>
          </div>

          <div :class="$style.menuItemParent">
            <div :class="$style.menuItem" @click="navigateToAbout">
              <div :class="$style.home">
                <img src="/info-circle.svg" alt="About" />
              </div>
              <div :class="$style.itemTitreParent">
                <div :class="$style.itemTitre">À propos de Santelink</div>
                <div :class="$style.home">
                  <img src="/arrow-right.svg" alt="Arrow" />
                </div>
              </div>
            </div>

            <div :class="$style.menuItem" @click="handleLogout">
              <div :class="$style.home">
                <img src="/logout.svg" alt="Logout" />
              </div>
              <div :class="$style.itemTitreParent">
                <div :class="$style.itemTitre">Se déconnecter</div>
                <div :class="$style.home">
                  <img src="/arrow-right.svg" alt="Arrow" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation Bar -->
    <div :class="$style.menuNavigation">
      <div :class="$style.menuNavigation2">
        <div :class="$style.menuNavigationMasterMenuNavigation" @click="navigateToDashboard">
          <div :class="$style.icon">
            <img src="/icons/Dashbord-ico/home.svg" alt="Home" />
          </div>
          <div :class="$style.inactive">Home</div>
        </div>
        <div :class="$style.menuNavigationMasterMenuNavigation" @click="navigateToAppointment">
          <div :class="$style.icon">
            <img src="/icons/Dashbord-ico/calendar.svg" alt="Appointments" />
          </div>
          <div :class="$style.inactive">Appointments</div>
        </div>
        <div :class="$style.menuNavigationMasterMenuNavigation">
          <div :class="$style.icon">
            <img src="/icons/Dashbord-ico/messages.svg" alt="Messages" />
          </div>
          <div :class="$style.inactive">Messages</div>
        </div>
        <div :class="$style.masterMenuNavigation" @click="navigateToSettings">
          <div :class="$style.icon">
            <img src="/icons/Dashbord-ico/setting-3.svg" alt="Settings" />
          </div>
          <b :class="$style.active">Settings</b>
        </div>
      </div>
      <div :class="$style.homeIndicator">
        <div :class="$style.vector" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

// Getters pour les informations utilisateur
const userName = computed(() => store.getters['user/userName'] || 'Utilisateur')
const userEmail = computed(() => store.getters['user/userEmail'] || '')
const userProfileImage = computed(() => store.getters['user/profileImage'] || '/images/image.png')
const shareLocation = computed(() => store.getters['user/shareLocation'])

// Charger les informations utilisateur au montage du composant
onMounted(async () => {
  try {
    // Si on a un token mais pas d'informations utilisateur, les récupérer
    if (store.getters['user/isAuthenticated'] && !store.getters['user/userInfo']) {
      console.log('Chargement des informations utilisateur depuis l\'API...')
      await store.dispatch('user/getUserInfo')
    } else if (store.getters['user/userInfo']) {
      console.log('Informations utilisateur déjà présentes:', store.getters['user/userInfo'])
    }
  } catch (error) {
    console.error('Erreur lors du chargement des informations utilisateur:', error)
  }
})

// Méthodes
const toggleShareLocation = () => {
  store.dispatch('user/toggleShareLocation')
}

const navigateToMedicalFolder = () => {
  console.log('Navigation vers le dossier médical')
}

const navigateToPaymentMethods = () => {
  console.log('Navigation vers les méthodes de paiement')
}

const navigateToSecurity = () => {
  console.log('Navigation vers les paramètres de sécurité')
}

const navigateToGeneralSettings = () => {
  console.log('Navigation vers les paramètres généraux')
}

const navigateToHelp = () => {
  console.log('Navigation vers l\'aide et le support')
}

const navigateToAbout = () => {
  console.log('Navigation vers la page À propos')
}

const navigateToDashboard = () => {
  router.push('/dashboard')
}

const navigateToAppointment = () => {
  router.push('/appointment')
}

const navigateToSettings = () => {
  // Déjà sur la page Settings, pas besoin de naviguer
  console.log('Déjà sur la page Settings')
}

const editProfile = async () => {
  try {
    // Pour l'instant, on affiche les informations actuelles
    console.log('Informations utilisateur actuelles:', {
      nom: userName.value,
      email: userEmail.value,
      image: userProfileImage.value
    })
    
    // TODO: Implémenter un modal ou une page d'édition du profil
    // Exemple d'utilisation de l'action updateProfile :
    // await store.dispatch('user/updateProfile', {
    //   firstName: 'Nouveau prénom',
    //   lastName: 'Nouveau nom',
    //   email: 'nouveau@email.com'
    // })
  } catch (error) {
    console.error('Erreur lors de l\'édition du profil:', error)
  }
}

const handleLogout = () => {
  store.dispatch('user/logout')
  router.push('/login')
}
</script>

<style module>
.settings {
  width: 100%;
  position: relative;
  background-color: #fff;
  min-height: 100vh;
  text-align: left;
  font-size: 16px;
  color: #344054;
  font-family: Inter;
}

.sidebarNavigation {
  position: fixed;
  top: 0px;
  left: 0px;
  border-right: 1px solid #eaecf0;
  box-sizing: border-box;
  width: 312px;
  height: 100vh;
  display: flex;
  align-items: flex-start;
  z-index: 1000;
}

.content {
  align-self: stretch;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0px;
}

.nav {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 32px 0px 0px;
  gap: 24px;
}

.header {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 20px 0px 24px;
}

.logo {
  width: 172.3px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.santelinkIcon {
  width: 172.3px;
  position: relative;
  height: 23.9px;
}

.navigation {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 16px;
  gap: 4px;
}

.navItemBase {
  align-self: stretch;
  border-radius: 6px;
  background-color: #fff;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.navItemBase:hover {
  background-color: #f5fbff;
}

.settingsContent {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
}

.home {
  width: 24px;
  position: relative;
  height: 24px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.home:hover {
  opacity: 0.7;
}

.home img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.text {
  position: relative;
  line-height: 24px;
  font-weight: 600;
}

.navItemBase3 {
  align-self: stretch;
  border-radius: 6px;
  background-color: #f9fafb;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 8px 12px;
  color: #0b4a6f;
}

.footer {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 16px 32px;
}

.settingsNavigation {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}

.headerParent {
  margin-left: 312px;
  width: calc(100% - 312px);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  font-size: 20px;
  color: #18181b;
  font-family: Manrope;
  padding: 24px;
  box-sizing: border-box;
}

.settingsHeader {
  width: 100%;
  height: 88px;
  display: flex;
  align-items: center;
  padding: 0px 16px;
  box-sizing: border-box;
}

.text6 {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.settings2 {
  align-self: stretch;
  position: relative;
  letter-spacing: 0.2px;
  line-height: 32px;
}

.frameWrapper {
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 16px;
  box-sizing: border-box;
  font-size: 14px;
  color: #344054;
  font-family: Inter;
}

.headerNavParent {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
}

.headerNav {
  align-self: stretch;
  border-radius: 12px;
  background-color: #f2f4f7;
  display: flex;
  align-items: center;
  padding: 16px;
  gap: 16px;
  text-align: center;
  font-size: 16px;
  color: #101828;
}

.avatardesktopsmallParent {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 16px;
}

.avatardesktopsmall {
  width: 40px;
  position: relative;
  height: 40px;
}

.imageIcon {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0%;
  right: 0%;
  bottom: 0%;
  left: 0%;
  border-radius: 9999px;
  max-width: 100%;
  overflow: hidden;
  max-height: 100%;
  object-fit: cover;
}

.content7 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}

.helloSandersWrapper {
  align-self: stretch;
  display: flex;
  align-items: center;
}

.helloSanders {
  position: relative;
  line-height: 24px;
}

.contentWrapper {
  display: flex;
  align-items: flex-start;
  text-align: left;
  font-size: 14px;
  color: #b6b6b6;
}

.content8 {
  display: flex;
  align-items: center;
}

.parisRueDe {
  position: relative;
  line-height: 20px;
}

.menuItem {
  align-self: stretch;
  border-radius: 12px;
  background-color: #f2f4f7;
  display: flex;
  align-items: center;
  padding: 0px 0px 0px 16px;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.menuItem:hover {
  background-color: #e5e7eb;
}

.itemTitreParent {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 16px 16px 16px 0px;
  gap: 8px;
}

.itemTitre {
  flex: 1;
  position: relative;
  line-height: 20px;
}

.controlsSwitches {
  width: 56px;
  position: relative;
  border-radius: 32px;
  background-color: #e3e5e5;
  height: 32px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.controlsSwitches:hover {
  background-color: #d1d5db;
}

.knob {
  position: absolute;
  top: calc(50% - 14px);
  left: 2px;
  border-radius: 50px;
  background-color: #fff;
  width: 28px;
  height: 28px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.knobActive {
  left: calc(100% - 30px);
}

.controlsSwitches:has(.knobActive) {
  background-color: #0ba5ec;
}

.menuItemParent {
  align-self: stretch;
  border-radius: 12px;
  background-color: #f2f4f7;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.badge {
  border-radius: 16px;
  background-color: #f0f9ff;
  display: flex;
  align-items: center;
  padding: 2px 8px 2px 6px;
  gap: 4px;
  text-align: center;
  font-size: 12px;
  color: #026aa2;
}

.dot {
  width: 8px;
  position: relative;
  height: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.settingsDot {
  position: absolute;
  top: 1px;
  left: 1px;
  border-radius: 50%;
  background-color: #0ba5ec;
  width: 6px;
  height: 6px;
}

.text7 {
  position: relative;
  line-height: 18px;
  font-weight: 500;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .sidebarNavigation {
    width: 280px;
  }
  
  .headerParent {
    margin-left: 280px;
    width: calc(100% - 280px);
  }
}

@media (max-width: 768px) {
  .sidebarNavigation {
    display: none;
  }
  
  .headerParent {
    margin-left: 0;
    width: 100%;
    padding: 16px;
  }
  
  .settingsHeader {
    height: auto;
    padding: 0;
  }
  
  .frameWrapper {
    padding: 0;
  }
  
  /* Mobile navigation bar at bottom */
  .settings::after {
    content: '';
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 80px;
    background-color: #fff;
    border-top: 1px solid #f3f4f6;
    z-index: 1000;
  }
}

@media (max-width: 480px) {
  .headerParent {
    padding: 12px;
    padding-bottom: 100px; /* Space for mobile nav */
  }
  
  .settings2 {
    font-size: 18px;
    line-height: 28px;
  }
  
  .headerNavParent {
    gap: 16px;
  }
  
  .menuItem {
    padding: 0px 0px 0px 12px;
  }
  
  .itemTitreParent {
    padding: 12px 12px 12px 0px;
  }
}

/* Mobile Navigation Styles */
.menuNavigation {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  border-top: 1px solid #f3f4f6;
  box-sizing: border-box;
  width: 100%;
  display: none;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  font-size: 12px;
  color: #d0d5dd;
  font-family: Manrope;
  z-index: 1000;
}

.menuNavigation2 {
  width: 100%;
  background-color: #fff;
  display: flex;
  align-items: flex-start;
}

.masterMenuNavigation {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 20px;
  gap: 4px;
  color: #0b4a6f;
  cursor: pointer;
  transition: all 0.2s ease;
}

.masterMenuNavigation:hover {
  background-color: #f5fbff;
}

.menuNavigationMasterMenuNavigation {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 20px;
  gap: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.menuNavigationMasterMenuNavigation:hover {
  background-color: #f5fbff;
}

.icon {
  width: 24px;
  position: relative;
  height: 24px;
}

.icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.active {
  position: relative;
  letter-spacing: 0.2px;
  line-height: 20px;
  font-weight: 600;
}

.inactive {
  position: relative;
  letter-spacing: 0.2px;
  line-height: 20px;
  font-weight: 500;
}

.homeIndicator {
  width: 100%;
  position: relative;
  background-color: #fff;
  height: 24px;
}

.vector {
  position: absolute;
  bottom: 8px;
  left: calc(50% - 66.5px);
  border-radius: 100px;
  background-color: #020e22;
  width: 134px;
  height: 5px;
}

@media (max-width: 768px) {
  .menuNavigation {
    display: flex;
  }
}
</style>
