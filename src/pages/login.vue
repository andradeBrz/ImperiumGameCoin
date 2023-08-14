<script setup>
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import authV2LoginIllustrationBorderedDark from '@images/pages/auth-v2-login-illustration-bordered-dark.png'
import authV2LoginIllustrationBorderedLight from '@images/pages/auth-v2-login-illustration-bordered-light.png'
import authV2LoginIllustrationDark from '@images/pages/auth-v2-login-illustration-dark.png'
import authV2LoginIllustrationLight from '@images/pages/auth-v2-login-illustration-light.png'
import authV2MaskDark from '@images/pages/misc-mask-dark.png'
import authV2MaskLight from '@images/pages/misc-mask-light.png'

import { useWeb3 } from "../composables/useWeb3"

const { web3, contract, userAddress, initWeb3 } = useWeb3()


const router = useRouter()

const authThemeImg = useGenerateImageVariant(authV2LoginIllustrationLight, authV2LoginIllustrationDark, authV2LoginIllustrationBorderedLight, authV2LoginIllustrationBorderedDark, true)
const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark)

const metamaskConnected = ref(false)

async function connectWithMetamask() {
	// Check if already connected with Metamask
	if (metamaskConnected.value) {
		router.push({ path: '/' })
    
		return
	}

	// Initialize web3 and get user address
	await initWeb3()

	if (userAddress.value) {
		console.log('Conectado com a Metamask', userAddress.value)
		metamaskConnected.value = true

		// Navigate to index.vue page
		router.push({ path: '/' })

		// TODO: Use o endereço da conta Metamask como identificador do usuário em seu sistema
	} else {
		console.error('Falha ao conectar com a Metamask')
	}
}
</script>


<template>
  <VRow
    no-gutters
    class="auth-wrapper"
  >
    <VCol
      lg="8"
      class="d-none d-lg-flex"
    >
      <div class="position-relative auth-bg rounded-lg w-100 ma-8 me-0">
        <div class="d-flex align-center justify-center w-100 h-100">
          <VImg
            max-width="505"
            :src="authThemeImg"
            class="auth-illustration mt-16 mb-2"
          />
        </div>
        <VImg
          :src="authThemeMask"
          class="auth-footer-mask"
        />
      </div>
    </VCol>

    <VCol
      cols="12"
      lg="4"
      class="d-flex align-center justify-center"
    >
      <VCard
        flat
        :max-width="500"
        class="mt-12 mt-sm-0 pa-4"
      >
        <VCardText>
          <VNodeRenderer
            :nodes="themeConfig.app.logo"
            class="mb-6"
          />

          <h5 class="text-h5 font-weight-semibold mb-1">
            Bem-vindo ao YESPAG! 👋🏻
          </h5>
          <p class="mb-2">
            O YESPAG é um token que pode ser minerado através de um game de gerenciamento de máquinas de mineração. Para começar a minerar, você precisa se conectar com sua carteira Metamask. 
          </p>
        </VCardText>

        <VCardActions>
          <VBtn
            large
            block
            color="primary"
            class="mt-4"
            @click="connectWithMetamask"
          >
            Conectar com Metamask
          </VBtn>
        </VCardActions>

        <VCardText>
          <VAlert
            color="primary"
            variant="tonal"
          >
            <p class="text-caption mb-2">
              Você precisa ter a extensão Metamask instalada em seu navegador para se conectar.
            </p>
          </VAlert>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
  action: read
  subject: Auth
  redirectIfLoggedIn: true
</route>
