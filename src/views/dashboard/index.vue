<template>
  <div :class="$style.home">
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
            <div :class="[$style.navItemBase, $style.active]">
              <div :class="$style.homeContent">
                <div :class="$style.calendar">
                  <img src="/icons/Dashbord-ico/home.svg" alt="Home" />
                </div>
                <div :class="$style.text">Home</div>
              </div>
            </div>
            <div :class="$style.homeNavItemBase" @click="navigateToAppointment">
              <div :class="$style.homeContent">
                <div :class="$style.calendar">
                  <img src="/icons/Dashbord-ico/calendar.svg" alt="Appointment" />
                </div>
                <div :class="$style.text">Appointment</div>
              </div>
            </div>
            <div :class="$style.homeNavItemBase">
              <div :class="$style.homeContent">
                <div :class="$style.calendar">
                  <img src="/icons/Dashbord-ico/messages.svg" alt="Messages" />
                </div>
                <div :class="$style.text">Messages</div>
              </div>
            </div>
            <div :class="$style.homeNavItemBase" @click="navigateToSettings">
              <div :class="$style.homeContent">
                <div :class="$style.calendar">
                  <img src="/icons/Dashbord-ico/setting-3.svg" alt="Settings" />
                </div>
                <div :class="$style.text">Settings</div>
              </div>
            </div>
          </div>
        </div>
        <div :class="$style.footer">
          <div :class="$style.homeNavigation">
            <div :class="$style.homeNavItemBase">
              <div :class="$style.homeContent">
                <img :class="$style.calendar" src="/icons/Dashbord-ico/life-buoy-01.svg" alt="Support" />
                <div :class="$style.text">Support</div>
              </div>
            </div>
            <div :class="$style.homeNavItemBase">
              <div :class="$style.homeContent">
                <div :class="$style.calendar">
                  <img :class="$style.vuesaxboldhomeIcon" src="/icons/Dashbord-ico/notification.svg" alt="Notifications" />
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
      <div :class="$style.homeHeader">
        <div :class="$style.text6">
          <b :class="$style.hiDwiky">Salut {{ userName }}! 👋🏽</b>
          <div :class="$style.mayYouAlways">Que vous soyez toujours en bonne santé</div>
        </div>
        <div :class="$style.searach">
          <div :class="$style.inputField">
            <div :class="$style.inputForm">
              <img :class="$style.calendar" src="/icons/Dashbord-ico/search.svg" alt="Add" />

              <!-- <svg :class="$style.calendar" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 20C15.9706 20 20 15.9706 20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M18.93 20.69C19.46 21.22 20.22 21.22 20.75 20.69C21.28 20.16 21.28 19.4 20.75 18.87L18.93 20.69Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg> -->
              <div :class="$style.text7">symptômes, maladies...</div>
            </div>
          </div>
          <div :class="$style.button">
            <img :class="$style.calendar" src="/icons/Dashbord-ico/Group.svg" alt="Add" />
          </div>
        </div>
      </div>

      <div :class="$style.frameParent">
        <!-- Service Cards -->
        <div :class="$style.buttonCardParent">
          <div :class="$style.buttonCard">
            <div :class="$style.buttonCardChild">
              <img src="/icons/Dashbord-ico/bold-plus.svg" alt="Clinic" />
            </div>
            <div :class="$style.clinicVisitParent">
              <b :class="$style.clinicVisit">Visite en clinique</b>
              <div :class="$style.makeAnAppointment">Prendre un rendez-vous</div>
            </div>
          </div>
          <div :class="$style.homeButtonCard">
            <div :class="$style.buttonCardChild">
              <img src="/icons/Dashbord-ico/open-door-house.svg" alt="Home Visit" />
            </div>
            <div :class="$style.clinicVisitParent">
              <b :class="$style.clinicVisit">Visite à domicile</b>
              <div :class="$style.homeMakeAnAppointment">Appeler le médecin à domicile</div>
            </div>
          </div>
          <div :class="$style.homeButtonCard">
            <div :class="$style.videoCallWrapper">
              <div :class="$style.videoCall">
                <img :class="$style.videoCallIcon" src="/icons/Dashbord-ico/video-call.svg" alt="Video Call" />
              </div>
            </div>
            <div :class="$style.clinicVisitParent">
              <b :class="$style.clinicVisit">Visite en ligne</b>
              <div :class="$style.homeMakeAnAppointment">Appel vidéo avec un médecin</div>
            </div>
          </div>
          <div :class="$style.homeButtonCard">
            <div :class="$style.buttonCardChild">
              <img src="/icons/Dashbord-ico/microscope.svg" alt="Exams" />
            </div>
            <div :class="$style.clinicVisitParent">
              <b :class="$style.clinicVisit">Résultats d'examens</b>
              <div :class="$style.homeMakeAnAppointment">Rapport d'examens</div>
            </div>
          </div>
        </div>

        <!-- Appointments Section -->
        <div :class="$style.frameGroup">
          <div :class="$style.appointmentParent">
            <b :class="$style.appointment">Rendez-vous</b>
            <div :class="$style.homeButton">
              <div :class="$style.text8">Voir tout</div>
            </div>
          </div>
          <div :class="$style.cardAppointmentParent">
            <div :class="$style.cardAppointment">
              <div :class="$style.frameContainer">
                <div :class="$style.inputField">
                  <b :class="$style.drSmiths">Dr Smiths</b>
                  <div :class="$style.speciality">Spécialité</div>
                </div>
                <div :class="$style.badge">
                  <div :class="$style.dot">
                    <div :class="$style.homeDot" />
                  </div>
                  <div :class="$style.text9">Confirmé</div>
                </div>
              </div>
              <div :class="$style.cardAppointmentChild" />
              <div :class="$style.dateParent">
                <div :class="$style.date">
                  <div :class="$style.clock">
                    <svg :class="$style.vuesaxboldhomeIcon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <div :class="$style.div">12/03/2024</div>
                </div>
                <div :class="$style.date">
                  <div :class="$style.clock">
                    <svg :class="$style.vuesaxboldhomeIcon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <div :class="$style.div">10:30</div>
                </div>
              </div>
            </div>
            <div :class="$style.cardAppointment">
              <div :class="$style.frameContainer">
                <div :class="$style.inputField">
                  <b :class="$style.drSmiths">Dr Martin</b>
                  <div :class="$style.speciality">Cardiologie</div>
                </div>
                <div :class="$style.badge">
                  <div :class="$style.dot">
                    <div :class="$style.homeDot" />
                  </div>
                  <div :class="$style.text9">Confirmé</div>
                </div>
              </div>
              <div :class="$style.cardAppointmentChild" />
              <div :class="$style.dateParent">
                <div :class="$style.date">
                  <div :class="$style.clock">
                    <svg :class="$style.vuesaxboldhomeIcon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <div :class="$style.div">15/03/2024</div>
                </div>
                <div :class="$style.date">
                  <div :class="$style.clock">
                    <svg :class="$style.vuesaxboldhomeIcon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <div :class="$style.div">14:00</div>
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
        <div :class="$style.masterMenuNavigation">
          <div :class="$style.icon">
            <img src="/icons/Dashbord-ico/home.svg" alt="Home" />
          </div>
          <b :class="$style.active">Home</b>
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
        <div :class="$style.menuNavigationMasterMenuNavigation" @click="navigateToSettings">
          <div :class="$style.icon">
            <img src="/icons/Dashbord-ico/setting-3.svg" alt="Settings" />
          </div>
          <div :class="$style.inactive">Settings</div>
        </div>
      </div>
      <div :class="$style.homeIndicator">
        <div :class="$style.vector" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

// Getters pour les informations utilisateur
const userName = computed(() => store.getters['user/userName'] || 'Utilisateur')

// Méthodes de navigation
const navigateToSettings = () => {
  router.push('/settings')
}

const navigateToAppointment = () => {
  router.push('/appointment')
}
</script>

<style module>
.home {
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
  color: #0b4a6f;
  cursor: pointer;
  transition: all 0.2s ease;
}

.navItemBase:hover {
  background-color: #f5fbff;
}

.navItemBase.active {
  background-color: #f5fbff;
  color: #0b4a6f;
}

.homeContent {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
}

.vuesaxboldhomeIcon {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0%;
  right: 0%;
  bottom: 0%;
  left: 0%;
  max-width: 100%;
  overflow: hidden;
  max-height: 100%;
}

.text {
  position: relative;
  line-height: 24px;
  font-weight: 600;
}

.homeNavItemBase {
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

.homeNavItemBase:hover {
  background-color: #f5fbff;
}

.calendar {
  width: 24px;
  position: relative;
  height: 24px;
  color: #667085;
}

.calendar img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.footer {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 16px 32px;
}

.homeNavigation {
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

.homeHeader {
  width: 100%;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 16px;
  box-sizing: border-box;
  gap: 0px;
}

.text6 {
  width: 237px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.hiDwiky {
  align-self: stretch;
  position: relative;
  letter-spacing: 0.2px;
  line-height: 32px;
}

.mayYouAlways {
  align-self: stretch;
  position: relative;
  font-size: 12px;
  letter-spacing: 0.2px;
  line-height: 20px;
  font-weight: 500;
  color: #3f3f46;
}

.searach {
  width: 343px;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 14px;
  color: #71717a;
}

.inputField {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.inputForm {
  align-self: stretch;
  border-radius: 12px;
  background-color: #fff;
  border: 1px solid #d2d6db;
  display: flex;
  align-items: flex-start;
  padding: 12px;
  gap: 12px;
}

.text7 {
  flex: 1;
  position: relative;
  letter-spacing: 0.2px;
  line-height: 24px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.button {
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  background-color: #f5fbff;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.button:hover {
  background-color: #e6f4ff;
}

.frameParent {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  font-size: 16px;
  color: #1d2939;
  font-family: Inter;
}

.buttonCardParent {
  align-self: stretch;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  align-content: center;
  padding: 0px 16px;
  gap: 16px;
}

.buttonCard {
  flex: 1;
  border-radius: 8px;
  background-color: #0b4a6f;
  border: 1px solid #eaecf0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 16px;
  gap: 16px;
  min-width: 160px;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease;
}

.buttonCard:hover {
  background-color: #0a3d5a;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(11, 74, 111, 0.3);
}

.buttonCardChild {
  width: 40px;
  border-radius: 24px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.buttonCardChild img {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.clinicVisitParent {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.clinicVisit {
  position: relative;
  line-height: 24px;
}

.makeAnAppointment {
  position: relative;
  font-size: 12px;
  letter-spacing: 0.2px;
  line-height: 20px;
  font-weight: 500;
  font-family: Manrope;
}

.homeButtonCard {
  flex: 1;
  border-radius: 8px;
  background-color: #fff;
  border: 1px solid #eaecf0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 16px;
  gap: 16px;
  min-width: 160px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.homeButtonCard:hover {
  border-color: #0b4a6f;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.homeMakeAnAppointment {
  position: relative;
  font-size: 12px;
  letter-spacing: 0.2px;
  line-height: 20px;
  font-weight: 500;
  font-family: Manrope;
  color: #667085;
}

.videoCallWrapper {
  border-radius: 24px;
  background-color: #f5fbff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
}

.videoCall {
  width: 24px;
  position: relative;
  height: 24px;
  overflow: hidden;
  flex-shrink: 0;
}

.videoCallIcon {
  position: absolute;
  top: 1px;
  left: 1px;
  width: 22px;
  height: 22px;
  color: #0b4a6f;
}

.videoCallIcon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.frameGroup {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 24px;
  color: #18181b;
  font-family: Manrope;
}

.appointmentParent {
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 16px;
  gap: 0px;
}

.appointment {
  position: relative;
  letter-spacing: 0.2px;
  line-height: 28px;
}

.homeButton {
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #0b4a6f;
  font-family: Inter;
  cursor: pointer;
  transition: all 0.2s ease;
}

.homeButton:hover {
  color: #0a3d5a;
}

.text8 {
  position: relative;
  line-height: 20px;
  font-weight: 600;
}

.cardAppointmentParent {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 16px;
  gap: 8px;
  color: #1d2939;
  font-family: Inter;
}

.cardAppointment {
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid #f2f4f7;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  gap: 8px;
  background-color: #fff;
  transition: all 0.2s ease;
}

.cardAppointment:hover {
  border-color: #0b4a6f;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.frameContainer {
  align-self: stretch;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0px;
}

.drSmiths {
  align-self: stretch;
  position: relative;
  line-height: 24px;
}

.speciality {
  align-self: stretch;
  position: relative;
  font-size: 14px;
  letter-spacing: 0.2px;
  line-height: 24px;
  font-weight: 500;
  font-family: Manrope;
}

.badge {
  border-radius: 16px;
  background-color: #ecfdf3;
  display: flex;
  align-items: center;
  padding: 2px 8px 2px 6px;
  gap: 4px;
  mix-blend-mode: multiply;
  text-align: center;
  font-size: 12px;
  color: #027a48;
}

.dot {
  width: 8px;
  position: relative;
  height: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.homeDot {
  position: absolute;
  top: 1px;
  left: 1px;
  border-radius: 50%;
  background-color: #12b76a;
  width: 6px;
  height: 6px;
}

.text9 {
  position: relative;
  line-height: 18px;
  font-weight: 500;
}

.cardAppointmentChild {
  align-self: stretch;
  position: relative;
  border-top: 1px solid #eaecf0;
  box-sizing: border-box;
  height: 1px;
}

.dateParent {
  align-self: stretch;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0px;
  font-size: 12px;
  color: #667085;
  font-family: Manrope;
}

.date {
  display: flex;
  align-items: center;
  gap: 8px;
}

.div {
  position: relative;
  letter-spacing: 0.2px;
  line-height: 20px;
  font-weight: 500;
}

.clock {
  width: 16px;
  position: relative;
  height: 16px;
  color: #667085;
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
  
  .homeHeader {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    height: auto;
  }
  
  .searach {
    width: 100%;
  }
  
  .buttonCardParent {
    flex-direction: column;
  }
  
  .buttonCard,
  .homeButtonCard {
    min-width: 100%;
  }
  
  /* Mobile navigation bar at bottom */
  .home::after {
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
  
  .text6 {
    width: 100%;
  }
  
  .hiDwiky {
    font-size: 18px;
    line-height: 28px;
  }
  
  .buttonCardParent {
    padding: 0;
  }
  
  .cardAppointmentParent {
    padding: 0;
  }
  
  .homeHeader {
    padding: 0;
  }
  
  .frameParent {
    gap: 20px;
  }
  
  .buttonCard,
  .homeButtonCard {
    padding: 12px;
    gap: 12px;
  }
  
  .clinicVisit {
    font-size: 14px;
  }
  
  .makeAnAppointment,
  .homeMakeAnAppointment {
    font-size: 11px;
  }
}

/* Mobile Navigation Styles */
.mobileNavigation {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  border-top: 1px solid #f3f4f6;
  padding: 8px 0;
  z-index: 1000;
}

.mobileNavItem {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 4px;
  gap: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #d0d5dd;
}

.mobileNavItem.active {
  color: #0b4a6f;
}

.mobileIcon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobileIcon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.mobileLabel {
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  text-align: center;
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