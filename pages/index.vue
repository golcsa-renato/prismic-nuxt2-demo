<template>
  <div>
    <SliceZone :slices="page.data.slices" :components="components" />
  </div>
</template>

<script>
import { components } from '~/slices'

export default {
  name: 'IndexPage',
  async asyncData({ $prismic, store, i18n }) {
    const lang = i18n.locale
    const page = await $prismic.api.getByUID('page', 'home', { lang })
    await store.dispatch('prismic/load', { lang, page })
    return {
      page,
    }
  },
  data() {
    return { components }
  },
  head() {
    return {
      title: 'Index page title',
      bodyAttrs: {
        class:
          '',
      },
    }
  },
}
</script>
