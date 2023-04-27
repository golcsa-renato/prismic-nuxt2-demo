import TheMobileMenu from '../components/TheMobileMenu.vue';

<template>
  <div>
    <TheHeader
        :navigation="navigation"
        :alternate-languages="alternateLanguages"
      />
      <Nuxt />
      <TheFooter />
  </div>
</template>

<script>
export default {
  computed: {
    navigation() {
      return this.$store.state.prismic.navigation
    },
    alternateLanguages() {
      return this.$store.state.prismic.alternateLanguages
    },
  },
}
</script>
