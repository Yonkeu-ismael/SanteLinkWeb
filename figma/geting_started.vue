<template>
    <div class="geting-started">
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
            <div class="div">
              <div class="text-wrapper">SanteLink</div>
              <p class="p">Begin your journey to better health!</p>
            </div>
  
            <div class="div">
              <button class="button">
                <button class="button-2">Continue With Phone Number</button>
              </button>
  
              <ButtonSocial
                class="button-social-instance"
                social="google"
                state="default"
                text
                theme="brand"
              />
              <ButtonSocial
                class="button-social-2"
                :icon="IconL({ class: 'icon-l-instance' })"
                social="apple"
                state="default"
                text
                theme="brand"
              />
              <p class="already-have-an">
                <span class="span">Already have an account? </span>
                <span class="text-wrapper-2">Sign In</span>
              </p>
            </div>
  
            <p class="by-signing-up-or">
              <span class="text-wrapper-3">
                By signing up or logging in, I accept the apps <br />
              </span>
              <span class="text-wrapper-4">Terms of Service</span>
              <span class="text-wrapper-3"> and </span>
              <span class="text-wrapper-4">Privacy Policy</span>
            </p>
          </div>
        </div>
  
        <footer class="footer">
          <div class="text">© SanteLink 2025</div>
        </footer>
      </div>
  
      <div class="section-2">
        <div class="name-and-text">
          <div class="name">Welcome</div>
        </div>
  
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
          We will assist you in efficiently and easily scheduling appointments
          with doctors.
          <br />
          Let's get started!
        </p>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import ButtonSocial from "./ButtonSocial";
  import IconL from "./IconL";
  import Logo from "./Logo";
  import Testiomonial from "./Testiomonial";
  
  export default defineComponent({
    name: "GetingStarted",
    components: {
      ButtonSocial,
      IconL,
      Logo,
      Testiomonial,
    },
  });
  </script>
  
  <style>
  .geting-started {
    align-items: center;
    background-color: #ffffff;
    display: flex;
    height: 960px;
    position: relative;
    width: 1440px;
  }
  
  .geting-started .section {
    align-items: center;
    align-self: stretch;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    width: 640px;
  }
  
  .geting-started .header-navigation {
    align-items: flex-start;
    align-self: stretch;
    display: flex;
    height: 96px;
    padding: 32px;
    position: relative;
    width: 100%;
  }
  
  .geting-started .logo-instance {
    width: 141.15px !important;
  }
  
  .geting-started .design-component-instance-node {
    margin-right: -31.11px !important;
  }
  
  .geting-started .container {
    align-items: center;
    align-self: stretch;
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    padding: 0px 32px;
    position: relative;
    width: 100%;
  }
  
  .geting-started .content {
    align-items: center;
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    gap: 32px;
    position: relative;
    width: 360px;
  }
  
  .geting-started .div {
    align-items: flex-start;
    align-self: stretch;
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    gap: var(--spacing-spacing-spacing-16px);
    position: relative;
    width: 100%;
  }
  
  .geting-started .text-wrapper {
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
  
  .geting-started .p {
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
  
  .geting-started .button {
    all: unset;
    align-items: center;
    align-self: stretch;
    background-color: var(--blue-light900);
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
  
  .geting-started .button-2 {
    all: unset;
    box-sizing: border-box;
    color: var(--basewhite);
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
  
  .geting-started .button-social-instance {
    align-self: stretch !important;
    flex: 0 0 auto !important;
    width: 100% !important;
  }
  
  .geting-started .icon-l-instance {
    height: 24px !important;
    position: relative !important;
    width: 24px !important;
  }
  
  .geting-started .button-social-2 {
    align-self: stretch !important;
    background: unset !important;
    background-color: var(--color-gray-800) !important;
    flex: 0 0 auto !important;
    width: 100% !important;
  }
  
  .geting-started .already-have-an {
    align-self: stretch;
    color: transparent;
    font-family: var(--mobile-medium-size-14-font-family);
    font-size: var(--mobile-medium-size-14-font-size);
    font-style: var(--mobile-medium-size-14-font-style);
    font-weight: var(--mobile-medium-size-14-font-weight);
    letter-spacing: var(--mobile-medium-size-14-letter-spacing);
    line-height: var(--mobile-medium-size-14-line-height);
    position: relative;
    text-align: center;
  }
  
  .geting-started .span {
    color: #3f3f46;
    font-family: var(--mobile-medium-size-14-font-family);
    font-size: var(--mobile-medium-size-14-font-size);
    font-style: var(--mobile-medium-size-14-font-style);
    font-weight: var(--mobile-medium-size-14-font-weight);
    letter-spacing: var(--mobile-medium-size-14-letter-spacing);
    line-height: var(--mobile-medium-size-14-line-height);
  }
  
  .geting-started .text-wrapper-2 {
    color: #0a4a6f;
    font-family: var(--mobile-medium-size-14-font-family);
    font-size: var(--mobile-medium-size-14-font-size);
    font-style: var(--mobile-medium-size-14-font-style);
    font-weight: var(--mobile-medium-size-14-font-weight);
    letter-spacing: var(--mobile-medium-size-14-letter-spacing);
    line-height: var(--mobile-medium-size-14-line-height);
  }
  
  .geting-started .by-signing-up-or {
    align-self: stretch;
    color: transparent;
    font-family: var(--mobile-medium-size-12-font-family);
    font-size: var(--mobile-medium-size-12-font-size);
    font-style: var(--mobile-medium-size-12-font-style);
    font-weight: var(--mobile-medium-size-12-font-weight);
    letter-spacing: var(--mobile-medium-size-12-letter-spacing);
    line-height: var(--mobile-medium-size-12-line-height);
    position: relative;
    text-align: center;
  }
  
  .geting-started .text-wrapper-3 {
    color: #3f3f46;
    font-family: var(--mobile-medium-size-12-font-family);
    font-size: var(--mobile-medium-size-12-font-size);
    font-style: var(--mobile-medium-size-12-font-style);
    font-weight: var(--mobile-medium-size-12-font-weight);
    letter-spacing: var(--mobile-medium-size-12-letter-spacing);
    line-height: var(--mobile-medium-size-12-line-height);
  }
  
  .geting-started .text-wrapper-4 {
    color: #0a4a6f;
    font-family: var(--mobile-medium-size-12-font-family);
    font-size: var(--mobile-medium-size-12-font-size);
    font-style: var(--mobile-medium-size-12-font-style);
    font-weight: var(--mobile-medium-size-12-font-weight);
    letter-spacing: var(--mobile-medium-size-12-letter-spacing);
    line-height: var(--mobile-medium-size-12-line-height);
  }
  
  .geting-started .footer {
    align-items: flex-end;
    align-self: stretch;
    background-color: transparent;
    display: flex;
    height: 96px;
    padding: 32px;
    position: relative;
    width: 100%;
  }
  
  .geting-started .text {
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
  
  .geting-started .section-2 {
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
  
  .geting-started .name-and-text {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    gap: 12px;
    left: 56px;
    position: absolute;
    top: 141px;
    width: 688px;
  }
  
  .geting-started .name {
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
  
  .geting-started .supporting-text-and {
    align-items: center;
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    left: 56px;
    position: absolute;
    top: 831px;
    width: 688px;
  }
  
  .geting-started .arrows {
    align-items: flex-start;
    display: inline-flex;
    flex: 0 0 auto;
    gap: 32px;
    position: relative;
  }
  
  .geting-started .testiomonial-carousel-arrow {
    background-color: unset !important;
    border-color: #ffffff80 !important;
  }
  
  .geting-started .quote {
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
  </style>