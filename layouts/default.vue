<template>
  <div>
    <ContactModal />
    <Header />
    <div class="lg:container mx-auto">
      <div>
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import ContactModal from '~/components/modals/ContactModal.vue'
import Header from '~/components/Header.vue'
export default {
  components: {
    ContactModal,
    Header,
  },
}
</script>
