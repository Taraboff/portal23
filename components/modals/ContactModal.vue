<template>
  <transition name="fade">
    <div v-show="open">
      <div class="modal-backdrop"></div>

      <div class="modal">
        <div class="px-4 py-3">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            {{ dialogProps.title }}
          </h3>
          <p class="mt-1 px-2 text-sm text-gray-500" :class="[msgClass]">
            {{ message }}
          </p>
        </div>

        <div class="overflow-hidden shadow sm:rounded-md">
          <form method="post" ref="form">
            <div class="bg-white px-4 py-3 sm:p-6">
              <div class="grid grid-cols-6 gap-6">
                <div class="col-span-3">
                  <label
                    for="name"
                    class="block text-sm font-medium text-gray-700"
                    >Ф.И.О.*</label
                  >
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    class="p-2 mt-2 block w-full rounded-md border-gray-300 shadow-sm hover:outline-slate-100 focus:outline-slate-100 focus:ring-indigo-500 sm:text-sm"
                    v-model="contact.attributes.name"
                    @input="validateForm"
                  />
                </div>

                <div class="col-span-3">
                  <label
                    for="position"
                    class="block text-sm font-medium text-gray-700"
                    >Должность*</label
                  >
                  <input
                    type="text"
                    name="position"
                    id="position"
                    required
                    autocomplete="on"
                    class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    v-model="contact.attributes.position"
                    @input="validateForm"
                  />
                </div>
                <div class="col-span-3">
                  <label
                    for="pred"
                    class="block text-sm font-medium text-gray-700"
                    >Предприятие*</label
                  >
                  <input
                    type="text"
                    name="pred"
                    id="pred"
                    required
                    autocomplete="on"
                    class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    v-model="contact.attributes.pred"
                    @input="validateForm"
                  />
                </div>

                <div class="col-span-3">
                  <label
                    for="dept"
                    class="block text-sm font-medium text-gray-700"
                    >Подразделение</label
                  >
                  <input
                    type="text"
                    name="dept"
                    id="dept"
                    autocomplete="on"
                    class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    v-model="contact.attributes.dept"
                  />
                </div>
                <div class="col-span-3">
                  <label
                    for="rors5"
                    class="block text-sm font-medium text-gray-700"
                    >Номер 5-знач.*</label
                  >
                  <input
                    type="number"
                    min="70000"
                    max="79999"
                    name="rors5"
                    id="rors5"
                    required
                    class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    v-model="contact.attributes.rors5"
                    @input="validateForm"
                  />
                </div>

                <div class="col-span-3">
                  <label
                    for="rors10"
                    class="block text-sm font-medium text-gray-700"
                    >Номер 10-знач.</label
                  >
                  <input
                    type="text"
                    name="rors10"
                    id="rors10"
                    class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    v-model="contact.attributes.rors10"
                  />
                </div>

                <div class="col-span-6 lg:col-span-6">
                  <label
                    for="description"
                    class="block text-sm font-medium text-gray-700"
                    >Примечание</label
                  >
                  <input
                    type="text"
                    name="description"
                    id="description"
                    class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    v-model="contact.attributes.description"
                  />
                </div>
                <div class="col-span-6 px-3">
                  <input
                    type="checkbox"
                    name="public"
                    id="public"
                    v-model="contact.attributes.public"
                  />
                  <label for="public" class="px-4"
                    >Показывать контакт всем</label
                  >
                </div>
              </div>
            </div>
            <div class="px-4 py-3 text-right sm:px-6">
              <button
                class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 mx-4 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                type="submit"
                @click.prevent="save"
                :disabled="notValidated"
              >
                Сохранить
              </button>
              <button
                type="submit"
                @click.prevent="cancel"
                class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Закрыть
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      open: false,
      contact: {
        attributes: {},
      },

      dialogProps: {},
      notValidated: true,
      message:
        'Внесите изменения и сохраните. Все обязательные поля должны быть заполнены',
      msgClass: '',
      resolver: () => null,
    }
  },

  mounted() {
    this.$nuxt.$on('dialog', this.dialogFn)
  },
  methods: {
    save() {
      this.resolver(
        new Promise((resolve) => {
          resolve(this.contact)
        })
      )
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

    validateForm() {
      // перебор полей формы, проверка validity HTML5 (Constraint Validation API)

      const inputs = Array.from(this.$refs.form.elements)

      this.notValidated = inputs.some((element) => {
        return !element.validity.valid
      })
    },
    dialogFn({ dialogProps, contact, open, resolver }) {
      this.dialogProps = dialogProps
      this.contact = contact
      this.open = open
      this.resolver = resolver
    },
  },
  updated() {
    this.validateForm()
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
  width: 700px;
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 16px;
  background-color: white;
  opacity: 1;
  border-radius: 4px;
  transform: translate(-50%, -50%);
}
button[disabled] {
  background-color: rgb(251, 136, 136);
}
input:invalid:required {
  border: 1px solid red;
}
</style>
