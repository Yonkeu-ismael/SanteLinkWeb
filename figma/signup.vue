<template>
    <div class="sign-up">
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
            <div class="text-and-supporting">
              <div class="text">Register</div>
  
              <p class="supporting-text">
                Please enter your number to continue your registration
              </p>
            </div>
  
            <div class="div">
              <div class="form">
                <div class="input-field">
                  <div class="text-wrapper">Phone Number</div>
  
                  <div class="input-form">
                    <div class="country-code">
                      <div class="flag">
                        <div class="overlap-group">
                          <img
                            class="rectangle"
                            alt="Rectangle"
                            src="./rectangle-3.svg"
                          />
                        </div>
                      </div>
  
                      <div class="text-wrapper-2">+1</div>
  
                      <div class="left-actionable">
                        <img class="vector" alt="Vector" src="./vector.svg" />
                      </div>
                    </div>
  
                    <div class="text-2">e.g 812-3123-3123</div>
                  </div>
                </div>
              </div>
  
              <button class="button">
                <button class="button-2">Continue</button>
              </button>
  
              <p class="already-have-an">
                <span class="span">Already have an account? </span>
  
                <span class="text-wrapper-3">Sign In</span>
              </p>
            </div>
  
            <p class="by-signing-up-or">
              <span class="text-wrapper-4">
                By signing up or logging in, i accept the apps <br />
              </span>
  
              <span class="text-wrapper-5">Terms of Service</span>
  
              <span class="text-wrapper-4"> and </span>
  
              <span class="text-wrapper-5">Privacy Policy</span>
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
  import Logo from "./Logo.vue";
  import Testiomonial from "./Testiomonial.vue";
  
  export default defineComponent({
    name: "SignUp",
    components: {
      Logo,
      Testiomonial,
    },
  });
  </script>
  
  <style>
  .sign-up {
    align-items: center;
    background-color: #ffffff;
    display: flex;
    height: 960px;
    position: relative;
    width: 1440px;
  }
  
  .sign-up .section {
    align-items: center;
    align-self: stretch;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    width: 640px;
  }
  
  .sign-up .header-navigation {
    align-items: flex-start;
    align-self: stretch;
    display: flex;
    height: 96px;
    padding: 32px;
    position: relative;
    width: 100%;
  }
  
  .sign-up .logo-instance {
    width: 141.15px !important;
  }
  
  .sign-up .design-component-instance-node {
    margin-right: -31.11px !important;
  }
  
  .sign-up .container {
    align-items: center;
    align-self: stretch;
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    padding: 0px 32px;
    position: relative;
    width: 100%;
  }
  
  .sign-up .content {
    align-items: center;
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    gap: 32px;
    position: relative;
    width: 360px;
  }
  
  .sign-up .text-and-supporting {
    align-items: flex-start;
    align-self: stretch;
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    gap: 12px;
    position: relative;
    width: 100%;
  }
  
  .sign-up .text {
    align-self: stretch;
    color: var(--gray-900);
    font-family: var(--display-sm-semibold-font-family);
    font-size: var(--display-sm-semibold-font-size);
    font-style: var(--display-sm-semibold-font-style);
    font-weight: var(--display-sm-semibold-font-weight);
    letter-spacing: var(--display-sm-semibold-letter-spacing);
    line-height: var(--display-sm-semibold-line-height);
    margin-top: -1.00px;
    position: relative;
  }
  
  .sign-up .supporting-text {
    align-self: stretch;
    color: var(--gray-600);
    font-family: var(--mobile-medium-size-14-font-family);
    font-size: var(--mobile-medium-size-14-font-size);
    font-style: var(--mobile-medium-size-14-font-style);
    font-weight: var(--mobile-medium-size-14-font-weight);
    letter-spacing: var(--mobile-medium-size-14-letter-spacing);
    line-height: var(--mobile-medium-size-14-line-height);
    position: relative;
  }
  
  .sign-up .div {
    align-items: center;
    align-self: stretch;
    border-radius: 12px;
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    gap: 24px;
    position: relative;
    width: 100%;
  }
  
  .sign-up .form {
    align-items: flex-start;
    align-self: stretch;
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    gap: 20px;
    position: relative;
    width: 100%;
  }
  
  .sign-up .input-field {
    align-items: flex-start;
    align-self: stretch;
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    gap: var(--spacing-spacing-spacing-8px);
    position: relative;
    width: 100%;
  }
  
  .sign-up .text-wrapper {
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
  
  .sign-up .input-form {
    align-items: flex-start;
    align-self: stretch;
    background-color: var(--color-background-white);
    border: 1px solid;
    border-color: var(--color-gray-300);
    border-radius: 12px;
    display: flex;
    flex: 0 0 auto;
    gap: var(--spacing-spacing-spacing-12px);
    padding: var(--spacing-spacing-spacing-12px)
      var(--spacing-spacing-spacing-16px) var(--spacing-spacing-spacing-12px)
      var(--spacing-spacing-spacing-16px);
    position: relative;
    width: 100%;
  }
  
  .sign-up .country-code {
    align-items: center;
    display: inline-flex;
    flex: 0 0 auto;
    gap: 4px;
    height: 24px;
    justify-content: center;
    position: relative;
  }
  
  .sign-up .flag {
    border-radius: 16px;
    height: 16px;
    position: relative;
    width: 20px;
  }
  
  .sign-up .overlap-group {
    background-color: var(--basewhite);
    border: 1px solid;
    border-color: var(--color-gray-100);
    border-radius: 2px;
    height: 18px;
    left: -1px;
    position: relative;
    top: -1px;
    width: 22px;
  }
  
  .sign-up .rectangle {
    height: 8px;
    left: 0;
    position: absolute;
    top: 0;
    width: 20px;
  }
  
  .sign-up .text-wrapper-2 {
    color: var(--color-background-black);
    font-family: var(--medium-size-16px-font-family);
    font-size: var(--medium-size-16px-font-size);
    font-style: var(--medium-size-16px-font-style);
    font-weight: var(--medium-size-16px-font-weight);
    letter-spacing: var(--medium-size-16px-letter-spacing);
    line-height: var(--medium-size-16px-line-height);
    margin-bottom: -1.00px;
    margin-top: -3.00px;
    position: relative;
    white-space: nowrap;
    width: fit-content;
  }
  
  .sign-up .left-actionable {
    height: 16px;
    position: relative;
    width: 16px;
  }
  
  .sign-up .vector {
    height: 6px;
    left: 3px;
    position: absolute;
    top: 5px;
    width: 10px;
  }
  
  .sign-up .text-2 {
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
  
  .sign-up .button {
    all: unset;
    align-items: center;
    align-self: stretch;
    background-color: var(--cyan-900);
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
  
  .sign-up .button-2 {
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
  
  .sign-up .already-have-an {
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
  
  .sign-up .span {
    color: #3f3f46;
    font-family: var(--mobile-medium-size-14-font-family);
    font-size: var(--mobile-medium-size-14-font-size);
    font-style: var(--mobile-medium-size-14-font-style);
    font-weight: var(--mobile-medium-size-14-font-weight);
    letter-spacing: var(--mobile-medium-size-14-letter-spacing);
    line-height: var(--mobile-medium-size-14-line-height);
  }
  
  .sign-up .text-wrapper-3 {
    color: #0a4a6f;
    font-family: var(--mobile-medium-size-14-font-family);
    font-size: var(--mobile-medium-size-14-font-size);
    font-style: var(--mobile-medium-size-14-font-style);
    font-weight: var(--mobile-medium-size-14-font-weight);
    letter-spacing: var(--mobile-medium-size-14-letter-spacing);
    line-height: var(--mobile-medium-size-14-line-height);
  }
  
  .sign-up .by-signing-up-or {
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
  
  .sign-up .text-wrapper-4 {
    color: #3f3f46;
    font-family: var(--mobile-medium-size-12-font-family);
    font-size: var(--mobile-medium-size-12-font-size);
    font-style: var(--mobile-medium-size-12-font-style);
    font-weight: var(--mobile-medium-size-12-font-weight);
    letter-spacing: var(--mobile-medium-size-12-letter-spacing);
    line-height: var(--mobile-medium-size-12-line-height);
  }
  
  .sign-up .text-wrapper-5 {
    color: #0a4a6f;
    font-family: var(--mobile-medium-size-12-font-family);
    font-size: var(--mobile-medium-size-12-font-size);
    font-style: var(--mobile-medium-size-12-font-style);
    font-weight: var(--mobile-medium-size-12-font-weight);
    letter-spacing: var(--mobile-medium-size-12-letter-spacing);
    line-height: var(--mobile-medium-size-12-line-height);
  }
  
  .sign-up .footer {
    align-items: flex-end;
    align-self: stretch;
    background-color: transparent;
    display: flex;
    height: 96px;
    padding: 32px;
    position: relative;
    width: 100%;
  }
  
  .sign-up .text-3 {
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
  
  .sign-up .section-2 {
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
  
  .sign-up .supporting-text-and {
    align-items: center;
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    left: 56px;
    position: absolute;
    top: 848px;
    width: 688px;
  }
  
  .sign-up .arrows {
    align-items: flex-start;
    display: inline-flex;
    flex: 0 0 auto;
    gap: 32px;
    position: relative;
  }
  
  .sign-up .testiomonial-carousel-arrow {
    background-color: unset !important;
    border-color: #ffffff80 !important;
  }
  
  .sign-up .quote {
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
  
  .sign-up .name-and-text {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    gap: 12px;
    left: 56px;
    position: absolute;
    top: 141px;
    width: 688px;
  }
  
  .sign-up .name {
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