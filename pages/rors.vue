<template>
  <div class="mt-10">
    <div class="w-3/4 mx-auto">
      <h1 class="font-bold text-lg text-gray-500 text-center">
        Справочник номеров РОРС Петропавловского отделения ЮУрЖД
      </h1>
      <div class="flex flex-wrap justify-center my-4">
        <button
          v-for="(value, key) in uniqueDepts"
          :key="key"
          class="btn"
          :class="[value ? 'btn-pressed' : 'btn-white']"
          :value="key"
          @click="toggleDeptBtn"
        >
          {{ key }}
        </button>
        <button
          v-if="uniqueDepts"
          class="btn"
          :class="[isAllDeptsSelected() ? 'btn-pressed' : 'btn-white']"
          @click="toggleAllDeptsBtn"
        >
          Все
        </button>
        <button v-if="isAdmin" @click="createContactModal" class="btn btn-new">
          Создать
        </button>
      </div>
    </div>
    <div v-if="visibleContacts.length" class="w-3/4 mx-auto">
      <table class="min-w-full border text-center">
        <thead class="bg-white border-b">
          <tr class="text-sm font-medium text-gray-900 px-6 py-4 text-center">
            <th class="px-6 py-4">№</th>
            <th>Ф.И.О.</th>
            <th>Должность</th>
            <th>Номер</th>
            <th>Предприятие</th>
            <th>Подразделение</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(contact, key) in visibleContacts"
            class="border-b"
            :class="contact.numInDept == 1 ? 'border-t-2' : ''"
            :key="key"
            @click="editContactModal"
            :data-id="contact.id"
          >
            <td class="text-center">{{ contact.numInDept }}</td>
            <td class="text-left pl-4">{{ contact.attributes.name }}</td>
            <td class="text-left pl-4">{{ contact.attributes.position }}</td>
            <td class="text-center">{{ contact.attributes.rors5 }}</td>

            <td class="text-center">{{ contact.attributes.pred }}</td>
            <td class="text-left pl-4">{{ contact.attributes.dept }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="version flex justify-center text-xs text-indigo-700 my-14">
      {{ `Версия приложения ${version}` }}
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    contacts: [],
    uniqueDepts: {},
    visibleContacts: [],
    isAdmin: false,
    version: '0.9.1 от 02.12.2022 г.',
    lastUpdated: '',
  }),
  methods: {
    initUniqueDepts() {
      let depts = []
      for (let i = 0; i < this.contacts.length; i++) {
        depts.push(this.makeMergedDeptName(this.contacts[i]))
      }
      const filteredDepts = depts.filter(
        // формируем массив уникальных значений
        (dept, index, array) => array.indexOf(dept) === index
      )
      filteredDepts.forEach((dept) => {
        this.uniqueDepts[dept] = false
      })
    },
    makeMergedDeptName(contact) {
      // добавляет поле mergedDept (Pred | Dept) к объекту contact
      let pred = contact.attributes.pred
      let dept = contact.attributes.dept
      let mergedDept = dept ? `${pred} | ${dept}` : pred
      contact.attributes.mergedDept = mergedDept
      return mergedDept
    },
    toggleDeptBtn(e) {
      // функция обработки нажатия кнопки выбора подразделения
      let isAllDeptsSelected = this.isAllDeptsSelected()
      for (let key in this.uniqueDepts) {
        if (key === e.target.value) {
          if (this.uniqueDepts[key]) {
            // кнопка подразделения активна
            if (isAllDeptsSelected) {
              // если выбраны все подразделения
              this.uniqueDepts[key] = true // сделать кнопку активной
            } else {
              this.uniqueDepts[key] = !this.uniqueDepts[key] // иначе - инвертируется выбор
            }
          } else {
            this.uniqueDepts[key] = true // если кнопка неактивна - сделать активной
          }
        } else {
          this.uniqueDepts[key] = false // все кнопки, кроме текущей, сделать неактивными
        }
      }
      this.makeVisibleContacts()
    },
    toggleAllDeptsBtn() {
      const allBtnsIsPressed = this.isAllDeptsSelected()

      for (let key in this.uniqueDepts) {
        this.uniqueDepts[key] = !allBtnsIsPressed
      }
      this.makeVisibleContacts()
      return
    },

    makeVisibleContacts() {
      // проход по массиву contacts и отбор элементов, подразделение которых в uniqueDepts == true
      let numInDept = 0,
        currMergedDept
      this.visibleContacts = this.contacts.filter((contact) => {
        // ряд условий, по которым производится нумерация контактов в пределах подразделения
        if (!currMergedDept) {
          currMergedDept = contact.attributes.mergedDept
          numInDept = 1
        } else if (currMergedDept == contact.attributes.mergedDept) {
          numInDept++
        } else {
          numInDept = 1
          currMergedDept = contact.attributes.mergedDept
        }
        contact.numInDept = numInDept

        const isVisible = this.uniqueDepts[contact.attributes.mergedDept]
        if (this.isAdmin) {
          return isVisible
        } else if (contact.attributes.public) {
          return isVisible
        }
      })
      return
    },
    isAllDeptsSelected() {
      if (Object.keys(this.uniqueDepts).length === 0) {
        return false
      }
      // перебор значений свойств объекта uniqueDepts
      for (let key in this.uniqueDepts) {
        if (!this.uniqueDepts[key]) {
          return false
        }
      }
      return true
    },
    editContactModal(e) {
      const id = e.target.closest('tr').dataset.id
      const currContact = this.contacts.find((contact) => contact.id == id)

      this.$dialog.open({
        dialogProps: { title: 'Редактирование контакта РОРС' },
        contact: currContact,
        resolver: async (result) => {
          try {
            const fields = await result // в fields возвращается объект данных из полей формы
            const contact = {}
            contact.data = fields.attributes

            const response = await fetch(
              `http://localhost:1337/api/contacts/${fields.id}`,
              { method: 'PUT', body: JSON.stringify(contact) }
            )
            const res = await response.json()
            if (res.data) {
              this.$sysmessage({
                success: 'Успешное обновление данных',
              })
            }
          } catch (error) {
            this.$sysmessage({
              alert: 'Отмена сохранения или ошибка обновления данных',
            })
            console.warn(error)
          }
        },
      })
    },
    createContactModal() {
      this.$dialog.open({
        dialogProps: { title: 'Создание нового контакта РОРС' },
        contact: {
          attributes: {
            name: '',
            position: '',
            rors5: '',
            rors10: '',
            pred: '',
            dept: '',
            description: '',
            public: true,
          },
        },
        resolver: async (result) => {
          try {
            const fields = await result // в fields возвращается объект данных из полей формы
            const contact = {}
            contact.data = fields.attributes

            const response = await fetch(`http://localhost:1337/api/contacts`, {
              method: 'POST',
              body: JSON.stringify(contact),
            })

            const res = await response.json()
            if (res.data) {
              const newContact = JSON.parse(res.data)

              this.contacts.push({ id: newContact.id, attributes: newContact })
              this.initUniqueDepts()
              // проход по uniqueDepts, установка всех подразделений false, а только что добавленного - true

              this.makeVisibleContacts()
              this.$sysmessage({ success: 'Новый контакт успешно создан' })
            }
          } catch (error) {
            this.$sysmessage({ alert: 'Не сохранено' })
            console.warn(error)
          }
        },
      })
    },
    async fetchContacts() {
      const response = await fetch(
        'http://localhost:1337/api/contacts?sort[0]=dept&sort[1]=name&pagination[pageSize]=10000'
      )
      const result = await response.json()
      if (result.data) {
        this.contacts = result.data
        this.initUniqueDepts()
        this.makeVisibleContacts()
      } else {
        this.$sysmessage({
          alert: 'Ошибка получения данных. Обратитесь к администратору',
        })
        throw new Error('Ошибка получения данных')
      }
    },
  },

  beforeMount() {
    this.fetchContacts()
  },
}
</script>
<style scoped>
.btn {
  @apply font-normal py-1 px-4 mr-2 mt-2 rounded whitespace-nowrap;
  box-shadow: -4px -4px 9px rgba(255, 255, 255, 0.45),
    4px 4px 9px rgba(94, 104, 121, 0.3);
}
.btn-white {
  @apply text-blue-700 bg-transparent border border-blue-400 hover:bg-indigo-500 hover:text-white;
}
.btn-pressed {
  @apply bg-indigo-600 hover:bg-indigo-500 border-transparent border text-white;
}
.btn-new {
  @apply text-green-500 bg-transparent border border-green-500 hover:bg-green-500 hover:text-white;
}
td {
  cursor: pointer;
}
</style>
