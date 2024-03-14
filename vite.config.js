import { fileURLToPath, URL } from 'node:url'
import path, { resolve } from 'node:path'
import * as fs from 'node:fs'
import matter from 'gray-matter'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// use auto import com...
import AutoImport from 'unplugin-auto-import/vite'
// use auto import user components th...
import Components from 'unplugin-vue-components/vite'

// file route config need's
import VitePages from "vite-plugin-pages";

// https://github.com/JohnCampionJr/vite-plugin-vue-layouts
import Layouts from 'vite-plugin-vue-layouts';

// https://github.com/unplugin/unplugin-vue-markdown
import Markdown from 'unplugin-vue-markdown/vite'
import MarkdownItAnchor from 'markdown-it-anchor'
import MarkdownItPrism from 'markdown-it-prism'
import { full as emoji } from 'markdown-it-emoji'
import { demo } from "@mdit/plugin-demo";
import { attrs } from "@mdit/plugin-attrs"

// 
import MarkdownItCopy from 'markdown-it-copy'


// https://vitejs.dev/config/
export default defineConfig({
  // ssgOptions: {
  //   format: 'cjs',
  // },
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
    Markdown({
      // headEnabled: true,
      // default options passed to markdown-it
      // see: https://markdown-it.github.io/markdown-it/
      markdownItOptions: {
        breaks: true,
        typographer: true,
      },
      // A function providing the Markdown It instance gets the ability to apply custom settings/plugins
      markdownItSetup(md) {
        // for example
        md.use(MarkdownItAnchor, {
          // permalink: MarkdownItAnchor.permalink[]
          permalink: true,
          permalinkSymbol: '#',
          permalinkBefore: true
        }),
          md.use(attrs),
          md.use(MarkdownItPrism, {
            highlightInlineCode: true,
            plugins: ['copy-to-clipboard']
          }),
          md.use(MarkdownItCopy,),
          md.use(emoji, {
            shortcuts: {
              "sm": [':-)']
            }
          }),
          md.use(demo)
        // md.use(MarkdownItTocDoneRight)
      },
    }),
    AutoImport({
      imports: ['vue', 'vue-router']
    }),
    Components({
      // relative paths to the directory to search for components.
      dirs: ['src/components'],

      // // valid file extensions for components.
      extensions: ['vue', 'md'],

      // // Glob patterns to match file names to be detected as components.
      // // When specified, the `dirs` and `extensions` options will be ignored.
      // globs: ['src/components/*.{vue}'],

      // // search for subdirectories
      // deep: false,

      // // resolvers for custom components
      // resolvers: [],

      // // generate `components.d.ts` global declarations,
      // // also accepts a path for custom filename
      // // default: `true` if package typescript is installed
      // dts: false,

      // // Allow subdirectories as namespace prefix for components.
      // directoryAsNamespace: true,

      // // Collapse same prefixes (camel-sensitive) of folders and components
      // // to prevent duplication inside namespaced component name.
      // // works when `directoryAsNamespace: true`
      // collapseSamePrefixes: false,

      // // Subdirectory paths for ignoring namespace prefixes.
      // // works when `directoryAsNamespace: true`
      // globalNamespaces: [],

      // // auto import for directives
      // // default: `true` for Vue 3, `false` for Vue 2
      // // Babel is needed to do the transformation for Vue 2, it's disabled by default for performance concerns.
      // // To install Babel, run: `npm install -D @babel/parser`
      // directives: true,

      // // Transform path before resolving
      // importPathTransform: v => v,

      // // Allow for components to override other components with the same name
      // allowOverrides: false,

      // // filters for transforming targets
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      // exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],

      // // Vue version of project. It will detect automatically if not specified.
      // // Acceptable value: 2 | 2.7 | 3
      // // version: 2.7,

      // // Only provide types of components in library (registered globally)
      // types: []
    }),
    VitePages({
      extensions: ["vue", "md"],
      pagesDir: "src/pages",
      exclude: ['**/components/*.vue'],
      // add each md's frontmatter to correspondly route's meta
      extendRoute(route) {
        const path = resolve(__dirname, route.component.slice(1))
        const md = fs.readFileSync(path, "utf-8")
        const { data } = matter(md)
        route.meta = Object.assign(route.meta || {}, { frontmatter: data })

        return route
      },
      // modify blog route to get all md's frontmatter data which link from dir folder
      // routes i.g.
      //   [{
      //      name: 'posts-start-here',
      //      path: '/posts/start-here',
      //      component: '/src/pages/posts/start-here.md',
      //      props: true,
      //      meta: { layout: 'article', frontmatter: [Object] }
      //     },{
      //     name: 'ai-first',
      //     path: '/ai/first',
      //     component: '/src/pages/ai/first.md',
      //     props: true,
      //     meta: { layout: 'article', toc: [], frontmatter: {} }
      //   },
      //   {
      //     name: 'index',
      //     path: '/',
      //     component: '/src/pages/index.vue',
      //     customBlock: undefined,
      //     props: true,
      //     meta: { frontmatter: {} }
      //   },
      //   {
      //     name: 'blog',
      //     path: '/blog',
      //     component: '/src/pages/blog.vue',
      //     customBlock: undefined,
      //     props: true,
      //     meta: { frontmatter: {} }
      //   },
      //   {
      //     name: 'all',
      //     path: '/:all(.*)*',
      //     component: '/src/pages/[...all].vue',
      //     props: true,
      //     meta: { layout: 404, frontmatter: {} }
      //   }
      // ]
      // tabs like this:
      // -----------tabs--------- {
      //   webfront: [
      //     {
      //       name: 'webfront-test',
      //       path: '/webfront/test',
      //       component: '/src/pages/webfront/test.md',
      //       props: true,
      //       meta: [Object]
      //     },
      //     {
      //       name: 'webfront-first',
      //       path: '/webfront/first',
      //       component: '/src/pages/webfront/first.md',
      //       props: true,
      //       meta: [Object]
      //     }
      //   ],
      //   posts: [
      //     {
      //       name: 'posts-start-here',
      //       path: '/posts/start-here',
      //       component: '/src/pages/posts/start-here.md',
      //       props: true,
      //       meta: [Object]
      //     },
      //     {
      //       name: 'posts-function-upgrade',
      //       path: '/posts/function-upgrade',
      //       component: '/src/pages/posts/function-upgrade.md',
      //       props: true,
      //       meta: [Object]
      //     }
      //   ],
      //   net: [
      //     {
      //       name: 'net-test',
      //       path: '/net/test',
      //       component: '/src/pages/net/test.md',
      //       props: true,
      //       meta: [Object]
      //     },
      //     {
      //       name: 'net-first',
      //       path: '/net/first',
      //       component: '/src/pages/net/first.md',
      //       props: true,
      //       meta: [Object]
      //     }
      //   ],
      //   ai: [
      //     {
      //       name: 'ai-first',
      //       path: '/ai/first',
      //       component: '/src/pages/ai/first.md',
      //       props: true,
      //       meta: [Object]
      //     }
      //   ]
      // }
      onRoutesGenerated(routes) {         
        let rBlog = routes.find(r => r.name === 'blog' )
        // unincludes 'blog' route and 'all' route and 'index' route
        let tabs = {}
        // limit which folder can be process
        let tabsFolder = ['posts','ai','javascript','net']
        for (const route of routes.filter(r => !['blog','all','index','project'].includes(r.name))) {
          // build blog's tabs data
          let tab = route.name.slice(0, route.name.indexOf('-'))
          if (!tabs.hasOwnProperty(tab))
              tabs[tab] = []
          if (tabsFolder.includes(tab))
            tabs[tab].push({
              ...route
            })          
        }
        rBlog.meta = Object.assign(rBlog.meta || {}, { tabs: tabs })
      },
    }),
    Layouts()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    // get smaller bundle file, ops, no longer support ,need to install terser lib
    // minify: 'terser',
  },
  // use esbuild to drop console command before build proj
  // https://esbuild.github.io/api/#drop
  esbuild:{
    drop: ['console']
  }
})
