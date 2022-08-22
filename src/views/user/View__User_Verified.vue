<template>
  <div>
    <base-title>Email verificata</base-title>
    <p>
      <span class="has-text-weight-bold">Compilementi!</span> La tua email è
      stata correttamente verificata.
    </p>
    <p class="mt-2">
      Per accedere all'area riservata, effettua il login con le credenziali che
      hai scelto.
    </p>
    <router-link
      class="button is-primary mt-5"
      :to="{ name: 'route-user-signin' }"
    >
      vai alla pagina di login
    </router-link>
  </div>
</template>
