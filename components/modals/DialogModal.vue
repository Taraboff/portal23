<template>
  <transition name="fade">
    <div v-show="open">
      <div class="modal-backdrop"></div>

      <div class="modal mt-5 md:mt-0">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            Редактирование контакта РОРС
          </h3>
          <p class="mt-1 text-sm text-gray-600">
            Внесите изменения и сохраните
          </p>
        </div>

        <form action="#" method="POST">
          <div class="overflow-hidden shadow sm:rounded-md">
            <div class="bg-white px-4 py-5 sm:p-6">
              <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="name"
                    class="block text-sm font-medium text-gray-700"
                    >Наименование</label
                  >
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autocomplete="on"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="rors5"
                    class="block text-sm font-medium text-gray-700"
                    >Номер 5-знач.</label
                  >
                  <input
                    type="text"
                    name="rors5"
                    id="rors5"
                    autocomplete="on"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div class="col-span-6 sm:col-span-4">
                  <label
                    for="email-address"
                    class="block text-sm font-medium text-gray-700"
                    >Email address</label
                  >
                  <input
                    type="text"
                    name="email-address"
                    id="email-address"
                    autocomplete="email"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label
                    for="вузе"
                    class="block text-sm font-medium text-gray-700"
                    >Подразделение</label
                  >
                  <input
                    type="text"
                    name="dept"
                    id="dept"
                    autocomplete="on"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div class="col-span-6">
                  <label
                    for="street-address"
                    class="block text-sm font-medium text-gray-700"
                    >Street address</label
                  >
                  <input
                    type="text"
                    name="street-address"
                    id="street-address"
                    autocomplete="street-address"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                  <label
                    for="city"
                    class="block text-sm font-medium text-gray-700"
                    >City</label
                  >
                  <input
                    type="text"
                    name="city"
                    id="city"
                    autocomplete="address-level2"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label
                    for="region"
                    class="block text-sm font-medium text-gray-700"
                    >State / Province</label
                  >
                  <input
                    type="text"
                    name="region"
                    id="region"
                    autocomplete="address-level1"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label
                    for="postal-code"
                    class="block text-sm font-medium text-gray-700"
                    >ZIP / Postal code</label
                  >
                  <input
                    type="text"
                    name="postal-code"
                    id="postal-code"
                    autocomplete="postal-code"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <button
                type="submit"
                @click.stop="confirm"
                class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 mx-4 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Сохранить
              </button>
              <button
                type="submit"
                @click.stop="cancel"
                class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Отменить
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      open: false,
      message: '',
      resolver: () => null,
    }
  },
  mounted() {
    this.$nuxt.$on('dialog', this.dialog)
    console.log('mounted dialog' + new Date())
  },
  methods: {
    confirm() {
      this.resolver(new Promise((resolve) => resolve('confirmed')))
      this.close()
    },
    cancel() {
      this.resolver(
        new Promise((resolve, reject) => reject(new Error('cancelled')))
      )
      this.close()
    },
    close() {
      this.open = false
    },
    dialog({ message, open, resolver }) {
      this.message = message
      this.open = open
      this.resolver = resolver
    },
  },
}
</script>
<style scoped>
.modal-backdrop {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.75;
}
.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 16px;
  background-color: white;
  opacity: 1;
  border-radius: 4px;
  transform: translate(-50%, -50%);
}
.modal-body {
  padding: 16px 0;
}
.modal-footer {
  padding-top: 16px;
  border-top: solid 2px gray;
  text-align: right;
}
.modal-footer button {
  margin-left: 16px;
}
</style>
