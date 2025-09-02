<template>
    <div class="OTP">
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
            <div class="onboard-text">
              <div class="text-wrapper">Send OTP Code</div>
  
              <p class="enter-the-digit">
                <span class="span">
                  Enter the 6-digit that we have sent via the
                  <br />
                  phone number to
                </span>
  
                <span class="text-wrapper-2"> +62 812- 2569 - 2023</span>
              </p>
            </div>
  
            <div class="input">
              <div class="input-field">
                <div class="div-wrapper">
                  <div class="div">●</div>
                </div>
  
                <div class="div-wrapper">
                  <div class="div">●</div>
                </div>
  
                <div class="cursor-wrapper">
                  <img class="cursor" alt="Cursor" src="./cursor.svg" />
                </div>
  
                <div class="input-2" />
  
                <div class="input-2" />
  
                <div class="input-2" />
              </div>
  
              <div class="timer">
                <TimerFill class="timer-fill" />
                <div class="text-wrapper-3">00:59</div>
              </div>
            </div>
          </div>
        </div>
  
        <footer class="footer">
          <div class="text">© SanteLink 2025</div>
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
  import { Logo } from "./Logo";
  import { Testiomonial } from "./Testiomonial";
  import { TimerFill } from "./TimerFill";
  
  export default defineComponent({
    name: "Otp",
    components: {
      Logo,
      Testiomonial,
      TimerFill,
    },
  });
  </script>
  
  <style>
  .OTP {
    align-items: center;
    background-color: var(--basewhite);
    display: flex;
    height: 960px;
    position: relative;
    width: 1440px;
  }
  
  .OTP .section {
    align-items: center;
    align-self: stretch;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    width: 640px;
  }
  
  .OTP .header-navigation {
    align-items: flex-start;
    align-self: stretch;
    display: flex;
    height: 96px;
    padding: 32px;
    position: relative;
    width: 100%;
  }
  
  .OTP .logo-instance {
    width: 141.15px !important;
  }
  
  .OTP .design-component-instance-node {
    margin-right: -31.11px !important;
  }
  
  .OTP .container {
    align-items: center;
    align-self: stretch;
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    padding: 0px 32px;
    position: relative;
    width: 100%;
  }
  
  .OTP .content {
    align-items: center;
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    gap: 32px;
    position: relative;
    width: 360px;
  }
  
  .OTP .onboard-text {
    align-items: flex-start;
    align-self: stretch;
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    gap: var(--spacing-spacing-spacing-8px);
    position: relative;
    width: 100%;
  }
  
  .OTP .text-wrapper {
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
  
  .OTP .enter-the-digit {
    align-self: stretch;
    color: var(--color-typography-700);
    font-family: "Manrope-Medium", Helvetica;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 0.20px;
    line-height: 24px;
    position: relative;
  }
  
  .OTP .span {
    color: #3f3f46;
    font-family: var(--mobile-medium-size-14-font-family);
    font-size: var(--mobile-medium-size-14-font-size);
    font-style: var(--mobile-medium-size-14-font-style);
    font-weight: var(--mobile-medium-size-14-font-weight);
    letter-spacing: var(--mobile-medium-size-14-letter-spacing);
    line-height: var(--mobile-medium-size-14-line-height);
  }
  
  .OTP .text-wrapper-2 {
    color: #18181b;
    font-family: var(--mobile-bold-size-14-font-family);
    font-size: var(--mobile-bold-size-14-font-size);
    font-style: var(--mobile-bold-size-14-font-style);
    font-weight: var(--mobile-bold-size-14-font-weight);
    letter-spacing: var(--mobile-bold-size-14-letter-spacing);
    line-height: var(--mobile-bold-size-14-line-height);
  }
  
  .OTP .input {
    align-items: flex-end;
    align-self: stretch;
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    gap: 24px;
    position: relative;
    width: 100%;
  }
  
  .OTP .input-field {
    align-items: flex-start;
    display: flex;
    flex: 0 0 auto;
    gap: 15px;
    position: relative;
    width: 341px;
  }
  
  .OTP .div-wrapper {
    align-items: center;
    background-color: var(--color-typography-50);
    border: 1px solid;
    border-color: var(--cyan-900);
    border-radius: 12px;
    display: flex;
    flex: 1;
    flex-direction: column;
    flex-grow: 1;
    gap: 10px;
    height: 44px;
    justify-content: center;
    overflow: hidden;
    padding: var(--spacing-spacing-spacing-12px);
    position: relative;
  }
  
  .OTP .div {
    color: var(--color-typography-900);
    font-family: "Inter-Bold", Helvetica;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0.20px;
    line-height: 24px;
    margin-bottom: -1.00px;
    margin-top: -3.00px;
    position: relative;
    text-align: center;
    white-space: nowrap;
    width: fit-content;
  }
  
  .OTP .cursor-wrapper {
    align-items: center;
    background-color: var(--color-gray-50);
    border: 1px solid;
    border-color: var(--cyan-900);
    border-radius: 12px;
    display: flex;
    flex: 1;
    flex-direction: column;
    flex-grow: 1;
    gap: 10px;
    height: 44px;
    justify-content: flex-end;
    overflow: hidden;
    padding: var(--spacing-spacing-spacing-12px);
    position: relative;
  }
  
  .OTP .cursor {
    align-self: stretch;
    height: 1px;
    object-fit: cover;
    position: relative;
    width: 100%;
  }
  
  .OTP .input-2 {
    background-color: var(--color-gray-50);
    border: 1px solid;
    border-color: var(--color-gray-300);
    border-radius: 12px;
    flex: 1;
    flex-grow: 1;
    height: 44px;
    position: relative;
  }
  
  .OTP .timer {
    align-items: flex-start;
    display: flex;
    flex: 0 0 auto;
    gap: var(--spacing-spacing-spacing-8px);
    position: relative;
    width: 342px;
  }
  
  .OTP .timer-fill {
    height: 20px !important;
    position: relative !important;
    width: 20px !important;
  }
  
  .OTP .text-wrapper-3 {
    color: var(--color-typography-700);
    flex: 1;
    font-family: var(--mobile-bold-size-12-font-family);
    font-size: var(--mobile-bold-size-12-font-size);
    font-style: var(--mobile-bold-size-12-font-style);
    font-weight: var(--mobile-bold-size-12-font-weight);
    letter-spacing: var(--mobile-bold-size-12-letter-spacing);
    line-height: var(--mobile-bold-size-12-line-height);
    margin-top: -1.00px;
    position: relative;
  }
  
  .OTP .footer {
    align-items: flex-end;
    align-self: stretch;
    background-color: transparent;
    display: flex;
    height: 96px;
    padding: 32px;
    position: relative;
    width: 100%;
  }
  
  .OTP .text {
    color: var(--gray-600);
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
  
  .OTP .section-2 {
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
  
  .OTP .supporting-text-and {
    align-items: center;
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    left: 56px;
    position: absolute;
    top: 848px;
    width: 688px;
  }
  
  .OTP .arrows {
    align-items: flex-start;
    display: inline-flex;
    flex: 0 0 auto;
    gap: 32px;
    position: relative;
  }
  
  .OTP .testiomonial-carousel-arrow {
    background-color: unset !important;
    border-color: #ffffff80 !important;
  }
  
  .OTP .quote {
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
  
  .OTP .name-and-text {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    gap: 12px;
    left: 56px;
    position: absolute;
    top: 141px;
    width: 688px;
  }
  
  .OTP .name {
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