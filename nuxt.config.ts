//@ts-nocheck

export default defineNuxtConfig({
    modules: ["@nuxt/content", "@nuxtjs/google-fonts"],
    target: 'static',
    router: {
      base: '/josewenzel.github.io/'
    },
    googleFonts: {
        families: {
            Spectral: [400, 700],
            Megrim: true,
        },
    },
    runtimeConfig: {
        githubUrl: "https://github.com/josewenzel"
    }
});
