<template>
  <div>
    <div class="min-h-screen">
      <ContactModal />
      <SysMessage />
      <Header />
      <div class="lg:container mx-auto">
        <div>
          <nuxt />
        </div>
      </div>
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
