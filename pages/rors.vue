<template>
  <div>
    <div class="w-3/4 mx-auto">
      <h1 class="font-bold text-lg text-gray-500 text-center">
        Справочник номеров РОРС Петропавловского отделения ЮУрЖД
      </h1>
      <div class="flex justify-end">
        <div class="updated">обновлен: {{ lastUpdated }}</div>
      </div>

      <div class="flex flex-wrap justify-center mt-1 mb-4">
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
          v-if="uniqueDepts && isAdmin"
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
            <th v-if="isAdmin">Примечание</th>
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
            <td class="text-center text-sky-800 font-medium">
              {{ contact.attributes.rors5 }}
            </td>

            <td class="text-center">{{ contact.attributes.pred }}</td>
            <td class="text-left pl-4">{{ contact.attributes.dept }}</td>
            <td v-if="isAdmin" class="text-left pl-4 pr-4">
              {{ contact.attributes.description }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  auth: false,
  data: () => ({
    contacts: [],
    uniqueDepts: {},
    visibleContacts: [],
    lastUpdated: '',
  }),
  methods: {
    initUniqueDepts() {
      let depts = [],
        lastUpdated = 0
      for (let i = 0; i < this.contacts.length; i++) {
        // определение даты последнего обновления
        const date = new Date(this.contacts[i].attributes.updatedAt)
        const epochTime = date.getTime()
        if (epochTime > lastUpdated) {
          lastUpdated = epochTime
          // составление даты для отображения
          const year = date.getFullYear()
          const month =
            date.getMonth() < 9
              ? '0' + (date.getMonth() + 1)
              : date.getMonth() + 1
          const day = date.getDate() < 9 ? '0' + date.getDate() : date.getDate()
          this.lastUpdated = `${day}.${month}.${year} г.`
        }

        // добавлять подразделения в зависимости от уровня доступа и значения поля public контакта
        if (this.isAdmin) {
          depts.push(
            this.makeMergedDeptName({
              pred: this.contacts[i].attributes.pred,
              dept: this.contacts[i].attributes.dept,
            })
          )
        } else if (this.contacts[i].attributes.public) {
          // если пользователь без прав администратора - добавлять подразделения только public контактов
          depts.push(
            this.makeMergedDeptName({
              pred: this.contacts[i].attributes.pred,
              dept: this.contacts[i].attributes.dept,
            })
          )
        }
      }
      const filteredDepts = depts.filter(
        // формируем массив уникальных значений
        (dept, index, array) => array.indexOf(dept) === index
      )
      filteredDepts.forEach((dept) => {
        this.uniqueDepts[dept] = false
      })
    },
    makeMergedDeptName({ pred, dept }) {
      // добавляет поле mergedDept (Pred | Dept) к объекту contact

      let mergedDept = dept ? `${pred} | ${dept}` : pred
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
        const mergedDeptName = this.makeMergedDeptName({
          pred: contact.attributes.pred,
          dept: contact.attributes.dept,
        })
        if (!currMergedDept) {
          currMergedDept = mergedDeptName
          numInDept = 1
        } else if (currMergedDept == mergedDeptName) {
          numInDept++
        } else {
          numInDept = 1
          currMergedDept = mergedDeptName
        }
        contact.numInDept = numInDept

        const isVisible = this.uniqueDepts[mergedDeptName]
        if (this.isAdmin) {
          // при наличии прав администратора
          return isVisible // выводить все контакты
        } else if (contact.attributes.public) {
          // иначе - выводить только контакты public = true
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
      if (!this.isAdmin) return
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
            contact.data.updated_by_id = this.$auth.user.id // добавление поля id текущего пользователя

            const response = await this.$axios.$put(
              `api/contacts/${fields.id}`,
              contact
            )
            const updatedContact = response.data
            if (updatedContact) {
              this.lastUpdated = updatedContact.updatedAt
              await this.fetchContacts()
              this.initUniqueDepts()
              this.updateCurrentDept(
                this.makeMergedDeptName({
                  pred: updatedContact.pred,
                  dept: updatedContact.dept,
                })
              )
              this.makeVisibleContacts()
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
            created_by_id: this.$auth.user.id,
          },
        },
        resolver: async (result) => {
          try {
            const fields = await result // в fields возвращается объект данных из полей формы
            const contact = {}
            contact.data = fields.attributes

            const res = await this.$axios.$post(`api/contacts`, contact)

            if (res.data) {
              const createdContact = res.data

              this.lastUpdated = createdContact.updatedAt
              await this.fetchContacts()
              this.initUniqueDepts()
              this.updateCurrentDept(
                this.makeMergedDeptName({
                  pred: createdContact.pred,
                  dept: createdContact.dept,
                })
              )
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
    updateCurrentDept(dept) {
      // помечает для отображения подразделение dept
      for (let key in this.uniqueDepts) {
        if (key === dept) {
          this.uniqueDepts[key] = true
        } else {
          this.uniqueDepts[key] = false
        }
      }
    },
    async fetchContacts() {
      const result = await this.$axios.$get(
        'api/contacts?sort[0]=dept&sort[1]=name&pagination[pageSize]=10000'
      )
      if (result.data) {
        this.contacts = result.data
        return
      } else {
        this.$sysmessage({
          alert: 'Ошибка получения данных. Обратитесь к администратору',
        })
        throw new Error('Ошибка получения данных')
      }
    },
  },
  async mounted() {
    await this.fetchContacts()
    this.initUniqueDepts()
    this.makeVisibleContacts()
  },
  computed: {
    ...mapGetters(['loggedInUser', 'getUserRole']),

    isAdmin() {
      // установка флага администратора справочника РОРС

      if (this.loggedInUser) {
        if (this.getUserRole === 'admin' || this.getUserRole === 'editor') {
          return true
        }
      } else return false
    },
  },
}
</script>
<style scoped>
.btn {
  @apply font-normal py-1 px-4 mr-2 mt-2 rounded whitespace-nowrap;
  box-shadow: -3px -3px 9px rgba(255, 255, 255, 0.45),
    3px 3px 9px rgba(94, 104, 121, 0.3);
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
.updated {
  @apply px-3 pb-[2px]  border border-red-300 text-red-400 text-xs rounded-lg;
  box-shadow: -3px -3px 9px rgba(255, 255, 255, 0.45),
    3px 3px 9px rgba(94, 104, 121, 0.3);
}
</style>
