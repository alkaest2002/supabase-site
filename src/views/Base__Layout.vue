<template>
  <div id="main">
    <base-navigation />
    <div class="container is-max-widescreen p-3">
      <div
        class="is-flex is-flex-direction-column is-justify-content-center mt-6"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
