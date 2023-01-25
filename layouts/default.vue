<template>
  <div>
    <ContactModal />
    <div class="flex min-h-screen flex-col container mx-auto">
      <Header />
      <SysMessage />
      <nuxt />
      <Footer />
    </div>
  </div>
</template>

<script>
import ContactModal from '~/components/modals/ContactModal.vue'
import SysMessage from '~/components/SysMessage.vue'
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
export default {
  components: {
    ContactModal,
    SysMessage,
    Header,
    Footer,
  },
  auth: false,
}
</script>
