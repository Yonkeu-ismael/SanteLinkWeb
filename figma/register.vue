<template>
    <div class="register-complete">
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
              <div class="div">
                <div class="text-wrapper">Register</div>
  
                <p class="p">
                  Please enter a form to continue the register
                </p>
              </div>
  
              <div class="frame-2">
                <div class="div">
                  <div class="text">Full Name</div>
  
                  <div class="input-form">
                    <div class="text-2">Dwiky Setiawan</div>
                  </div>
                </div>
  
                <div class="div">
                  <div class="text">Email</div>
  
                  <div class="input-form">
                    <div class="text-2">cheers@design.com</div>
                  </div>
                </div>
  
                <div class="password">
                  <div class="div">
                    <div class="text">Password</div>
  
                    <div class="input-form">
                      <div class="text-2">********</div>
  
                      <IconR class="icon-r" />
                    </div>
                  </div>
  
                  <div class="indicator">
                    <div class="text-3">Strong</div>
  
                    <div class="pagination">
                      <div class="page" />
  
                      <div class="page" />
  
                      <div class="page-2" />
                    </div>
                  </div>
                </div>
  
                <div class="div">
                  <div class="text">Confirm password</div>
  
                  <div class="input-form">
                    <div class="text-2">********</div>
  
                    <IconR class="icon-r" />
                  </div>
                </div>
              </div>
            </div>
  
            <div class="button-group">
              <button class="button">
                <button class="button-2">Sign up</button>
              </button>
            </div>
          </div>
        </div>
  
        <footer class="footer">
          <div class="text-4">© SanteLink 2025</div>
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
  import { IconR } from "./IconR";
  import { Logo } from "./Logo";
  import { Testiomonial } from "./Testiomonial";
  
  export default defineComponent({
    name: "RegisterComplete",
    components: {
      IconR,
      Logo,
      Testiomonial,
    },
  });
  </script>
  
  <style>
  .register-complete {
    align-items: center;
    background-color: var(--basewhite);
    display: flex;
    height: 960px;
    position: relative;
    width: 1440px;
  }
  
  .register-complete .section {
    align-items: center;
    align-self: stretch;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    width: 640px;
  }
  
  .register-complete .header-navigation {
    align-items: flex-start;
    align-self: stretch;
    display: flex;
    height: 96px;
    padding: 32px;
    position: relative;
    width: 100%;
  }
  
  .register-complete .logo-instance {
    width: 141.15px !important;
  }
  
  .register-complete .design-component-instance-node {
    margin-right: -31.11px !important;
  }
  
  .register-complete .container {
    align-items: center;
    align-self: stretch;
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    padding: 0px 32px;
    position: relative;
    width: 100%;
  }
  
  .register-complete .content {
    align-items: center;
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    gap: 32px;
    position: relative;
    width: 360px;
  }
  
  .register-complete .frame {
    align-items: flex-start;
    align-self: stretch;
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    gap: 32px;
    position: relative;
    width: 100%;
  }
  
  .register-complete .div {
    align-items: flex-start;
    align-self: stretch;
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    gap: var(--spacing-spacing-spacing-8px);
    position: relative;
    width: 100%;
  }
  
  .register-complete .text-wrapper {
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
  
  .register-complete .p {
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
  
  .register-complete .frame-2 {
    align-items: flex-start;
    align-self: stretch;
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    gap: 16px;
    position: relative;
    width: 100%;
  }
  
  .register-complete .text {
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
  
  .register-complete .input-form {
    align-items: flex-start;
    align-self: stretch;
    background-color: var(--color-background-white);
    border: 1px solid;
    border-color: var(--color-gray-400);
    border-radius: 12px;
    display: flex;
    flex: 0 0 auto;
    gap: var(--spacing-spacing-spacing-12px);
    padding: var(--spacing-spacing-spacing-12px);
    position: relative;
    width: 100%;
  }
  
  .register-complete .text-2 {
    color: var(--color-typography-900);
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
  
  .register-complete .password {
    align-items: flex-start;
    align-self: stretch;
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    gap: 8px;
    position: relative;
    width: 100%;
  }
  
  .register-complete .icon-r {
    height: 24px !important;
    position: relative !important;
    width: 24px !important;
  }
  
  .register-complete .indicator {
    align-items: center;
    align-self: stretch;
    display: flex;
    flex: 0 0 auto;
    justify-content: space-between;
    position: relative;
    width: 100%;
  }
  
  .register-complete .text-3 {
    color: var(--color-success-500);
    font-family: var(--mobile-medium-size-12-font-family);
    font-size: var(--mobile-medium-size-12-font-size);
    font-style: var(--mobile-medium-size-12-font-style);
    font-weight: var(--mobile-medium-size-12-font-weight);
    letter-spacing: var(--mobile-medium-size-12-letter-spacing);
    line-height: var(--mobile-medium-size-12-line-height);
    margin-top: -1.00px;
    position: relative;
    white-space: nowrap;
    width: fit-content;
  }
  
  .register-complete .pagination {
    align-items: flex-start;
    display: flex;
    gap: 4px;
    height: 4px;
    position: relative;
    width: 151px;
  }
  
  .register-complete .page {
    align-self: stretch;
    background-color: var(--color-success-500);
    border-radius: 90px;
    flex: 1;
    flex-grow: 1;
    position: relative;
  }
  
  .register-complete .page-2 {
    align-self: stretch;
    background-color: var(--color-gray-200);
    border-radius: 90px;
    flex: 1;
    flex-grow: 1;
    position: relative;
  }
  
  .register-complete .button-group {
    all: unset;
    align-items: flex-start;
    align-self: stretch;
    box-sizing: border-box;
    display: flex;
    flex: 0 0 auto;
    flex-direction: column;
    gap: var(--spacing-spacing-spacing-16px);
    position: relative;
    width: 100%;
  }
  
  .register-complete .button {
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
  
  .register-complete .button-2 {
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
  
  .register-complete .footer {
    align-items: flex-end;
    align-self: stretch;
    background-color: transparent;
    display: flex;
    height: 96px;
    padding: 32px;
    position: relative;
    width: 100%;
  }
  
  .register-complete .text-4 {
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
  
  .register-complete .section-2 {
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
  
  .register-complete .supporting-text-and {
    align-items: center;
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    left: 56px;
    position: absolute;
    top: 848px;
    width: 688px;
  }
  
  .register-complete .arrows {
    align-items: flex-start;
    display: inline-flex;
    flex: 0 0 auto;
    gap: 32px;
    position: relative;
  }
  
  .register-complete .testiomonial-carousel-arrow {
    background-color: unset !important;
    border-color: #ffffff80 !important;
  }
  
  .register-complete .quote {
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
  
  .register-complete .name-and-text {
    align-items: flex-start;
    display: flex;
    flex-direction: column;
    gap: 12px;
    left: 56px;
    position: absolute;
    top: 141px;
    width: 688px;
  }
  
  .register-complete .name {
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