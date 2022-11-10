<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->

<template>
  <transition name="fade">
    <div v-if="open" class="modal-backdrop">
      <div class="modal">
        <div class="modal-body">
          <p>{{ message }}</p>
        </div>
        <div class="modal-footer">
          <button class="button button--confirm" @click.stop="confirm">
            Confirm
          </button>
          <button class="button button--cancel" @click.stop="cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>
