<template>
  <section
    id="error-section"
    class="is-flex is-flex-direction-column is-justify-content-center is-align-items-center p-5"
  >
    <img id="error-image" src="/images/404.svg" alt="404 error" />
    <div class="has-text-centered">
      <h1 class="is-size-2 has-text-weight-bold">Errore 404</h1>
      <p>La pagina che hai richiesto non esiste</p>
      <a href="/" class="is-inline-block mt-4">Torna alla Homepage</a>
    </div>
  </section>
</template>

<style lang="scss" scoped>
#error-section {
  height: 100%;
  #error-image {
    height: 400px;
  }
}
</style>
