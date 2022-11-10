<template>
  <client-only>
    <nav>
      <div>
        <ul class="flex items-start mt-2">
          <li>
            <img src="/logoshch_red.png" class="m-auto mainlogo" alt="" />
          </li>
          <li>
            <nuxt-link
              tag="a"
              to="/news"
              active-class="font-bold"
              exact
              no-prefetch
              class="px-4"
              >Новости</nuxt-link
            >
          </li>
          <li>
            <nuxt-link
              tag="a"
              to="/rors"
              active-class="font-bold"
              exact
              no-prefetch
              class="px-4"
              >Справочник РОРС</nuxt-link
            >
          </li>
        </ul>
      </div>
    </nav>
  </client-only>
</template>

<style scoped>
.mainlogo {
  width: 200px;
  margin: 5px 55px 0 15px;
}
</style>
