<template>
  <div>
    <div
      class="flex min-h-screen flex-col container border border-indigo-500 mx-auto"
    >
      <header
        class="flex header items-center justify-between border border-red-500 p-3"
      >
        <div class="mx-4 px-3 border border-green-500">Logo</div>
        <div class="flex items-center justify-end">
          <div class="mx-4 px-3 border border-orange-500">Menu 1</div>
          <div class="mx-4 px-3 border border-orange-500">Menu 2</div>
          <div class="mx-4 px-3 border border-orange-500">Menu 3</div>
          <div class="mx-4 px-3 border border-orange-500">Menu 4</div>
          <div class="border border-orange-500">Log in</div>
        </div>
      </header>
      <div class="message border border-blue-700 h-10">Message</div>
      <div class="main_wrapper grid grid-cols-12 border border-purple-700">
        <aside class="aside col-span-2 border border-yellow-700">
          Aside Left
        </aside>
        <main class="main col-span-8 border border-yellow-700">Main</main>
        <aside class="aside col-span-2 border border-yellow-700">
          Aside Right
        </aside>
      </div>
      <footer class="flex sticky top-[100vh] border border-lime-600">
        Footer
      </footer>
    </div>
  </div>
</template>
