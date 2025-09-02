<template>
  <div class="login">
    <div class="section">
      <div class="header-navigation">
        <Logo
          class="logo-instance"
          :darkMode="false"
          santeLink="image.svg"
          santeLinkClassName="design-component-instance-node"
        />
      </div>

      <div class="container">
        <div class="content">
          <div class="frame">
            <div class="frame">
              <div class="div">
                <div class="text-wrapper">Welcome Back</div>
                <p class="p">Please enter a form to login</p>
              </div>

              <div class="div-2">
                <div class="div">
                  <div class="text">Email or Username</div>
                  <div class="input-form">
                    <div class="text-2">Enter your full name</div>
                  </div>
                </div>

                <div class="password">
                  <div class="div">
                    <div class="text">Password</div>
                    <div class="input-form">
                      <div class="text-2">Enter your password</div>
                      <IconR class="icon-instance-node" />
                    </div>
                  </div>
                  <div class="text-wrapper-2">Forgot Password</div>
                </div>
              </div>
            </div>

            <div class="div-2">
              <button class="button">
                <button class="button-2">Sign In</button>
              </button>

              <img class="divider" alt="Divider" :src="require('./divider.svg')" />

              <div class="button-group">
                <ButtonSocial
                  class="button-social-instance"
                  social="google"
                  state="default"
                  text
                  theme="brand"
                />
                <ButtonSocial
                  class="button-social-2"
                  :icon="<IconL class='icon-instance-node' />"
                  social="apple"
                  state="default"
                  text
                  theme="brand"
                />
              </div>
            </div>
          </div>

          <p class="don-t-have-an">
            <span class="span">Don&apos;t have an account ? </span>
            <span class="text-wrapper-3">Register</span>
          </p>
        </div>
      </div>

      <footer class="footer">
        <div class="text-3">© SanteLink 2025</div>
      </footer>
    </div>

    <div class="section-2">
      <div class="supporting-text-and">
        <div class="arrows">
          <Testiomonial
            arrow="left"
            arrowLeftColor="white"
            class="testiomonial-carousel-arrow"
            size="lg"
            state="default"
            type="button-arrow"
          />
          <Testiomonial
            arrow="right"
            arrowRightColor="white"
            class="testiomonial-carousel-arrow"
            size="lg"
            state="default"
            type="button-arrow"
          />
        </div>
      </div>

      <p class="quote">
        &quot;We&apos;ve been using Untitled to kick start every new project and can&apos;t
        imagine working without it.&quot;
      </p>

      <div class="name-and-text">
        <div class="name">Welcome</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Logo from "./Logo";
import ButtonSocial from "./ButtonSocial";
import IconL from "./IconL";
import IconR from "./IconR";
import Testiomonial from "./Testiomonial";

export default defineComponent({
  name: "Login",
  components: {
    Logo,
    ButtonSocial,
    IconL,
    IconR,
    Testiomonial,
  },
});
</script>

<style>
.login {
  align-items: center;
  background-color: #ffffff;
  display: flex;
  height: 960px;
  position: relative;
  width: 1440px;
}

.login .section {
  align-items: center;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  width: 640px;
}

.login .header-navigation {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  height: 96px;
  padding: 32px;
  position: relative;
  width: 100%;
}

.login .logo-instance {
  width: 141.15px !important;
}

.login .design-component-instance-node {
  margin-right: -31.11px !important;
}

.login .container {
  align-items: center;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  padding: 0px 32px;
  position: relative;
  width: 100%;
}

.login .content {
  align-items: center;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 32px;
  position: relative;
  width: 360px;
}

.login .frame {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 32px;
  position: relative;
  width: 100%;
}

.login .div {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: var(--spacing-spacing-spacing-8px);
  position: relative;
  width: 100%;
}

.login .text-wrapper {
  align-self: stretch;
  color: var(--color-typography-900);
  font-family: var(--mobile-bold-size-24-font-family);
  font-size: var(--mobile-bold-size-24-font-size);
  font-style: var(--mobile-bold-size-24-font-style);
  font-weight: var(--mobile-bold-size-24-font-weight);
  letter-spacing: var(--mobile-bold-size-24-letter-spacing);
  line-height: var(--mobile-bold-size-24-line-height);
  margin-top: -1.00px;
  position: relative;
}

.login .p {
  align-self: stretch;
  color: var(--color-typography-700);
  font-family: var(--mobile-medium-size-14-font-family);
  font-size: var(--mobile-medium-size-14-font-size);
  font-style: var(--mobile-medium-size-14-font-style);
  font-weight: var(--mobile-medium-size-14-font-weight);
  letter-spacing: var(--mobile-medium-size-14-letter-spacing);
  line-height: var(--mobile-medium-size-14-line-height);
  position: relative;
}

.login .div-2 {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 16px;
  position: relative;
  width: 100%;
}

.login .text {
  align-self: stretch;
  color: var(--color-typography-900);
  font-family: var(--mobile-medium-size-14-font-family);
  font-size: var(--mobile-medium-size-14-font-size);
  font-style: var(--mobile-medium-size-14-font-style);
  font-weight: var(--mobile-medium-size-14-font-weight);
  letter-spacing: var(--mobile-medium-size-14-letter-spacing);
  line-height: var(--mobile-medium-size-14-line-height);
  margin-top: -1.00px;
  position: relative;
}

.login .input-form {
  align-items: flex-start;
  align-self: stretch;
  background-color: var(--color-background-white);
  border: 1px solid;
  border-color: var(--color-gray-300);
  border-radius: 12px;
  display: flex;
  flex: 0 0 auto;
  gap: var(--spacing-spacing-spacing-12px);
  padding: var(--spacing-spacing-spacing-12px);
  position: relative;
  width: 100%;
}

.login .text-2 {
  color: var(--color-typography-500);
  flex: 1;
  font-family: var(--mobile-medium-size-14-font-family);
  font-size: var(--mobile-medium-size-14-font-size);
  font-style: var(--mobile-medium-size-14-font-style);
  font-weight: var(--mobile-medium-size-14-font-weight);
  letter-spacing: var(--mobile-medium-size-14-letter-spacing);
  line-height: var(--mobile-medium-size-14-line-height);
  margin-top: -1.00px;
  position: relative;
}

.login .password {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 4px;
  position: relative;
  width: 100%;
}

.login .icon-instance-node {
  height: 24px !important;
  position: relative !important;
  width: 24px !important;
}

.login .text-wrapper-2 {
  align-self: stretch;
  color: var(--color-typography-700);
  font-family: var(--mobile-medium-size-14-font-family);
  font-size: var(--mobile-medium-size-14-font-size);
  font-style: var(--mobile-medium-size-14-font-style);
  font-weight: var(--mobile-medium-size-14-font-weight);
  letter-spacing: var(--mobile-medium-size-14-letter-spacing);
  line-height: var(--mobile-medium-size-14-line-height);
  position: relative;
  text-align: right;
}

.login .button {
  all: unset;
  align-items: center;
  align-self: stretch;
  background-color: var(--color-gray-100);
  border: 1px solid;
  border-color: var(--color-gray-100);
  border-radius: 8px;
  box-shadow: var(--shadow-light-xs);
  box-sizing: border-box;
  display: flex;
  flex: 0 0 auto;
  gap: 12px;
  justify-content: center;
  overflow: hidden;
  padding: 12px 24px;
  position: relative;
  width: 100%;
}

.login .button-2 {
  all: unset;
  box-sizing: border-box;
  color: var(--color-typography-300);
  font-family: var(--mobile-bold-size-14-font-family);
  font-size: var(--mobile-bold-size-14-font-size);
  font-style: var(--mobile-bold-size-14-font-style);
  font-weight: var(--mobile-bold-size-14-font-weight);
  letter-spacing: var(--mobile-bold-size-14-letter-spacing);
  line-height: var(--mobile-bold-size-14-line-height);
  margin-top: -1.00px;
  position: relative;
  white-space: nowrap;
  width: fit-content;
}

.login .divider {
  height: 1px;
  object-fit: cover;
  position: relative;
  width: 343px;
}

.login .button-group {
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: var(--spacing-spacing-spacing-16px);
  position: relative;
  width: 100%;
}

.login .button-social-instance {
  align-self: stretch !important;
  flex: 0 0 auto !important;
  width: 100% !important;
}

.login .button-social-2 {
  align-self: stretch !important;
  background: unset !important;
  background-color: var(--color-gray-800) !important;
  flex: 0 0 auto !important;
  width: 100% !important;
}

.login .don-t-have-an {
  color: transparent;
  font-family: "Manrope-Medium", Helvetica;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0.20px;
  line-height: 20px;
  position: relative;
  text-align: center;
  width: 343px;
}

.login .span {
  color: #3f3f46;
  font-family: var(--mobile-medium-size-12-font-family);
  font-size: var(--mobile-medium-size-12-font-size);
  font-style: var(--mobile-medium-size-12-font-style);
  font-weight: var(--mobile-medium-size-12-font-weight);
  letter-spacing: var(--mobile-medium-size-12-letter-spacing);
  line-height: var(--mobile-medium-size-12-line-height);
}

.login .text-wrapper-3 {
  color: #0a4a6f;
  font-family: var(--mobile-bold-size-12-font-family);
  font-size: var(--mobile-bold-size-12-font-size);
  font-style: var(--mobile-bold-size-12-font-style);
  font-weight: var(--mobile-bold-size-12-font-weight);
  letter-spacing: var(--mobile-bold-size-12-letter-spacing);
  line-height: var(--mobile-bold-size-12-line-height);
}

.login .footer {
  align-items: flex-end;
  align-self: stretch;
  background-color: transparent;
  display: flex;
  height: 96px;
  padding: 32px;
  position: relative;
  width: 100%;
}

.login .text-3 {
  color: #475466;
  font-family: var(--text-sm-regular-font-family);
  font-size: var(--text-sm-regular-font-size);
  font-style: var(--text-sm-regular-font-style);
  font-weight: var(--text-sm-regular-font-weight);
  letter-spacing: var(--text-sm-regular-letter-spacing);
  line-height: var(--text-sm-regular-line-height);
  position: relative;
  white-space: nowrap;
  width: fit-content;
}

.login .section-2 {
  align-self: stretch;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.2) 0%,
    rgba(0, 0, 0, 0.2) 100%
  );
  border-radius: 80px 0px 0px 80px;
  flex: 1;
  flex-grow: 1;
  position: relative;
}

.login .supporting-text-and {
  align-items: center;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  left: 56px;
  position: absolute;
  top: 848px;
  width: 688px;
}

.login .arrows {
  align-items: flex-start;
  display: inline-flex;
  flex: 0 0 auto;
  gap: 32px;
  position: relative;
}

.login .testiomonial-carousel-arrow {
  background-color: unset !important;
  border-color: #ffffff80 !important;
}

.login .quote {
  color: var(--white);
  font-family: var(--display-lg-medium-font-family);
  font-size: var(--display-lg-medium-font-size);
  font-style: var(--display-lg-medium-font-style);
  font-weight: var(--display-lg-medium-font-weight);
  left: 56px;
  letter-spacing: var(--display-lg-medium-letter-spacing);
  line-height: var(--display-lg-medium-line-height);
  position: absolute;
  top: 359px;
  width: 688px;
}

.login .name-and-text {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 12px;
  left: 56px;
  position: absolute;
  top: 141px;
  width: 688px;
}

.login .name {
  align-self: stretch;
  color: var(--white);
  font-family: var(--display-md-regular-font-family);
  font-size: var(--display-md-regular-font-size);
  font-style: var(--display-md-regular-font-style);
  font-weight: var(--display-md-regular-font-weight);
  letter-spacing: var(--display-md-regular-letter-spacing);
  line-height: var(--display-md-regular-line-height);
  margin-top: -1.00px;
  position: relative;
}
</style>