<template>
  <SliceZone :slices="page.data.slices" :components="components" />
</template>

<script>
import { components } from '~/slices'

export default {
  name: 'CustomPage',
  async asyncData({ $prismic, params, store, i18n }) {
    const lang = i18n.locale
    const page = await $prismic.api.getByUID('page', params.uid, { lang })
    await store.dispatch('prismic/load', { lang, page })
    return {
      page,
    }
  },
  data() {
    return { components }
  },
}
</script>
