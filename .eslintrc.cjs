module.exports = {
  env: {
    node: true,
  },
  extends: ["eslint:recommended", "plugin:vue/vue3-recommended"],
  rules: {
    // override/add rules settings here, such as:
    "vue/max-attributes-per-line": "off",
    "vue/singleline-html-element-content-newline": "off",
    "vue/html-indent": "off",
    "vue/no-v-html": "off",
    "vue/html-self-closing": "off",
  },
};
