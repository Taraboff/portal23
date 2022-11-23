<template>
  <transition name="fade">
    <div v-show="open">
      <div class="modal-backdrop"></div>

      <div class="modal">
        <div class="px-4 py-3">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            Редактирование контакта РОРС
          </h3>
          <p class="mt-1 px-2 text-sm text-gray-500" :class="[msgClass]">
            {{ message }}
          </p>
        </div>

        <div class="overflow-hidden shadow sm:rounded-md">
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
                  class="p-2 mt-2 block w-full rounded-md border-gray-300 shadow-sm hover:outline-slate-100 focus:outline-slate-100 focus:ring-indigo-500 sm:text-sm"
                  :value="contact ? contact.attributes.name : ''"
                  @input="contact.attributes.name = $event.target.value"
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
                  autocomplete="on"
                  class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  :value="contact ? contact.attributes.position : ''"
                  @input="contact.attributes.position = $event.target.value"
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
                  autocomplete="on"
                  class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  :value="contact ? contact.attributes.pred : ''"
                  @input="contact.attributes.pred = $event.target.value"
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
                  :value="contact ? contact.attributes.dept : ''"
                  @input="contact.attributes.dept = $event.target.value"
                />
              </div>
              <div class="col-span-3">
                <label
                  for="rors5"
                  class="block text-sm font-medium text-gray-700"
                  >Номер 5-знач.*</label
                >
                <input
                  type="text"
                  name="rors5"
                  id="rors5"
                  class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  :value="contact ? contact.attributes.rors5 : ''"
                  @input="contact.attributes.rors5 = $event.target.value"
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
                  :value="contact ? contact.attributes.rors10 : ''"
                  @input="contact.attributes.rors10 = $event.target.value"
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
                  :value="contact ? contact.attributes.description : ''"
                  @input="contact.attributes.description = $event.target.value"
                />
              </div>
            </div>
          </div>
          <div class="px-4 py-3 text-right sm:px-6">
            <button
              @click.stop="save"
              class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 mx-4 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Сохранить
            </button>
            <button
              @click.stop="cancel"
              class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Закрыть
            </button>
          </div>
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
      contact: '',
      message: 'Внесите изменения и сохраните',
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
      this.close(true)
    },
    cancel() {
      this.resolver(
        new Promise((resolve, reject) => reject(new Error('cancelled')))
      )
      this.close(false)
      // this.$dialog.close()
    },
    close(isSaved) {
      this.messageOutput(isSaved)
    },
    messageOutput(isSaved) {
      // Вывод сообщения об успешном/неуспешном сохранении
      this.msgClass = isSaved
        ? 'bg-green-500 text-neutral-50'
        : 'bg-rose-600 text-neutral-50'
      this.message = isSaved
        ? 'Сохранение успешно'
        : 'Отмена или ошибка при сохранении'
      setTimeout(() => {
        this.message = 'Внесите изменения и сохраните'
        this.msgClass = ''
        this.open = false
      }, 1300)
    },
    dialogFn({ contact, open, resolver }) {
      this.contact = contact
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
</style>
