<template>
  <div class="mt-10">
    <div class="w-3/4 mx-auto">
      <h1 class="font-bold text-lg text-gray-500 text-center mb-5">
        Справочник номеров РОРС Петропавловского отделения ЮУрЖД
      </h1>
      <div class="flex flex-wrap justify-center my-4">
        <button
          v-for="(value, key) in uniqueDepts"
          :key="key"
          class="btn"
          :class="[value ? 'btn-pressed' : 'btn-white']"
          :value="key"
          @click="toggleVisible"
        >
          {{ key }}
        </button>
        <button
          class="btn"
          :class="[isAllDeptsSelected() ? 'btn-pressed' : 'btn-white']"
          @click="toggleVisibleAll"
        >
          Все
        </button>
      </div>
    </div>
    <div class="w-3/4 mx-auto">
      <table class="min-w-full border text-center">
        <thead class="bg-white border-b">
          <tr class="text-sm font-medium text-gray-900 px-6 py-4 text-center">
            <th class="px-6 py-4">№</th>
            <th>Ф.И.О.</th>
            <th>Должность</th>
            <th>Номер</th>
            <th>Номер РОРС (10-знач.)</th>
            <th>Предприятие</th>
            <th>Подразделение</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(contact, key) in visibleContacts"
            class="border-b"
            :class="contact.numInDept == 1 ? 'border-t-4' : ''"
            :key="key"
            @click="openDialog"
            :data-id="contact.id"
          >
            <td class="text-center">{{ contact.numInDept }}</td>
            <td class="text-left pl-4">{{ contact.attributes.name }}</td>
            <td class="text-left pl-4">{{ contact.attributes.position }}</td>
            <td class="text-center">{{ contact.attributes.rors5 }}</td>
            <td class="text-center">{{ contact.attributes.rors10 }}</td>
            <td class="text-left pl-4">{{ contact.attributes.pred }}</td>
            <td class="text-left pl-4">{{ contact.attributes.dept }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    contacts: [],
    uniqueDepts: {},
    visibleContacts: [],
  }),
  methods: {
    initUniqueDepts() {
      let depts = [],
        mergedDept
      for (let i = 0; i < this.contacts.length; i++) {
        let pred = this.contacts[i].attributes.pred
        let dept = this.contacts[i].attributes.dept

        mergedDept = dept ? `${pred} | ${dept}` : pred

        this.contacts[i].attributes.mergedDept = mergedDept

        depts.push(mergedDept)
      }
      const filteredDepts = depts.filter(
        (dept, index, array) => array.indexOf(dept) === index
      )
      filteredDepts.forEach((dept) => {
        this.uniqueDepts[dept] = false
      })
    },
    toggleVisible(e) {
      this.uniqueDepts[e.target.value] = !this.uniqueDepts[e.target.value]
      this.makeVisibleContacts()
    },
    toggleVisibleAll() {
      const allBtnsIsPressed = this.isAllDeptsSelected()

      for (let key in this.uniqueDepts) {
        this.uniqueDepts[key] = !allBtnsIsPressed
      }
      this.makeVisibleContacts()
      return
    },

    makeVisibleContacts() {
      // проход по массиву contacts и отбор элементов массива uniqueDepts которые == true
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
        return this.uniqueDepts[contact.attributes.mergedDept]
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
    openDialog() {
      this.$dialog.open({
        message: 'Are you sure you want to do this?',
        resolver: async (result) => {
          try {
            const res = await result
            /* eslint-disable no-console */
            console.log(res)
          } catch (error) {
            console.warn(error)
          }
        },
      })
    },
  },

  async mounted() {
    const response = await fetch(
      'http://localhost:1337/api/contacts?sort[0]=dept&sort[1]=name'
    )
    const result = await response.json()
    this.contacts = result.data

    this.initUniqueDepts()
    this.makeVisibleContacts()
    console.log('mounted main')
  },
}
</script>
<style scoped>
.btn {
  @apply font-normal py-1 px-4 mr-2 mt-2 rounded whitespace-nowrap;
}
.btn-white {
  @apply text-blue-700 bg-transparent border border-blue-500;
}
.btn-pressed {
  @apply bg-indigo-600 hover:bg-indigo-700 border-transparent border text-white;
}
td {
  cursor: pointer;
}
</style>