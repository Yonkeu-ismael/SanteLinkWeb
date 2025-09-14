<template>
  <div class="sign-up">
    <!-- Notification d'erreur -->
    <div v-if="showError" class="error-notification" @click="hideError">
      <div class="error-content">
        <div class="error-icon">⚠️</div>
        <div class="error-message">{{ errorMessage }}</div>
        <div class="error-close">×</div>
      </div>
    </div>

    <!-- Notification de succès -->
    <div v-if="showSuccess" class="success-notification" @click="hideSuccess">
      <div class="success-content">
        <div class="success-icon">✅</div>
        <div class="success-message">{{ successMessage }}</div>
        <div class="success-close">×</div>
      </div>
    </div>
    <div class="section">
      <!-- Flèche de retour mobile -->
      <div class="mobile-back-button" @click="goBack">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      
      <div class="header-navigation">
        <div class="logo-container">
          <img src="/images/SanteLink.svg" alt="SanteLink" class="logo" />
          
        </div>
        
      </div>

      <div class="container">
        <div class="content">
          <div class="text-and-supporting">
            <div class="text">{{ t('register') }}</div>

            <p class="supporting-text">
              {{ t('enterPhoneToContinue') }}
            </p>
          </div>

          <div class="div">
            <div class="form">
              <div class="input-field">
                <div class="text-wrapper">{{ t('phoneNumber') }}</div>

                <div class="input-form">
                  <div class="country-code" @click="toggleCountryDropdown">
                    <div class="flag">
                      <div class="flag-placeholder">
                        <span class="flag-emoji">{{ getFlagEmoji(selectedCountry.code) }}</span>
                      </div>
                    </div>

                    <div class="text-wrapper-2">+{{ selectedCountry.dialCode }}</div>

                    <div class="left-actionable">
                      <svg class="vector" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                  </div>

                  <!-- Dropdown des pays -->
                  <div v-if="showCountryDropdown" class="country-dropdown">
                    <div class="search-container">
                      <input
                        v-model="countrySearch"
                        type="text"
                        class="search-input"
                        placeholder="Rechercher un pays..."
                        @input="filterCountries"
                      />
                    </div>
                    <div class="countries-list">
                      <div
                        v-for="country in filteredCountries"
                        :key="country.code"
                        class="country-option"
                        @click="selectCountry(country)"
                      >
                        <span class="country-flag-emoji">{{ getFlagEmoji(country.code) }}</span>
                        <span class="country-name">{{ country.name }}</span>
                        <span class="country-dial">+{{ country.dialCode }}</span>
                      </div>
                    </div>
                  </div>

                  <input 
                    v-model="formattedPhoneNumber"
                    type="tel"
                    class="phone-input"
                    :placeholder="selectedCountry.placeholder"
                    @keyup.enter="handleContinue"
                    @input="formatPhoneNumber"
                  />
              </div>
            </div>
            <button class="button" @click="handleContinue" :disabled="!phoneNumber.trim() || isSending">
              <button class="button-2">
                <span v-if="isSending">Envoi en cours...</span>
                <span v-else>{{ t('continue') }}</span>
              </button>
            </button>

              <p class="already-have-an">
                <span class="span">{{ t('alreadyHaveAccount') }} </span>
                <span class="text-wrapper-3" @click="goToLogin">{{ t('signIn') }}</span>
              </p>

          <p class="by-signing-up-or">
              <span class="text-wrapper-4">
                {{ t('bySigningUpText') }} <br />
              </span>

              <span class="text-wrapper-5">{{ t('termsOfService') }}</span>

              <span class="text-wrapper-4"> {{ t('and') }} </span>

              <span class="text-wrapper-5">{{ t('privacyPolicy') }}</span>
            </p>

        </div>

      </div>

        </div>
      </div>

      <footer class="footer">
        <div class="text-3">© SanteLink 2025</div>
      </footer>
    </div>

    <div class="section-2">
      <div class="navigation-buttons">
        <button class="nav-arrow left-arrow" @click="previousSlide">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button class="nav-arrow right-arrow" @click="nextSlide">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <p class="quote">
        {{ t('testimonialQuote') }}
      </p>

      <div class="name-and-text">
        <div class="name">{{ t('welcome') }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { t as T } from '@/i18n'
import { sendOTP } from '@/api/auth'
import { isMockMode, mockDelay } from '@/config/dev'
import { getApiConfig } from '@/config/api'

const t = (key: Parameters<typeof T>[0]) => T(key)

const router = useRouter()


const phoneNumber = ref('')
const formattedPhoneNumber = ref('')
const isSending = ref(false)

// Variables pour les notifications
const showError = ref(false)
const showSuccess = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

// Variables pour le sélecteur de pays
const showCountryDropdown = ref(false)
const countrySearch = ref('')
const filteredCountries = ref<any[]>([])

// Liste des pays avec drapeaux et indicatifs
const countries = [
  { code: 'US', name: 'États-Unis', dialCode: '1', flag: '/images/flags/us.svg', placeholder: 'e.g. 555-123-4567' },
  { code: 'CA', name: 'Canada', dialCode: '1', flag: '/images/flags/ca.svg', placeholder: 'e.g. 555-123-4567' },
  { code: 'FR', name: 'France', dialCode: '33', flag: '/images/flags/fr.svg', placeholder: 'e.g. 6 12 34 56 78' },
  { code: 'GB', name: 'Royaume-Uni', dialCode: '44', flag: '/images/flags/gb.svg', placeholder: 'e.g. 7123 456789' },
  { code: 'DE', name: 'Allemagne', dialCode: '49', flag: '/images/flags/de.svg', placeholder: 'e.g. 151 12345678' },
  { code: 'IT', name: 'Italie', dialCode: '39', flag: '/images/flags/it.svg', placeholder: 'e.g. 312 3456789' },
  { code: 'ES', name: 'Espagne', dialCode: '34', flag: '/images/flags/es.svg', placeholder: 'e.g. 612 345678' },
  { code: 'BE', name: 'Belgique', dialCode: '32', flag: '/images/flags/be.svg', placeholder: 'e.g. 470 123456' },
  { code: 'CH', name: 'Suisse', dialCode: '41', flag: '/images/flags/ch.svg', placeholder: 'e.g. 76 123 45 67' },
  { code: 'NL', name: 'Pays-Bas', dialCode: '31', flag: '/images/flags/nl.svg', placeholder: 'e.g. 6 12345678' },
  { code: 'SE', name: 'Suède', dialCode: '46', flag: '/images/flags/se.svg', placeholder: 'e.g. 70 123 45 67' },
  { code: 'NO', name: 'Norvège', dialCode: '47', flag: '/images/flags/no.svg', placeholder: 'e.g. 412 34 567' },
  { code: 'DK', name: 'Danemark', dialCode: '45', flag: '/images/flags/dk.svg', placeholder: 'e.g. 20 12 34 56' },
  { code: 'FI', name: 'Finlande', dialCode: '358', flag: '/images/flags/fi.svg', placeholder: 'e.g. 40 123 4567' },
  { code: 'PL', name: 'Pologne', dialCode: '48', flag: '/images/flags/pl.svg', placeholder: 'e.g. 512 345 678' },
  { code: 'CZ', name: 'République tchèque', dialCode: '420', flag: '/images/flags/cz.svg', placeholder: 'e.g. 601 234 567' },
  { code: 'AT', name: 'Autriche', dialCode: '43', flag: '/images/flags/at.svg', placeholder: 'e.g. 664 123456' },
  { code: 'HU', name: 'Hongrie', dialCode: '36', flag: '/images/flags/hu.svg', placeholder: 'e.g. 20 123 4567' },
  { code: 'RO', name: 'Roumanie', dialCode: '40', flag: '/images/flags/ro.svg', placeholder: 'e.g. 712 345 678' },
  { code: 'BG', name: 'Bulgarie', dialCode: '359', flag: '/images/flags/bg.svg', placeholder: 'e.g. 888 123 456' },
  { code: 'HR', name: 'Croatie', dialCode: '385', flag: '/images/flags/hr.svg', placeholder: 'e.g. 91 234 5678' },
  { code: 'SI', name: 'Slovénie', dialCode: '386', flag: '/images/flags/si.svg', placeholder: 'e.g. 31 234 567' },
  { code: 'SK', name: 'Slovaquie', dialCode: '421', flag: '/images/flags/sk.svg', placeholder: 'e.g. 901 234 567' },
  { code: 'LT', name: 'Lituanie', dialCode: '370', flag: '/images/flags/lt.svg', placeholder: 'e.g. 612 34567' },
  { code: 'LV', name: 'Lettonie', dialCode: '371', flag: '/images/flags/lv.svg', placeholder: 'e.g. 212 34567' },
  { code: 'EE', name: 'Estonie', dialCode: '372', flag: '/images/flags/ee.svg', placeholder: 'e.g. 512 3456' },
  { code: 'IE', name: 'Irlande', dialCode: '353', flag: '/images/flags/ie.svg', placeholder: 'e.g. 83 123 4567' },
  { code: 'PT', name: 'Portugal', dialCode: '351', flag: '/images/flags/pt.svg', placeholder: 'e.g. 912 345 678' },
  { code: 'GR', name: 'Grèce', dialCode: '30', flag: '/images/flags/gr.svg', placeholder: 'e.g. 691 234 5678' },
  { code: 'CY', name: 'Chypre', dialCode: '357', flag: '/images/flags/cy.svg', placeholder: 'e.g. 96 123456' },
  { code: 'MT', name: 'Malte', dialCode: '356', flag: '/images/flags/mt.svg', placeholder: 'e.g. 7961 2345' },
  { code: 'LU', name: 'Luxembourg', dialCode: '352', flag: '/images/flags/lu.svg', placeholder: 'e.g. 621 123 456' },
  { code: 'IS', name: 'Islande', dialCode: '354', flag: '/images/flags/is.svg', placeholder: 'e.g. 660 1234' },
  { code: 'AL', name: 'Albanie', dialCode: '355', flag: '/images/flags/al.svg', placeholder: 'e.g. 67 123 4567' },
  { code: 'MK', name: 'Macédoine du Nord', dialCode: '389', flag: '/images/flags/mk.svg', placeholder: 'e.g. 72 123 456' },
  { code: 'ME', name: 'Monténégro', dialCode: '382', flag: '/images/flags/me.svg', placeholder: 'e.g. 67 123 456' },
  { code: 'RS', name: 'Serbie', dialCode: '381', flag: '/images/flags/rs.svg', placeholder: 'e.g. 60 123 4567' },
  { code: 'BA', name: 'Bosnie-Herzégovine', dialCode: '387', flag: '/images/flags/ba.svg', placeholder: 'e.g. 61 123 456' },
  { code: 'XK', name: 'Kosovo', dialCode: '383', flag: '/images/flags/xk.svg', placeholder: 'e.g. 44 123 456' },
  { code: 'MD', name: 'Moldavie', dialCode: '373', flag: '/images/flags/md.svg', placeholder: 'e.g. 601 23456' },
  { code: 'UA', name: 'Ukraine', dialCode: '380', flag: '/images/flags/ua.svg', placeholder: 'e.g. 50 123 4567' },
  { code: 'BY', name: 'Biélorussie', dialCode: '375', flag: '/images/flags/by.svg', placeholder: 'e.g. 25 123 4567' },
  { code: 'RU', name: 'Russie', dialCode: '7', flag: '/images/flags/ru.svg', placeholder: 'e.g. 912 345 6789' },
  { code: 'TR', name: 'Turquie', dialCode: '90', flag: '/images/flags/tr.svg', placeholder: 'e.g. 532 123 4567' },
  { code: 'IL', name: 'Israël', dialCode: '972', flag: '/images/flags/il.svg', placeholder: 'e.g. 50 123 4567' },
  { code: 'AE', name: 'Émirats arabes unis', dialCode: '971', flag: '/images/flags/ae.svg', placeholder: 'e.g. 50 123 4567' },
  { code: 'SA', name: 'Arabie saoudite', dialCode: '966', flag: '/images/flags/sa.svg', placeholder: 'e.g. 50 123 4567' },
  { code: 'QA', name: 'Qatar', dialCode: '974', flag: '/images/flags/qa.svg', placeholder: 'e.g. 3012 3456' },
  { code: 'KW', name: 'Koweït', dialCode: '965', flag: '/images/flags/kw.svg', placeholder: 'e.g. 500 12345' },
  { code: 'BH', name: 'Bahreïn', dialCode: '973', flag: '/images/flags/bh.svg', placeholder: 'e.g. 3000 1234' },
  { code: 'OM', name: 'Oman', dialCode: '968', flag: '/images/flags/om.svg', placeholder: 'e.g. 9000 1234' },
  { code: 'JO', name: 'Jordanie', dialCode: '962', flag: '/images/flags/jo.svg', placeholder: 'e.g. 79 123 4567' },
  { code: 'LB', name: 'Liban', dialCode: '961', flag: '/images/flags/lb.svg', placeholder: 'e.g. 70 123 456' },
  { code: 'SY', name: 'Syrie', dialCode: '963', flag: '/images/flags/sy.svg', placeholder: 'e.g. 93 123 4567' },
  { code: 'IQ', name: 'Irak', dialCode: '964', flag: '/images/flags/iq.svg', placeholder: 'e.g. 750 123 4567' },
  { code: 'IR', name: 'Iran', dialCode: '98', flag: '/images/flags/ir.svg', placeholder: 'e.g. 912 123 4567' },
  { code: 'AF', name: 'Afghanistan', dialCode: '93', flag: '/images/flags/af.svg', placeholder: 'e.g. 70 123 4567' },
  { code: 'PK', name: 'Pakistan', dialCode: '92', flag: '/images/flags/pk.svg', placeholder: 'e.g. 300 123 4567' },
  { code: 'IN', name: 'Inde', dialCode: '91', flag: '/images/flags/in.svg', placeholder: 'e.g. 98765 43210' },
  { code: 'BD', name: 'Bangladesh', dialCode: '880', flag: '/images/flags/bd.svg', placeholder: 'e.g. 1712 345678' },
  { code: 'LK', name: 'Sri Lanka', dialCode: '94', flag: '/images/flags/lk.svg', placeholder: 'e.g. 71 123 4567' },
  { code: 'NP', name: 'Népal', dialCode: '977', flag: '/images/flags/np.svg', placeholder: 'e.g. 984 123 4567' },
  { code: 'BT', name: 'Bhoutan', dialCode: '975', flag: '/images/flags/bt.svg', placeholder: 'e.g. 17 123 456' },
  { code: 'MV', name: 'Maldives', dialCode: '960', flag: '/images/flags/mv.svg', placeholder: 'e.g. 777 1234' },
  { code: 'MM', name: 'Myanmar', dialCode: '95', flag: '/images/flags/mm.svg', placeholder: 'e.g. 9 123 456 789' },
  { code: 'TH', name: 'Thaïlande', dialCode: '66', flag: '/images/flags/th.svg', placeholder: 'e.g. 81 234 5678' },
  { code: 'LA', name: 'Laos', dialCode: '856', flag: '/images/flags/la.svg', placeholder: 'e.g. 20 1234 5678' },
  { code: 'KH', name: 'Cambodge', dialCode: '855', flag: '/images/flags/kh.svg', placeholder: 'e.g. 12 234 567' },
  { code: 'VN', name: 'Vietnam', dialCode: '84', flag: '/images/flags/vn.svg', placeholder: 'e.g. 90 123 4567' },
  { code: 'MY', name: 'Malaisie', dialCode: '60', flag: '/images/flags/my.svg', placeholder: 'e.g. 12 345 6789' },
  { code: 'SG', name: 'Singapour', dialCode: '65', flag: '/images/flags/sg.svg', placeholder: 'e.g. 8123 4567' },
  { code: 'ID', name: 'Indonésie', dialCode: '62', flag: '/images/flags/id.svg', placeholder: 'e.g. 812 3456 7890' },
  { code: 'PH', name: 'Philippines', dialCode: '63', flag: '/images/flags/ph.svg', placeholder: 'e.g. 912 345 6789' },
  { code: 'BN', name: 'Brunei', dialCode: '673', flag: '/images/flags/bn.svg', placeholder: 'e.g. 712 3456' },
  { code: 'TL', name: 'Timor oriental', dialCode: '670', flag: '/images/flags/tl.svg', placeholder: 'e.g. 772 12345' },
  { code: 'CN', name: 'Chine', dialCode: '86', flag: '/images/flags/cn.svg', placeholder: 'e.g. 138 1234 5678' },
  { code: 'TW', name: 'Taïwan', dialCode: '886', flag: '/images/flags/tw.svg', placeholder: 'e.g. 912 345 678' },
  { code: 'HK', name: 'Hong Kong', dialCode: '852', flag: '/images/flags/hk.svg', placeholder: 'e.g. 5123 4567' },
  { code: 'MO', name: 'Macao', dialCode: '853', flag: '/images/flags/mo.svg', placeholder: 'e.g. 6123 4567' },
  { code: 'JP', name: 'Japon', dialCode: '81', flag: '/images/flags/jp.svg', placeholder: 'e.g. 90 1234 5678' },
  { code: 'KR', name: 'Corée du Sud', dialCode: '82', flag: '/images/flags/kr.svg', placeholder: 'e.g. 10 1234 5678' },
  { code: 'KP', name: 'Corée du Nord', dialCode: '850', flag: '/images/flags/kp.svg', placeholder: 'e.g. 191 123 4567' },
  { code: 'MN', name: 'Mongolie', dialCode: '976', flag: '/images/flags/mn.svg', placeholder: 'e.g. 9911 2345' },
  { code: 'KZ', name: 'Kazakhstan', dialCode: '7', flag: '/images/flags/kz.svg', placeholder: 'e.g. 701 123 4567' },
  { code: 'KG', name: 'Kirghizistan', dialCode: '996', flag: '/images/flags/kg.svg', placeholder: 'e.g. 700 123 456' },
  { code: 'TJ', name: 'Tadjikistan', dialCode: '992', flag: '/images/flags/tj.svg', placeholder: 'e.g. 900 123 456' },
  { code: 'UZ', name: 'Ouzbékistan', dialCode: '998', flag: '/images/flags/uz.svg', placeholder: 'e.g. 90 123 4567' },
  { code: 'TM', name: 'Turkménistan', dialCode: '993', flag: '/images/flags/tm.svg', placeholder: 'e.g. 61 123 456' },
  { code: 'AZ', name: 'Azerbaïdjan', dialCode: '994', flag: '/images/flags/az.svg', placeholder: 'e.g. 50 123 4567' },
  { code: 'GE', name: 'Géorgie', dialCode: '995', flag: '/images/flags/ge.svg', placeholder: 'e.g. 599 123 456' },
  { code: 'AM', name: 'Arménie', dialCode: '374', flag: '/images/flags/am.svg', placeholder: 'e.g. 91 123 456' },
  { code: 'AU', name: 'Australie', dialCode: '61', flag: '/images/flags/au.svg', placeholder: 'e.g. 412 345 678' },
  { code: 'NZ', name: 'Nouvelle-Zélande', dialCode: '64', flag: '/images/flags/nz.svg', placeholder: 'e.g. 21 123 4567' },
  { code: 'FJ', name: 'Fidji', dialCode: '679', flag: '/images/flags/fj.svg', placeholder: 'e.g. 701 2345' },
  { code: 'PG', name: 'Papouasie-Nouvelle-Guinée', dialCode: '675', flag: '/images/flags/pg.svg', placeholder: 'e.g. 701 23456' },
  { code: 'SB', name: 'Îles Salomon', dialCode: '677', flag: '/images/flags/sb.svg', placeholder: 'e.g. 74 12345' },
  { code: 'VU', name: 'Vanuatu', dialCode: '678', flag: '/images/flags/vu.svg', placeholder: 'e.g. 74 12345' },
  { code: 'NC', name: 'Nouvelle-Calédonie', dialCode: '687', flag: '/images/flags/nc.svg', placeholder: 'e.g. 74 12345' },
  { code: 'PF', name: 'Polynésie française', dialCode: '689', flag: '/images/flags/pf.svg', placeholder: 'e.g. 87 123 456' },
  { code: 'CK', name: 'Îles Cook', dialCode: '682', flag: '/images/flags/ck.svg', placeholder: 'e.g. 71 234' },
  { code: 'TO', name: 'Tonga', dialCode: '676', flag: '/images/flags/to.svg', placeholder: 'e.g. 71 234' },
  { code: 'WS', name: 'Samoa', dialCode: '685', flag: '/images/flags/ws.svg', placeholder: 'e.g. 71 234' },
  { code: 'KI', name: 'Kiribati', dialCode: '686', flag: '/images/flags/ki.svg', placeholder: 'e.g. 71 234' },
  { code: 'TV', name: 'Tuvalu', dialCode: '688', flag: '/images/flags/tv.svg', placeholder: 'e.g. 71 234' },
  { code: 'NR', name: 'Nauru', dialCode: '674', flag: '/images/flags/nr.svg', placeholder: 'e.g. 71 234' },
  { code: 'PW', name: 'Palaos', dialCode: '680', flag: '/images/flags/pw.svg', placeholder: 'e.g. 71 234' },
  { code: 'MH', name: 'Îles Marshall', dialCode: '692', flag: '/images/flags/mh.svg', placeholder: 'e.g. 71 234' },
  { code: 'FM', name: 'Micronésie', dialCode: '691', flag: '/images/flags/fm.svg', placeholder: 'e.g. 71 234' },
  { code: 'GU', name: 'Guam', dialCode: '1', flag: '/images/flags/gu.svg', placeholder: 'e.g. 671 123 4567' },
  { code: 'MP', name: 'Îles Mariannes du Nord', dialCode: '1', flag: '/images/flags/mp.svg', placeholder: 'e.g. 670 123 4567' },
  { code: 'AS', name: 'Samoa américaines', dialCode: '1', flag: '/images/flags/as.svg', placeholder: 'e.g. 684 123 4567' },
  { code: 'PR', name: 'Porto Rico', dialCode: '1', flag: '/images/flags/pr.svg', placeholder: 'e.g. 787 123 4567' },
  { code: 'VI', name: 'Îles Vierges américaines', dialCode: '1', flag: '/images/flags/vi.svg', placeholder: 'e.g. 340 123 4567' },
  { code: 'MX', name: 'Mexique', dialCode: '52', flag: '/images/flags/mx.svg', placeholder: 'e.g. 55 1234 5678' },
  { code: 'GT', name: 'Guatemala', dialCode: '502', flag: '/images/flags/gt.svg', placeholder: 'e.g. 5123 4567' },
  { code: 'BZ', name: 'Belize', dialCode: '501', flag: '/images/flags/bz.svg', placeholder: 'e.g. 612 3456' },
  { code: 'SV', name: 'El Salvador', dialCode: '503', flag: '/images/flags/sv.svg', placeholder: 'e.g. 7123 4567' },
  { code: 'HN', name: 'Honduras', dialCode: '504', flag: '/images/flags/hn.svg', placeholder: 'e.g. 9123 4567' },
  { code: 'NI', name: 'Nicaragua', dialCode: '505', flag: '/images/flags/ni.svg', placeholder: 'e.g. 8123 4567' },
  { code: 'CR', name: 'Costa Rica', dialCode: '506', flag: '/images/flags/cr.svg', placeholder: 'e.g. 6123 4567' },
  { code: 'PA', name: 'Panama', dialCode: '507', flag: '/images/flags/pa.svg', placeholder: 'e.g. 6123 4567' },
  { code: 'CO', name: 'Colombie', dialCode: '57', flag: '/images/flags/co.svg', placeholder: 'e.g. 300 123 4567' },
  { code: 'VE', name: 'Venezuela', dialCode: '58', flag: '/images/flags/ve.svg', placeholder: 'e.g. 412 123 4567' },
  { code: 'GY', name: 'Guyana', dialCode: '592', flag: '/images/flags/gy.svg', placeholder: 'e.g. 612 3456' },
  { code: 'SR', name: 'Suriname', dialCode: '597', flag: '/images/flags/sr.svg', placeholder: 'e.g. 612 3456' },
  { code: 'GF', name: 'Guyane française', dialCode: '594', flag: '/images/flags/gf.svg', placeholder: 'e.g. 612 3456' },
  { code: 'BR', name: 'Brésil', dialCode: '55', flag: '/images/flags/br.svg', placeholder: 'e.g. 11 91234 5678' },
  { code: 'EC', name: 'Équateur', dialCode: '593', flag: '/images/flags/ec.svg', placeholder: 'e.g. 99 123 4567' },
  { code: 'PE', name: 'Pérou', dialCode: '51', flag: '/images/flags/pe.svg', placeholder: 'e.g. 99 123 4567' },
  { code: 'BO', name: 'Bolivie', dialCode: '591', flag: '/images/flags/bo.svg', placeholder: 'e.g. 712 34567' },
  { code: 'PY', name: 'Paraguay', dialCode: '595', flag: '/images/flags/py.svg', placeholder: 'e.g. 981 123 456' },
  { code: 'UY', name: 'Uruguay', dialCode: '598', flag: '/images/flags/uy.svg', placeholder: 'e.g. 99 123 456' },
  { code: 'AR', name: 'Argentine', dialCode: '54', flag: '/images/flags/ar.svg', placeholder: 'e.g. 11 1234 5678' },
  { code: 'CL', name: 'Chili', dialCode: '56', flag: '/images/flags/cl.svg', placeholder: 'e.g. 9 1234 5678' },
  { code: 'FK', name: 'Îles Malouines', dialCode: '500', flag: '/images/flags/fk.svg', placeholder: 'e.g. 51 234' },
  { code: 'GS', name: 'Géorgie du Sud', dialCode: '500', flag: '/images/flags/gs.svg', placeholder: 'e.g. 51 234' },
  { code: 'ZA', name: 'Afrique du Sud', dialCode: '27', flag: '/images/flags/za.svg', placeholder: 'e.g. 71 123 4567' },
  { code: 'NA', name: 'Namibie', dialCode: '264', flag: '/images/flags/na.svg', placeholder: 'e.g. 71 123 4567' },
  { code: 'BW', name: 'Botswana', dialCode: '267', flag: '/images/flags/bw.svg', placeholder: 'e.g. 71 123 4567' },
  { code: 'ZW', name: 'Zimbabwe', dialCode: '263', flag: '/images/flags/zw.svg', placeholder: 'e.g. 71 123 4567' },
  { code: 'ZM', name: 'Zambie', dialCode: '260', flag: '/images/flags/zm.svg', placeholder: 'e.g. 71 123 4567' },
  { code: 'MW', name: 'Malawi', dialCode: '265', flag: '/images/flags/mw.svg', placeholder: 'e.g. 71 123 4567' },
  { code: 'MZ', name: 'Mozambique', dialCode: '258', flag: '/images/flags/mz.svg', placeholder: 'e.g. 71 123 4567' },
  { code: 'SZ', name: 'Eswatini', dialCode: '268', flag: '/images/flags/sz.svg', placeholder: 'e.g. 71 123 4567' },
  { code: 'LS', name: 'Lesotho', dialCode: '266', flag: '/images/flags/ls.svg', placeholder: 'e.g. 71 123 4567' },
  { code: 'MG', name: 'Madagascar', dialCode: '261', flag: '/images/flags/mg.svg', placeholder: 'e.g. 32 12 345 67' },
  { code: 'MU', name: 'Maurice', dialCode: '230', flag: '/images/flags/mu.svg', placeholder: 'e.g. 5123 4567' },
  { code: 'SC', name: 'Seychelles', dialCode: '248', flag: '/images/flags/sc.svg', placeholder: 'e.g. 2 123 456' },
  { code: 'KM', name: 'Comores', dialCode: '269', flag: '/images/flags/km.svg', placeholder: 'e.g. 321 2345' },
  { code: 'DJ', name: 'Djibouti', dialCode: '253', flag: '/images/flags/dj.svg', placeholder: 'e.g. 77 123 456' },
  { code: 'SO', name: 'Somalie', dialCode: '252', flag: '/images/flags/so.svg', placeholder: 'e.g. 71 123 4567' },
  { code: 'ET', name: 'Éthiopie', dialCode: '251', flag: '/images/flags/et.svg', placeholder: 'e.g. 91 123 4567' },
  { code: 'ER', name: 'Érythrée', dialCode: '291', flag: '/images/flags/er.svg', placeholder: 'e.g. 71 123 456' },
  { code: 'SD', name: 'Soudan', dialCode: '249', flag: '/images/flags/sd.svg', placeholder: 'e.g. 91 123 4567' },
  { code: 'SS', name: 'Soudan du Sud', dialCode: '211', flag: '/images/flags/ss.svg', placeholder: 'e.g. 91 123 4567' },
  { code: 'EG', name: 'Égypte', dialCode: '20', flag: '/images/flags/eg.svg', placeholder: 'e.g. 10 1234 5678' },
  { code: 'LY', name: 'Libye', dialCode: '218', flag: '/images/flags/ly.svg', placeholder: 'e.g. 91 123 4567' },
  { code: 'TN', name: 'Tunisie', dialCode: '216', flag: '/images/flags/tn.svg', placeholder: 'e.g. 20 123 456' },
  { code: 'DZ', name: 'Algérie', dialCode: '213', flag: '/images/flags/dz.svg', placeholder: 'e.g. 5 12 34 56 78' },
  { code: 'MA', name: 'Maroc', dialCode: '212', flag: '/images/flags/ma.svg', placeholder: 'e.g. 6 12 34 56 78' },
  { code: 'EH', name: 'Sahara occidental', dialCode: '212', flag: '/images/flags/eh.svg', placeholder: 'e.g. 6 12 34 56 78' },
  { code: 'MR', name: 'Mauritanie', dialCode: '222', flag: '/images/flags/mr.svg', placeholder: 'e.g. 22 12 34 56' },
  { code: 'ML', name: 'Mali', dialCode: '223', flag: '/images/flags/ml.svg', placeholder: 'e.g. 65 12 34 56 78' },
  { code: 'BF', name: 'Burkina Faso', dialCode: '226', flag: '/images/flags/bf.svg', placeholder: 'e.g. 65 12 34 56 78' },
  { code: 'NE', name: 'Niger', dialCode: '227', flag: '/images/flags/ne.svg', placeholder: 'e.g. 90 12 34 56 78' },
  { code: 'TD', name: 'Tchad', dialCode: '235', flag: '/images/flags/td.svg', placeholder: 'e.g. 60 12 34 56 78' },
  { code: 'SN', name: 'Sénégal', dialCode: '221', flag: '/images/flags/sn.svg', placeholder: 'e.g. 70 123 4567' },
  { code: 'GM', name: 'Gambie', dialCode: '220', flag: '/images/flags/gm.svg', placeholder: 'e.g. 70 123 4567' },
  { code: 'GN', name: 'Guinée', dialCode: '224', flag: '/images/flags/gn.svg', placeholder: 'e.g. 60 12 34 56 78' },
  { code: 'GW', name: 'Guinée-Bissau', dialCode: '245', flag: '/images/flags/gw.svg', placeholder: 'e.g. 60 12 34 56 78' },
  { code: 'SL', name: 'Sierra Leone', dialCode: '232', flag: '/images/flags/sl.svg', placeholder: 'e.g. 25 123 456' },
  { code: 'LR', name: 'Libéria', dialCode: '231', flag: '/images/flags/lr.svg', placeholder: 'e.g. 77 123 4567' },
  { code: 'CI', name: 'Côte d\'Ivoire', dialCode: '225', flag: '/images/flags/ci.svg', placeholder: 'e.g. 07 12 34 56 78' },
  { code: 'GH', name: 'Ghana', dialCode: '233', flag: '/images/flags/gh.svg', placeholder: 'e.g. 20 123 4567' },
  { code: 'TG', name: 'Togo', dialCode: '228', flag: '/images/flags/tg.svg', placeholder: 'e.g. 90 12 34 56 78' },
  { code: 'BJ', name: 'Bénin', dialCode: '229', flag: '/images/flags/bj.svg', placeholder: 'e.g. 90 12 34 56 78' },
  { code: 'NG', name: 'Nigeria', dialCode: '234', flag: '/images/flags/ng.svg', placeholder: 'e.g. 801 234 5678' },
  { code: 'CM', name: 'Cameroun', dialCode: '237', flag: '/images/flags/cm.svg', placeholder: 'e.g. 6 12 34 56 78' },
  { code: 'GQ', name: 'Guinée équatoriale', dialCode: '240', flag: '/images/flags/gq.svg', placeholder: 'e.g. 222 123 456' },
  { code: 'GA', name: 'Gabon', dialCode: '241', flag: '/images/flags/ga.svg', placeholder: 'e.g. 01 23 45 67 89' },
  { code: 'CG', name: 'République du Congo', dialCode: '242', flag: '/images/flags/cg.svg', placeholder: 'e.g. 06 123 4567' },
  { code: 'CD', name: 'République démocratique du Congo', dialCode: '243', flag: '/images/flags/cd.svg', placeholder: 'e.g. 99 123 4567' },
  { code: 'AO', name: 'Angola', dialCode: '244', flag: '/images/flags/ao.svg', placeholder: 'e.g. 923 123 456' },
  { code: 'ST', name: 'Sao Tomé-et-Principe', dialCode: '239', flag: '/images/flags/st.svg', placeholder: 'e.g. 99 123 456' },
  { code: 'CV', name: 'Cap-Vert', dialCode: '238', flag: '/images/flags/cv.svg', placeholder: 'e.g. 991 2345' },
  { code: 'GM', name: 'Gambie', dialCode: '220', flag: '/images/flags/gm.svg', placeholder: 'e.g. 70 123 4567' },
  { code: 'GN', name: 'Guinée', dialCode: '224', flag: '/images/flags/gn.svg', placeholder: 'e.g. 60 12 34 56 78' },
  { code: 'GW', name: 'Guinée-Bissau', dialCode: '245', flag: '/images/flags/gw.svg', placeholder: 'e.g. 60 12 34 56 78' },
  { code: 'SL', name: 'Sierra Leone', dialCode: '232', flag: '/images/flags/sl.svg', placeholder: 'e.g. 25 123 456' },
  { code: 'LR', name: 'Libéria', dialCode: '231', flag: '/images/flags/lr.svg', placeholder: 'e.g. 77 123 4567' },
  { code: 'CI', name: 'Côte d\'Ivoire', dialCode: '225', flag: '/images/flags/ci.svg', placeholder: 'e.g. 07 12 34 56 78' },
  { code: 'GH', name: 'Ghana', dialCode: '233', flag: '/images/flags/gh.svg', placeholder: 'e.g. 20 123 4567' },
  { code: 'TG', name: 'Togo', dialCode: '228', flag: '/images/flags/tg.svg', placeholder: 'e.g. 90 12 34 56 78' },
  { code: 'BJ', name: 'Bénin', dialCode: '229', flag: '/images/flags/bj.svg', placeholder: 'e.g. 90 12 34 56 78' },
  { code: 'NG', name: 'Nigeria', dialCode: '234', flag: '/images/flags/ng.svg', placeholder: 'e.g. 801 234 5678' },
  { code: 'CM', name: 'Cameroun', dialCode: '237', flag: '/images/flags/cm.svg', placeholder: 'e.g. 6 12 34 56 78' },
  { code: 'GQ', name: 'Guinée équatoriale', dialCode: '240', flag: '/images/flags/gq.svg', placeholder: 'e.g. 222 123 456' },
  { code: 'GA', name: 'Gabon', dialCode: '241', flag: '/images/flags/ga.svg', placeholder: 'e.g. 01 23 45 67 89' },
  { code: 'CG', name: 'République du Congo', dialCode: '242', flag: '/images/flags/cg.svg', placeholder: 'e.g. 06 123 4567' },
  { code: 'CD', name: 'République démocratique du Congo', dialCode: '243', flag: '/images/flags/cd.svg', placeholder: 'e.g. 99 123 4567' },
  { code: 'AO', name: 'Angola', dialCode: '244', flag: '/images/flags/ao.svg', placeholder: 'e.g. 923 123 456' },
  { code: 'ST', name: 'Sao Tomé-et-Principe', dialCode: '239', flag: '/images/flags/st.svg', placeholder: 'e.g. 99 123 456' },
  { code: 'CV', name: 'Cap-Vert', dialCode: '238', flag: '/images/flags/cv.svg', placeholder: 'e.g. 991 2345' }
]

// Pays sélectionné par défaut (France)
const selectedCountry = ref(countries.find(c => c.code === 'FR') || countries[0])

// Initialiser la liste filtrée
filteredCountries.value = countries

// Fonctions pour le sélecteur de pays
const getFlagEmoji = (countryCode: string) => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}

const toggleCountryDropdown = () => {
  showCountryDropdown.value = !showCountryDropdown.value
}

const filterCountries = () => {
  if (!countrySearch.value.trim()) {
    filteredCountries.value = countries
  } else {
    const searchTerm = countrySearch.value.toLowerCase()
    filteredCountries.value = countries.filter(country => 
      country.name.toLowerCase().includes(searchTerm) ||
      country.dialCode.includes(searchTerm) ||
      country.code.toLowerCase().includes(searchTerm)
    )
  }
}

const selectCountry = (country: any) => {
  selectedCountry.value = country
  showCountryDropdown.value = false
  countrySearch.value = ''
  filteredCountries.value = countries
  // Réinitialiser le numéro de téléphone quand on change de pays
  formattedPhoneNumber.value = ''
  phoneNumber.value = ''
}

const formatPhoneNumber = () => {
  // Supprimer tous les caractères non numériques
  const cleaned = formattedPhoneNumber.value.replace(/\D/g, '')
  
  // Stocker le numéro sans indicatif pour l'API
  phoneNumber.value = cleaned
  
  // Formater selon le pays sélectionné
  let formatted = cleaned
  
  switch (selectedCountry.value.code) {
    case 'FR':
      // Format français: 6 12 34 56 78
      if (cleaned.length > 0) formatted = cleaned.match(/.{1,2}/g)?.join(' ') || cleaned
      break
    case 'US':
    case 'CA':
      // Format américain: 555-123-4567
      if (cleaned.length > 3) {
        formatted = cleaned.slice(0, 3) + '-' + cleaned.slice(3)
        if (cleaned.length > 6) {
          formatted = formatted.slice(0, 7) + '-' + formatted.slice(7)
        }
      }
      break
    case 'GB':
      // Format UK: 7123 456789
      if (cleaned.length > 4) {
        formatted = cleaned.slice(0, 4) + ' ' + cleaned.slice(4)
      }
      break
    case 'DE':
      // Format allemand: 151 12345678
      if (cleaned.length > 3) {
        formatted = cleaned.slice(0, 3) + ' ' + cleaned.slice(3)
      }
      break
    default:
      // Format par défaut: espacer tous les 2 chiffres
      if (cleaned.length > 0) formatted = cleaned.match(/.{1,2}/g)?.join(' ') || cleaned
  }
  
  formattedPhoneNumber.value = formatted
}

const handleContinue = async () => {
  // Validation du numéro de téléphone
  if (!phoneNumber.value.trim()) {
    showNotification('error', t('phoneRequired'))
    return
  }
  
  // Validation selon le pays sélectionné
  const cleanNumber = phoneNumber.value.replace(/\D/g, '')
  const isValidLength = validatePhoneNumberLength(cleanNumber, selectedCountry.value.code)
  
  if (!isValidLength.valid) {
    showNotification('error', isValidLength.message)
    return
  }
  
  isSending.value = true
  
  try {
    // Construire le numéro complet avec l'indicatif du pays
    const fullPhoneNumber = `+${selectedCountry.value.dialCode}${phoneNumber.value}`
    
    // Envoyer directement l'OTP (pas de vérification d'existence pour la création de compte)
    const result = await sendOTP(fullPhoneNumber)
    
    if (result.success) {
      // Rediriger vers la page de vérification OTP avec le numéro de téléphone complet
      router.push({
        path: '/register/verify',
        query: { phone: fullPhoneNumber }
      })
    } else {
      showNotification('error', result.message)
    }
  } catch (error) {
    showNotification('error', t('connectionError'))
  } finally {
    isSending.value = false
  }
}

// Fonctions pour gérer les notifications
const showNotification = (type: 'error' | 'success', message: string) => {
  if (type === 'error') {
    errorMessage.value = message
    showError.value = true
    // Masquer automatiquement après 5 secondes
    setTimeout(() => {
      showError.value = false
    }, 5000)
  } else {
    successMessage.value = message
    showSuccess.value = true
    // Masquer automatiquement après 3 secondes
    setTimeout(() => {
      showSuccess.value = false
    }, 3000)
  }
}

const hideError = () => {
  showError.value = false
}

const hideSuccess = () => {
  showSuccess.value = false
}

// Fonction pour valider la longueur du numéro selon le pays
const validatePhoneNumberLength = (cleanNumber: string, countryCode: string): { valid: boolean; message: string } => {
  const length = cleanNumber.length
  
  switch (countryCode) {
    case 'FR':
      // France: 10 chiffres (format: 6 12 34 56 78)
      if (length !== 10) {
        return { valid: false, message: `Le numéro de téléphone pour la France doit contenir 10 chiffres` }
      }
      break
    case 'US':
    case 'CA':
      // États-Unis/Canada: 10 chiffres (format: 555-123-4567)
      if (length !== 10) {
        return { valid: false, message: `Le numéro de téléphone pour les États-Unis/Canada doit contenir 10 chiffres` }
      }
      break
    case 'GB':
      // Royaume-Uni: 10-11 chiffres
      if (length < 10 || length > 11) {
        return { valid: false, message: `Le numéro de téléphone pour le Royaume-Uni doit contenir 10-11 chiffres` }
      }
      break
    case 'DE':
      // Allemagne: 10-12 chiffres
      if (length < 10 || length > 12) {
        return { valid: false, message: `Le numéro de téléphone pour l'Allemagne doit contenir 10-12 chiffres` }
      }
      break
    case 'IT':
      // Italie: 10 chiffres
      if (length !== 10) {
        return { valid: false, message: `Le numéro de téléphone pour l'Italie doit contenir 10 chiffres` }
      }
      break
    case 'ES':
      // Espagne: 9 chiffres
      if (length !== 9) {
        return { valid: false, message: `Le numéro de téléphone pour l'Espagne doit contenir 9 chiffres` }
      }
      break
    case 'BE':
      // Belgique: 9 chiffres
      if (length !== 9) {
        return { valid: false, message: `Le numéro de téléphone pour la Belgique doit contenir 9 chiffres` }
      }
      break
    case 'CH':
      // Suisse: 9 chiffres
      if (length !== 9) {
        return { valid: false, message: `Le numéro de téléphone pour la Suisse doit contenir 9 chiffres` }
      }
      break
    case 'NL':
      // Pays-Bas: 9 chiffres
      if (length !== 9) {
        return { valid: false, message: `Le numéro de téléphone pour les Pays-Bas doit contenir 9 chiffres` }
      }
      break
    case 'SE':
      // Suède: 9 chiffres
      if (length !== 9) {
        return { valid: false, message: `Le numéro de téléphone pour la Suède doit contenir 9 chiffres` }
      }
      break
    case 'NO':
      // Norvège: 8 chiffres
      if (length !== 8) {
        return { valid: false, message: `Le numéro de téléphone pour la Norvège doit contenir 8 chiffres` }
      }
      break
    case 'DK':
      // Danemark: 8 chiffres
      if (length !== 8) {
        return { valid: false, message: `Le numéro de téléphone pour le Danemark doit contenir 8 chiffres` }
      }
      break
    case 'FI':
      // Finlande: 9 chiffres
      if (length !== 9) {
        return { valid: false, message: `Le numéro de téléphone pour la Finlande doit contenir 9 chiffres` }
      }
      break
    case 'PL':
      // Pologne: 9 chiffres
      if (length !== 9) {
        return { valid: false, message: `Le numéro de téléphone pour la Pologne doit contenir 9 chiffres` }
      }
      break
    case 'CZ':
      // République tchèque: 9 chiffres
      if (length !== 9) {
        return { valid: false, message: `Le numéro de téléphone pour la République tchèque doit contenir 9 chiffres` }
      }
      break
    case 'AT':
      // Autriche: 10-13 chiffres
      if (length < 10 || length > 13) {
        return { valid: false, message: `Le numéro de téléphone pour l'Autriche doit contenir 10-13 chiffres` }
      }
      break
    case 'HU':
      // Hongrie: 9 chiffres
      if (length !== 9) {
        return { valid: false, message: `Le numéro de téléphone pour la Hongrie doit contenir 9 chiffres` }
      }
      break
    case 'RO':
      // Roumanie: 9 chiffres
      if (length !== 9) {
        return { valid: false, message: `Le numéro de téléphone pour la Roumanie doit contenir 9 chiffres` }
      }
      break
    case 'BG':
      // Bulgarie: 9 chiffres
      if (length !== 9) {
        return { valid: false, message: `Le numéro de téléphone pour la Bulgarie doit contenir 9 chiffres` }
      }
      break
    case 'HR':
      // Croatie: 8-9 chiffres
      if (length < 8 || length > 9) {
        return { valid: false, message: `Le numéro de téléphone pour la Croatie doit contenir 8-9 chiffres` }
      }
      break
    case 'SI':
      // Slovénie: 8 chiffres
      if (length !== 8) {
        return { valid: false, message: `Le numéro de téléphone pour la Slovénie doit contenir 8 chiffres` }
      }
      break
    case 'SK':
      // Slovaquie: 9 chiffres
      if (length !== 9) {
        return { valid: false, message: `Le numéro de téléphone pour la Slovaquie doit contenir 9 chiffres` }
      }
      break
    case 'LT':
      // Lituanie: 8 chiffres
      if (length !== 8) {
        return { valid: false, message: `Le numéro de téléphone pour la Lituanie doit contenir 8 chiffres` }
      }
      break
    case 'LV':
      // Lettonie: 8 chiffres
      if (length !== 8) {
        return { valid: false, message: `Le numéro de téléphone pour la Lettonie doit contenir 8 chiffres` }
      }
      break
    case 'EE':
      // Estonie: 7-8 chiffres
      if (length < 7 || length > 8) {
        return { valid: false, message: `Le numéro de téléphone pour l'Estonie doit contenir 7-8 chiffres` }
      }
      break
    case 'IE':
      // Irlande: 9 chiffres
      if (length !== 9) {
        return { valid: false, message: `Le numéro de téléphone pour l'Irlande doit contenir 9 chiffres` }
      }
      break
    case 'PT':
      // Portugal: 9 chiffres
      if (length !== 9) {
        return { valid: false, message: `Le numéro de téléphone pour le Portugal doit contenir 9 chiffres` }
      }
      break
    case 'GR':
      // Grèce: 10 chiffres
      if (length !== 10) {
        return { valid: false, message: `Le numéro de téléphone pour la Grèce doit contenir 10 chiffres` }
      }
      break
    case 'CY':
      // Chypre: 8 chiffres
      if (length !== 8) {
        return { valid: false, message: `Le numéro de téléphone pour Chypre doit contenir 8 chiffres` }
      }
      break
    case 'MT':
      // Malte: 8 chiffres
      if (length !== 8) {
        return { valid: false, message: `Le numéro de téléphone pour Malte doit contenir 8 chiffres` }
      }
      break
    case 'LU':
      // Luxembourg: 9 chiffres
      if (length !== 9) {
        return { valid: false, message: `Le numéro de téléphone pour le Luxembourg doit contenir 9 chiffres` }
      }
      break
    case 'IS':
      // Islande: 7 chiffres
      if (length !== 7) {
        return { valid: false, message: `Le numéro de téléphone pour l'Islande doit contenir 7 chiffres` }
      }
      break
    default:
      // Pour les autres pays, validation générique (minimum 7 chiffres, maximum 15)
      if (length < 7 || length > 15) {
        return { valid: false, message: t('phoneLengthErrorGeneric') }
      }
  }
  
  return { valid: true, message: '' }
}

const goToLogin = () => {
  router.push('/login')
}

const goBack = () => {
  router.go(-1)
}

const previousSlide = () => {
  // Logique pour le slide précédent
}

const nextSlide = () => {
  // Logique pour le slide suivant
}
</script>

<style scoped>

.sign-up {
  align-items: center;
  background-color: var(--bg-color);
  display: flex;
  height: 100vh;
  position: relative;
  width: 100%;
}

.sign-up .section {
  align-items: center;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  width: 640px;
  background: var(--card-bg);
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

/* Bouton de retour mobile */
.sign-up .mobile-back-button {
  display: none;
  position: absolute;
  top: 20px;
  left: 5px;
  z-index: 100;
  width: auto;
  height: auto;
  background: transparent;
  border: none;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  padding: 8px;
}

.sign-up .mobile-back-button:hover {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 6px;
}

.sign-up .mobile-back-button svg {
  width: 24px;
  height: 24px;
  color: var(--text-color);
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  width: 141.15px;
  height: auto;
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
  color: var(--text-color);
  font-family: 'Inter', sans-serif;
  font-size: 30px;
  font-weight: 600;
  line-height: 38px;
  margin-top: -1px;
  position: relative;
}

.sign-up .supporting-text {
  align-self: stretch;
  color: var(--text-color);
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  position: relative;
}

.sign-up .div {
  align-items: center;
  align-self: stretch;
  border-radius: 12px;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 48px;
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
  gap: 8px;
  position: relative;
  width: 100%;
}

.sign-up .text-wrapper {
  align-self: stretch;
  color: var(--text-color);
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  margin-top: -1px;
  position: relative;
}

.sign-up .input-form {
  align-items: center;
  align-self: stretch;
  background-color: var(--card-bg);
  border: 1px solid #d1d5db;
  border-radius: 12px;
  display: flex;
  flex: 0 0 auto;
  gap: 12px;
  padding: 12px 16px;
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

.flag-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
}

.flag-emoji {
  font-size: 14px;
  line-height: 1;
}

/* Styles pour le dropdown des pays */
.country-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--card-bg);
  border: 1px solid #d1d5db;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-height: 300px;
  overflow: hidden;
}

.search-container {
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
}

.search-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  background: var(--card-bg);
  color: var(--text-color);
}

.search-input:focus {
  border-color: #0a4a6f;
}

.countries-list {
  max-height: 250px;
  overflow-y: auto;
}

.country-option {
  display: flex;
  align-items: center;
  padding: 12px;
  cursor: pointer;
  transition: background-color 0.2s;
  gap: 12px;
}

.country-option:hover {
  background-color: var(--bg-color);
}

.country-flag-emoji {
  font-size: 16px;
  line-height: 1;
  width: 20px;
  text-align: center;
}

.country-name {
  flex: 1;
  font-size: 14px;
  color: var(--text-color);
}

.country-dial {
  font-size: 14px;
  color: var(--text-color);
  font-weight: 500;
  opacity: 0.7;
}

.sign-up .text-wrapper-2 {
  color: var(--text-color);
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  margin-bottom: -1px;
  margin-top: -3px;
  position: relative;
  white-space: nowrap;
  width: fit-content;
}

.sign-up .left-actionable {
  height: 16px;
  position: relative;
  width: 16px;
  cursor: pointer;
}

.sign-up .vector {
  height: 6px;
  left: 3px;
  position: absolute;
  top: 5px;
  width: 10px;
  color: #6b7280;
}

.phone-input {
  color: var(--text-color);
  flex: 1;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  margin-top: -1px;
  position: relative;
  border: none;
  outline: none;
  background: transparent;
}

.phone-input::placeholder {
  color: var(--text-color);
  opacity: 0.6;
}

.sign-up .button {
  all: unset;
  align-items: center;
  align-self: stretch;
  background-color: #0a4a6f;
  border-radius: 8px;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  box-sizing: border-box;
  display: flex;
  flex: 0 0 auto;
  gap: 12px;
  justify-content: center;
  overflow: hidden;
  padding: 12px 24px;
  position: relative;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.sign-up .button:hover:not(:disabled) {
  background-color: #083d5a;
}

.sign-up .button:disabled {
  background-color: #d1d5db;
  cursor: not-allowed;
}

.sign-up .button-2 {
  all: unset;
  box-sizing: border-box;
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  margin-top: -1px;
  position: relative;
  white-space: nowrap;
  width: fit-content;
}





.sign-up .by-signing-up-or {
  align-self: stretch;
  color: transparent;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  position: relative;
  text-align: center;
  margin-top: 30px;
}

.sign-up .text-wrapper-4 {
  color: var(--text-color);
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
}

.sign-up .text-wrapper-5 {
  color: #0a4a6f;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  cursor: pointer;
}

.sign-up .text-wrapper-5:hover {
  text-decoration: underline;
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
  color: var(--text-color);
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
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
  ),
  url('/images/img1.jpg') center/cover no-repeat;
  border-radius: 80px 0px 0px 80px;
  flex: 1;
  flex-grow: 1;
  position: relative;
}

.sign-up .navigation-buttons {
  position: absolute;
  bottom: 56px;
  right: 56px;
  display: flex;
  gap: 16px;
  z-index: 10;
}

.sign-up .nav-arrow {
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.sign-up .nav-arrow:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
  transform: scale(1.05);
}

.sign-up .quote {
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-size: 36px;
  font-weight: 500;
  line-height: 44px;
  left: 56px;
  position: absolute;
  top: 359px;
  width: 688px;
  z-index: 10;
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
  z-index: 10;
}

.sign-up .name {
  align-self: stretch;
  color: #ffffff;
  font-family: 'Inter', sans-serif;
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
  margin-top: -1px;
  position: relative;
}

/* Responsive styles */
@media (max-width: 1200px) {
  .sign-up .section-2 {
    display: none;
  }
  
  .sign-up .section {
    width: 100%;
    max-width: 100%;
  }
  
  .sign-up .content {
    width: 100%;
    max-width: 600px;
  }
}

@media (max-width: 834px) {
  .sign-up {
    flex-direction: column;
    height: auto;
    min-height: 100vh;
  }
  
  .sign-up .section {
    width: 100%;
    min-height: 100vh;
  }
  
  .sign-up .section-2 {
    display: none;
  }
  
  /* Afficher le bouton de retour en mode mobile */
  .sign-up .mobile-back-button {
    display: flex;
  }
  
  /* Masquer le logo en mode mobile */
  .sign-up .logo {
    display: none;
  }
  
  .sign-up .content {
    width: 100%;
    max-width: 400px;
    margin-top: -620px;
  }
  
  .sign-up .header-navigation {
    height: 80px;
    padding: 20px;
  }
  
  .sign-up .container {
    padding: 0 20px;
  }
  
  .sign-up .footer {
    display: none;
  }
  
  .sign-up .by-signing-up-or {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: var(--card-bg);
    padding: 16px 32px;
    z-index: 1000;
    text-align: center;
    border-top: 1px solid #e5e7eb;
    margin-top: 0;
  }
  
  .sign-up .div {
    gap: 40px;
  }
}

@media (max-width: 480px) {
  .sign-up .content {
    max-width: 320px;
  }
  
  .sign-up .text {
    font-size: 24px;
    line-height: 32px;
  }
  
  .sign-up .supporting-text {
    font-size: 13px;
  }
  
  .sign-up .input-form {
    padding: 10px 12px;
  }
  
  .sign-up .button {
    padding: 10px 20px;
  }
  
  .sign-up .button-2 {
    font-size: 13px;
  }
  .sign-up .footer {
    display: none;
  }
  
}

/* Styles pour les notifications */
.error-notification,
.success-notification {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  min-width: 300px;
  max-width: 500px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  animation: slideDown 0.3s ease-out;
}

.error-notification {
  background: linear-gradient(135deg, #ff6b6b, #ee5a52);
  border: 1px solid #ff4757;
}

.success-notification {
  background: linear-gradient(135deg, #51cf66, #40c057);
  border: 1px solid #51cf66;
}

.error-content,
.success-content {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  color: white;
  font-family: 'Inter', sans-serif;
}

.error-icon,
.success-icon {
  font-size: 20px;
  margin-right: 12px;
  flex-shrink: 0;
}

.error-message,
.success-message {
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
}

.error-close,
.success-close {
  font-size: 20px;
  font-weight: bold;
  margin-left: 12px;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s;
}

.error-close:hover,
.success-close:hover {
  opacity: 1;
}

@keyframes slideDown {
  from {
    transform: translateX(-50%) translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
  }
}

/* Styles pour le bloc "already-have-an" */
.sign-up .already-have-an {
  align-self: stretch;
  color: transparent;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  position: relative;
  text-align: center;
  margin-top: 16px;
}

.sign-up .span {
  color: #3f3f46;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
}

.sign-up .text-wrapper-3 {
  color: #0a4a6f;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  cursor: pointer;
}

.sign-up .text-wrapper-3:hover {
  text-decoration: underline;
}
</style>
