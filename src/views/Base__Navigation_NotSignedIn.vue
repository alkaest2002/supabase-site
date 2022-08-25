<template>
  <div class="navbar-item">
    <div class="buttons">
      <router-link class="button is-light" :to="{ name: 'route-user-signin' }">
        entra
      </router-link>
      <router-link
        class="button is-primary"
        :to="{ name: 'route-user-signup' }"
      >
        registrati
      </router-link>
    </div>
  </div>
</template>
