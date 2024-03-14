---
title: 如何构建这个站点
date: 2024-02-21
update: 2024-02-22
top: false
tags: test
---
<route lang="yaml">
meta:
  layout: article
</route>

<Mdtitle :title="frontmatter.title" :update="frontmatter.update" />

### 为何开始

&emsp;&emsp;先前的网站使用的是基于vuepress的一个扩展的博客和文档框架, [vuepress-theme-reco](https://github.com/vuepress-reco/vuepress-theme-reco-1.x)。

&emsp;&emsp;最初，我使用了1.x版本；框架集成了很多功能并开箱即用；使用下来，还行吧，中规中矩的文档博客风格。当时觉得，配置有点儿麻烦，文档并不完善细致，有些问题不好得到解决；回忆一下，那也已经是3年前了（2019年），可能作者太忙，维护项目精力有限。当时，耗费了一番精力部署了网站后，一直少有再去折腾。直到2023年底。

&emsp;&emsp;2023 Ai chat 风靡. 自己花了2个月的时间学习C#语言，写了一个Ai 聊天的混合应用，想着把他的相关介绍放在网站上面，就开始折腾这个站点。折腾前的想法就是想要有一个自由度高，自己能把握开发，风格简单，支持markdown文档的这么一个vue应用。经过，一番搜索后，看到了[antfu](https://antfu.me/) 的个人站点。非常喜欢！就是这样的！antfu 不用过多介绍吧，前端VUE生态非常活跃的人才~ 🤭 于是，开始了构建之旅~

### 技术栈

| 框架                                                                             | 功能                                          |
| :------------------------------------------------------------------------------- | :-------------------------------------------- |
| [bootstrap5](https://getbootstrap.com/)                                             | css ui 框架                                   |
| [vite](https://cn.vitejs.dev/)                                                      | 构建应用                                      |
| [vue](https://cn.vuejs.org/)                                                        | 渐进式js框架                                  |
| [unplugin-vue-markdown](https://github.com/unplugin/unplugin-vue-markdown)          | vue支持md/md中支持vue component ; 支持md插件  |
| [vite-plugin-vue-layouts](https://github.com/JohnCampionJr/vite-plugin-vue-layouts) | vue-router 的布局插件，可以分类风格化管理布局 |
| [vite-plugin-pages](https://github.com/hannoeru/vite-plugin-pages)                  | 基于文件的路由插件 支持md ，动态路由等        |
| [unplugin-auto-import](https://github.com/unplugin/unplugin-auto-import)            | 自动导入vue或其他库                           |
| [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components)      | 自动导入vue组件 按需引入                      |

### 项目目录

```
├─public
│  ├─css
│  └─image
└─src
    ├─assets
    │  ├─css
    │  └─image
    ├─back
    ├─components
    ├─layouts
    ├─pages
       ├─ai
       ├─net
       ├─posts
       └─webfront
```

components： 项目需要的自定义vue组件， 由 unplugin-vue-components/vite 自动导入
layouts：  路由布局，依据 vite-plugin-vue-layouts 配置
pages：  文章页面文件夹，分类保存了各个markdown文件。md文章路由使用 vite-plugin-pages 配置

### 开始项目

1. 新建Vite 项目，过程略，-- 没有使用typescript
2. 安装依赖，vue,router,以及需要的vite插件
3. 配置插件，vite.config.js 基础配置，略  --各插件都使用了默认配置

#### Main layout

&emsp;&emsp;这里图示了文章的主要布局，其他页面例如首页/项目/留言 等等，可以单独在定制.

Md-toc : md文档目录
Content : md文档内容
Header: 页头
Footer: 页尾

<img src="/public/image/mainlayout.png" width = "50%" class="img-thumbnail" />

#### Router process flow

<img src="/public/image/router-process-logic.png" width = "70%" class="img-thumbnail" />

#### vue.config.js

```js
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

      // valid file extensions for components.
      extensions: ['vue', 'md'],
      // filters for transforming targets
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
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
      onRoutesGenerated(routes) {   
        let rBlog = routes.find(r => r.name === 'blog' )
        // unincludes 'blog' route and 'all' route and 'index' route
        let tabs = {}
        // limit which folder can be process
        let tabsFolder = ['posts','ai','webfront','net']
        for (const route of routes.filter(r => !['index', 'all', 'blog'].includes(r.name)))) {
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
    // get smaller bundle file
    minify: 'terser',
  },
  // use esbuild to drop console command before build proj
  // https://esbuild.github.io/api/#drop
  esbuild:{
    drop: ['console']
  }
})
```

#### main.js

```javascript
import '@/assets/css/main.css'

// import { createApp } from 'vue'
// import { createPinia } from 'pinia'

import App from './App.vue'
// import router from './router'

import { createRouter, createWebHistory } from 'vue-router'
// vite-plugin-pages 生成的路由信息
import routes from "pages-generated";

import { setupLayouts } from 'virtual:generated-layouts'

// bootstrap color mod
const theme = localStorage.getItem('theme')
if (theme){
    document.documentElement.setAttribute('data-bs-theme', theme)
} else {
    localStorage.setItem('theme', 'light')
    document.documentElement.setAttribute('data-bs-theme', 'light')
}

const layoutRoutes = setupLayouts(routes)
const app = createApp(App)

// fromat date from md's frontmatter i.e. 22024-02-22 note: not with quote mark
app.config.globalProperties.$fromatDateFromMdMatter = (date) =>{
    let time = new Date(new Date(date).getTime())
    return time.toUTCString()
}

// app.use(createPinia())
app.use(createRouter({
    history: createWebHistory(),
    routes: layoutRoutes,
}))
console.log(routes)
app.mount('#app')
```

#### cdn资源引入

站点使用了[boot cdn](https://www.bootcdn.cn/) 用来引入bootstrap5，animate.css 和其他三方js功能库, 在index.html 头部引入：

```html
  <!-- use bootstrap -->
  <link href="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/5.3.1/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/5.3.1/js/bootstrap.bundle.js"></script>
  <!-- <link href="https://cdn.bootcdn.net/ajax/libs/bootstrap-icons/1.11.0/font/bootstrap-icons.min.css" rel="stylesheet"> -->

  <!-- use animate.css  -->
  <link href="https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.min.css" rel="stylesheet">
  <!-- use date js -->
  <script src="https://cdn.bootcdn.net/ajax/libs/datejs/1.0/date.min.js"></script>

  <!-- github markdown css -->
  <link href="https://cdn.bootcdn.net/ajax/libs/github-markdown-css/5.2.0/github-markdown.min.css" rel="stylesheet">
  <!-- use prism theme vs css 代码高亮 -->
  <!-- <link href="https://cdn.bootcdn.net/ajax/libs/prism-themes/1.9.0/prism-vs.min.css" rel="stylesheet"> -->
  <!-- 黑色主题 代码高亮 -->
  <link href="https://cdn.bootcdn.net/ajax/libs/prism-themes/1.9.0/prism-vsc-dark-plus.min.css" rel="stylesheet">

```

### 基础组件

准备一些网站基础布局组件，例如header, footer, backtotop等

#### Header组件

```js
<template>
  <!-- nav bar & menu -->
  <nav class="navbar navbar-expand-md bg-body-tertiary bg-opacity-10">
    <div class="container-sm">
      <a class="navbar-brand" href="/">aoaoms</a>
      <div class="collapse navbar-collapse me-3" id="navbarNav">
        <div class="d-flex justify-content-end w-100">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="/blog">博客</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="#">项目</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="#">留言</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="#">关于</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="d-flex justify-content-end hstack gap-3">
        <!-- blog -->
        <a class="icon-link d-md-none" href="#">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            class="bi bi-file-earmark-text" viewBox="0 0 16 16">
            <path
              d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5" />
            <path
              d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
          </svg>
        </a>
        <!-- project -->
        <a class="icon-link d-md-none" href="#">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lightbulb"
            viewBox="0 0 16 16">
            <path
              d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a2 2 0 0 0-.453-.618A5.98 5.98 0 0 1 2 6m6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1" />
          </svg>
        </a>
        <!-- message -->
        <a class="icon-link d-md-none" href="#">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat"
            viewBox="0 0 16 16">
            <path
              d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105" />
          </svg>
        </a>
        <!-- toggle dark or light -->
        <a class="icon-link" href="#">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            class="bi bi-brightness-high" viewBox="0 0 16 16">
            <path
              d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708" />
          </svg>
        </a>
      </div>
    </div>
  </nav>
</template>

```

#### Footer组件

```js
<template>
    <div class="w-100 text-center py-3 mt-5" style="font-size: 13PX;">
        <p class="d-inline-block">
            <a role="button" class="" href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank">CC BY-NC-SA 4.0 </a>
            2024-PRESENT © AOAOMS.COM
        </p>
    </div>
</template>
```

#### BackToTop 组件

```js
<script setup>
const isVisible = ref(false)

onMounted(() => {
    window.document.addEventListener("scroll", (e) =>{
        isVisible.value = window.scrollY >= 120
    })
})

const backToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
</script>

<template>
    <!-- Back to top button -->
    <button v-if="isVisible" type="button" class="btn btn-lg bbtt" id="btn-back-to-top" @click="backToTop">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up fs-2"
            viewBox="0 0 16 16">
            <path fill-rule="evenodd"
                d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z" />
        </svg>
    </button>
</template>

<style scoped>
/* 滚动到顶部 */
.bbtt {
    position: fixed;
    bottom: 40px;
    right: 30px;
}
</style>

```

#### 自制Md Toc

浅薄了哈，今天有点儿时间整整这个自动toc, 直接在toc组件里面注册onMounted 获取md 文档的h标签和a标签的数据，整理成目录列表。简单实用，可能没那么优雅~

获取文档h标签和link信息

```js
for (const h of window.document.getElementById("app").querySelectorAll('h3, h4')) {
    toc.push({
        parentId: h.tagName === 'H3'? 0 : 1,
        textContent: h.textContent.replaceAll('# ','')
    })
}
```

生成目录

```html
<ul class="markdown-body nav d-flex flex-column animate__animated"  :class="animateClass"
                style="font-size: 13px;">
    <li class="nav-item" v-for="item in toc" :key="item">                
        <a v-if="item.parentId == 0" class="cursor-hover py-1 ps-0" :href="'#' + item.textContent.replaceAll(' ','-')">{{ item.textContent }}</a>
        <a v-else class="cursor-hover py-1 ps-0 ms-4 " :href="'#' + item.textContent.replaceAll(' ','-')">
            {{ item.textContent }}              
        </a>
    </li>
</ul>
```

为何单独写一个toc组件？ 为了后期丰富组件内容。
维护仅获取h3 h4标签？ 我就用了这H1,H3和H4。H1不处理。H1 后面可以做SEO
自制toc 仅处理到2级目录，更多级没必要 也不美观！实际效果类似anthonyFu 的，细致处需要精雕~ 😄

::: demo 完整的Toc 组件

```js
<script setup>
const toc = reactive([])

const showPageNav = ref(true)
const animateClass = ref('animate__fadeIn')
const leavePageNav = () => {
    if (showPageNav.value) {
        animateClass.value = 'animate__fadeOut'
        setTimeout(() => {
            showPageNav.value = false
        }, 1500);
    }
}

const enterPageNav = () => {
    if (!showPageNav.value) {
        animateClass.value = 'animate__fadeIn'
        setTimeout(() => {
            showPageNav.value = true
        }, 300);
    }
}
// 公开方法用于文档组件调用 鼠标移入移出显示或隐藏toc
defineExpose({
    leavePageNav, enterPageNav
})

onMounted(() => {
    for (const h of window.document.getElementById("app").querySelectorAll('h3, h4')) {
        toc.push({
            parentId: h.tagName === 'H3'? 0 : 1,
            textContent: h.textContent.replaceAll('# ','')
        })
    }
})
</script>

<template>
    <!-- nav bar & menu -->
    <div class="mt-2 d-none d-md-block position-fixed" v-if="toc">
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-list"
                viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
            </svg>
        </div>
        <div v-if="showPageNav" class="mt-2 overflow-auto" style="height: 70vh;width: 20vw;">
            <ul class="markdown-body nav d-flex flex-column animate__animated"  :class="animateClass"
                style="font-size: 13px;">
                <li class="nav-item" v-for="item in toc" :key="item">                
                    <a v-if="item.parentId == 0" class="cursor-hover py-1 ps-0" :href="'#' + item.textContent.replaceAll(' ','-')">{{ item.textContent }}</a>
                    <a v-else class="cursor-hover py-1 ps-0 ms-4 " :href="'#' + item.textContent.replaceAll(' ','-')">
                        {{ item.textContent }}              
                    </a>
                </li>
            </ul>
        </div>    
    </div>
</template>
```

:::

### 自动处理文章路由

&emsp;&emsp;如何只关注写md文章，然后构建即可发布呢？ 聚焦到本站的blog路由，使用了一个Tabs 用于展示不同tab下的文章列表。每篇文章有固定路由导航到新窗口展示内容。那么，如何收集这些路由信息用于tabs内呢。答案就是使用 [vite-plugin-pages](https://github.com/hannoeru/vite-plugin-pages) 插件提供的扩展方法。

#### vite plugin pages

#### extendRoute

    Type: (route: any, parent: any | undefined) => any | void
A function that takes a route and optionally returns a modified route. This is useful for augmenting your routes with extra data (e.g. route metadata).

这个方法提供了可修改或添加路由元数据的能力. 方法本身不支持异步操作async. 如果需要异步处理文件，还可以使用另一个支持异步的方法：

#### onRoutesGenerated

    Type: (clientCode: string) => Awaitable<string | void>
A function that takes a generated client code and optionally returns a modified generated client code.

#### 项目内的处理

  1.每文章路由endpint 获取每md文章的frontmatter data数据存入route meta内
  reference: [用 Vite 构建静态网站](https://zhuanlan.zhihu.com/p/377593594)

```js
extendRoute(route) {
  const path = resolve(__dirname, route.component.slice(1))
  const md = fs.readFileSync(path, "utf-8")
  const { data } = matter(md)
  route.meta = Object.assign(route.meta || {}, { frontmatter: data })

  return route
}
```

2. 汇集所有tab 文件夹内的md文章路由信息到blog路由内

```js
onRoutesGenerated(routes) {     
  let rBlog = routes.find(r => r.name === 'blog' )
  // unincludes 'blog' route and 'all' route and 'index' route
  let tabs = {}
  // limit which folder can be process
  let tabsFolder = ['posts','ai','webfront','net']
  for (const route of routes.filter(r => r.name !== 'blog' && r.name !== 'all' && r.name !== 'index')) {
    // build blog's tabs data
    let tab = route.name.slice(0, route.name.indexOf('-'))
    if (!tabs.hasOwnProperty(tab) && tabsFolder.includes(tab))
      tabs[tab] = []
    tabs[tab].push({
      ...route
    })
  }
  rBlog.meta = Object.assign(rBlog.meta || {}, { tabs: tabs })
},
```

3. 在blog路由组件内使用tabs展示数据并提供导航

```js
// in setup
const tabs = reactive(useRoute().meta.tabs)

// lite code
<KeepAlive>
    <TabsList :list="tabs[activeTab]" :path="activeTab" :key="activeTab"/>
</KeepAlive>

```

### 构建项目

```js
npm run build
```

### 部署

构建的vue应用可以部署到Netlify, Vercel, Cloudflate, Azure 等静态站点托管服务端。具体参考vite 官网介绍 [部署静态网站](https://cn.vitejs.dev/guide/static-deploy.html) 。这里仅说明笔者部署到自有Ecs服务器的Nginx 服务的注意要点！

    由于构建了vue应用，需要设置404页面指向 index.html
