//@ts-nocheck

export default defineNuxtConfig({
    modules: ["@nuxt/content", "@nuxtjs/google-fonts"],
    googleFonts: {
        families: {
            Spectral: [400, 700],
            Megrim: true,
        },
    },
});
