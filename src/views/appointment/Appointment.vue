<template>
  <div :class="$style.appointementsListEmpty">
    <div :class="$style.sidebarNavigation">
      <div :class="$style.content">
        <div :class="$style.nav">
          <div :class="$style.header">
            <div :class="$style.logo">
              <img :class="$style.santelinkIcon" src="/images/SanteLink.svg" alt="SanteLink" />
            </div>
          </div>
          <div :class="$style.navigation">
            <div :class="$style.navItemBase">
              <div :class="$style.appointementsListEmptyContent">
                <div :class="$style.home">
                  <img src="/icons/Dashbord-ico/home.svg" alt="Home" />
                </div>
                <div :class="$style.text">Home</div>
              </div>
            </div>
            <div :class="$style.navItemBase">
              <div :class="$style.appointementsListEmptyContent">
                <div :class="$style.home">
                  <img src="/icons/Dashbord-ico/calendar.svg" alt="Appointment" />
                </div>
                <div :class="$style.text">Appointment</div>
              </div>
            </div>
            <div :class="$style.navItemBase2">
              <div :class="$style.appointementsListEmptyContent">
                <div :class="$style.home">
                  <img src="/icons/Dashbord-ico/messages.svg" alt="Messages" />
                </div>
                <div :class="$style.text">Messages</div>
              </div>
            </div>
            <div :class="$style.navItemBase">
              <div :class="$style.appointementsListEmptyContent">
                <div :class="$style.home">
                  <img src="/icons/Dashbord-ico/setting-3.svg" alt="Settings" />
                </div>
                <div :class="$style.text">Settings</div>
              </div>
            </div>
          </div>
        </div>
        <div :class="$style.footer">
          <div :class="$style.appointementsListEmptyNavigation">
            <div :class="$style.navItemBase">
              <div :class="$style.appointementsListEmptyContent">
                <img src="/icons/Dashbord-ico/life-buoy-01.svg" alt="Support" />
                <div :class="$style.text">Support</div>
              </div>
            </div>
            <div :class="$style.navItemBase">
              <div :class="$style.appointementsListEmptyContent">
                <div :class="$style.home">
                  <img src="/icons/Dashbord-ico/notification.svg" alt="Notifications" />
                </div>
                <div :class="$style.text">Notifications </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :class="$style.headerParent">
      <div :class="$style.appointementsListEmptyHeader">
        <div :class="$style.text6">
          <b :class="$style.appointment">Appointment </b>
        </div>
      </div>
      <div :class="$style.tabBarParent">
        <div :class="$style.tabBar">
          <div :class="$style.menuActive">
            <b :class="$style.menu1">Upcoming</b>
          </div>
          <div :class="$style.menuNonactive">
            <div :class="$style.menu2">Ongoing</div>
          </div>
          <div :class="$style.menuNonactive">
            <div :class="$style.menu2">Archives</div>
          </div>
        </div>
        <div :class="$style.nothingToShowWrapper">
          <b :class="$style.nothingToShow">Nothing to show</b>
        </div>
      </div>
    </div>
  </div>
</template>


<style module>
.appointementsListEmpty {
  width: 100%;
  position: relative;
  background-color: #fff;
  height: 960px;
  text-align: left;
  font-size: 16px;
  color: #344054;
  font-family: Inter;
}

.sidebarNavigation {
  position: absolute;
  top: 0px;
  left: 80px;
  border-right: 1px solid #eaecf0;
  box-sizing: border-box;
  width: 312px;
  height: 960px;
  display: flex;
  align-items: flex-start;
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
}

.appointementsListEmptyContent {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
}

.home {
  width: 24px;
  position: relative;
  height: 24px;
}

.vuesaxlinearhomeIcon {
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

.navItemBase2 {
  align-self: stretch;
  border-radius: 6px;
  background-color: #fff;
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

.appointementsListEmptyNavigation {
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}

.headerParent {
  position: absolute;
  top: 0px;
  left: 392px;
  width: 968px;
  height: 960px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  font-size: 20px;
  color: #18181b;
  font-family: Manrope;
}

.appointementsListEmptyHeader {
  width: 808px;
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

.appointment {
  align-self: stretch;
  position: relative;
  letter-spacing: 0.2px;
  line-height: 32px;
}

.tabBarParent {
  width: 808px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 16px;
  box-sizing: border-box;
  gap: 32px;
  text-align: center;
  font-size: 12px;
  color: #3f3f46;
}

.tabBar {
  align-self: stretch;
  border-radius: 12px;
  border: 1px solid #f2f4f7;
  display: flex;
  align-items: flex-start;
  padding: 8px 16px;
  gap: 4px;
}

.menuActive {
  flex: 1;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 12px;
  background-color: #fff;
  border: 1px solid #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 24px;
  color: #065986;
}

.menu1 {
  position: relative;
  letter-spacing: 0.2px;
  line-height: 20px;
}

.menuNonactive {
  flex: 1;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 24px;
}

.menu2 {
  flex: 1;
  position: relative;
  letter-spacing: 0.2px;
  line-height: 20px;
  font-weight: 500;
}

.nothingToShowWrapper {
  align-self: stretch;
  flex: 1;
  background-color: #f2f4f7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: left;
  font-size: 16px;
  color: #98a2b3;
}

.nothingToShow {
  position: relative;
  letter-spacing: 0.2px;
  line-height: 28px;
}
</style>
