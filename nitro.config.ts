import { createResolver, defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule<{}>({
  setup (options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    nuxt.hook('nitro:config', (nitro) => {
      // ensure `nitro.plugins` is initialized
      nitro.plugins = nitro.plugins || []

      // add your custom plugin
      // nitro.plugins.push(resolve('runtime/plugins/testDevice'))
    })
  }
})