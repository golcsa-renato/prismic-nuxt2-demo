<template>
  <div>
    <ul class="text-center">
      <li
        v-for="(item, i) in navigation.data.links"
        :key="$prismic.asText(item.label) + i"
        :class="`menu-item ${
          item.dropdown ? 'menu-item-has-children arrow' : ''
        }`"
      >
        <template v-if="!item.dropdown">
          <PrismicLink :field="item.link">
            {{ $prismic.asText(item.label) }}
          </PrismicLink>
        </template>
        <template v-if="item.dropdown">
          <a href="#">{{ $prismic.asText(item.label) }} ↓</a>
          <ul class="sub-menu underline">
            <template v-for="(subItem, i2) in navigation.data.dropdown">
              <li
                v-if="item.key == subItem.key"
                :key="$prismic.asText(subItem.label) + i2"
                class="menu-item"
              >
                <PrismicLink :field="subItem.link">
                  {{ $prismic.asText(subItem.label) }}
                </PrismicLink>
              </li>
            </template>
          </ul>
        </template>
      </li>
      <!-- Language Selector -->
      <li v-for="lang in alternateLanguages" :key="lang.lang">
        <PrismicLink :field="{ ...lang, link_type: 'Document' }">
          <span class="sr-only">{{ lang.lang }}</span>
          <span class="fi" :class="languageClass(lang.lang)"></span>
        </PrismicLink>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TheHeader',
  props: {
    navigation: {
      type: Object,
      required: true,
    },
    alternateLanguages: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    languageClass(language) {
      const languageCode = language.slice(-2)
      return `fi-${languageCode}`
    },
  },
}
</script>
