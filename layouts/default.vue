<template>
  <div>
    <DialogModal />
    <Header />
    <div class="lg:container mx-auto">
      <div>
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import DialogModal from '~/components/modals/DialogModal.vue'
import Header from '~/components/Header.vue'
export default {
  components: {
    DialogModal,
    Header,
  },
}
</script>
