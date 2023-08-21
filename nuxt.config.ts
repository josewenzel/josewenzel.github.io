//@ts-nocheck

export default defineNuxtConfig({
    modules: ["@nuxt/content", "@nuxtjs/google-fonts"],
    target: 'static',
    router: {
      base: '/josewenzel.github.io/'
    },
    ssr: false,
    nitro: {
        preset: 'service-worker'
    },
    googleFonts: {
        families: {
            Spectral: [400, 700],
            Megrim: true,
        },
    },
});
