import Prismic from '@prismicio/client'
import { apiEndpoint } from './sm.json'

export default async () => {
  // Global page headers: https://go.nuxtjs.dev/config-head
  const client = await Prismic.getApi(apiEndpoint)
  const locales = client.languages.map((lang) => lang.id)
  const defaultLocale = locales[0]

  return {
    head: {
      title: 'page title',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
      script: [
        {
          src: 'https://static.cdn.prismic.io/prismic.js?new=true&repo=projectName',
          async: true,
          defer: true,
        },
      ],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: ['flag-icons/css/flag-icons.css'],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
      '@nuxtjs/prismic',
      // https://go.nuxtjs.dev/eslint
      '@nuxtjs/eslint-module',
      // https://go.nuxtjs.dev/tailwindcss
      '@nuxtjs/tailwindcss',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
      '@nuxtjs/i18n',
      /* Load Prismic module after i18n module to prevent extend route concurrency */ '@nuxtjs/prismic',
    ],

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
      transpile: ['@prismicio/vue'],
    },

    generate: {
      exclude: ['/slice-simulator'],
    },

    i18n: {
      locales,
      defaultLocale,
      detectBrowserLanguage: {
        useCookie: true,
      },
    },

    // Prismic CMS
    prismic: {
      endpoint: apiEndpoint,
      modern: true,
      linkResolver: (doc) => {
        const prefix = doc.lang === 'en-gb' ? '' : `/${doc.lang}`

        switch (doc.type) {
          case 'page':
            return doc.uid === 'home' ? prefix || '/' : `${prefix}/${doc.uid}`
          default:
            return prefix || '/'
        }
      },
    },
  }
}
