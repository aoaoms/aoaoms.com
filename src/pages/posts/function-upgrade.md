---
title: 功能更新
date: '2024-02-22'
update: '2024-02-23'
---

<route lang="yaml">
meta:
  layout: article
</route>

<Mdtitle :title="frontmatter.title" :update="frontmatter.update" />

### 明亮暗黑模式切换
<FunctionUpdate :date="'2024-02-23'" />

#### 效果

点击页头的图标切换明亮与暗黑模式

#### ideas

&emsp;&emsp;首先，项目使用了bootstrap5.3 也是我坚持使用的；而，markdown-it插件我引入了github markdown css 样式类，因此需要解决bs与gh css之于暗黑模式切换时的冲突问题。考虑，用到的md语法不多，就索性全部使用BS的样式主题。并且，gh的暗黑也太黑了😄 ~ 不舒服！

&emsp;&emsp;经过少许样式调整，整体效果已出；可在本站操作试一试呢~ 

&emsp;&emsp;下面，开始介绍一下自己的处理。

1. 在html头文件已引入bootstrap5和github markdown css 的CDN资源：
   
```html
<!-- use bootstrap -->
<link href="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/5.3.1/css/bootstrap.min.css" rel="stylesheet">
<!-- github markdown css -->
<link href="https://cdn.bootcdn.net/ajax/libs/github-markdown-css/5.2.0/github-markdown.min.css" rel="stylesheet">
```
1. 处理bs的颜色切换
   
   html头部加入bs的颜色属性：

```html
<html lang="en" data-bs-theme="light">
```
   main.js内初始化localsorage，给一个item, 设置一个存取key 用于处理颜色切换

```js
// bootstrap color mod
const theme = localStorage.getItem('theme')
if (theme){
    document.documentElement.setAttribute('data-bs-theme', theme)
} else {
    localStorage.setItem('theme', 'light')
    document.documentElement.setAttribute('data-bs-theme', 'light')
}
```
1. 在Header组件内的切换按钮内添加处理逻辑，需要做3件事情： a，读取当前ls的color theme value  b, 判断并更改当前bs html头部的颜色主题值并切换按钮图标   c, 更新的值存储到ls
   
```js
const themeIcon = ref('')

onMounted(() => {
  themeIcon.value = localStorage.getItem('theme')
})

const switchColorMod = () => {
  const storedTheme = localStorage.getItem('theme')

  if (storedTheme === 'light') {
    document.documentElement.setAttribute('data-bs-theme', 'dark')
    themeIcon.value = 'dark'
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.setAttribute('data-bs-theme', 'light')
    themeIcon.value = 'light'
    localStorage.setItem('theme', 'light')
  }
}
```

2. 解决bs与gh md css 的样式冲突 
   markdown-it使用的是markdown-body类名包裹，需要覆盖此类里面的部分css变量达到与bs的样式一致
```css
/* 这里更改markdown 文档配色与 bs 一致 */
.markdown-body {
  /* 跟随bs */
  --color-accent-fg: var(--bs-body-color);
  /* 跟随bs */
  --color-fg-default: var(--bs-body-color);
  /* 影响表格背景色 这里继承自文档 跟随bs */
  --color-canvas-default: inherit;
  /* 影响表格颜色subtle色 */
  --color-canvas-subtle: var(--bs-light-bg-subtle);
}

/* md 内图片使用了bs img-thumbnail 样式类, 当设置了dark color方才设置图片背景白色 */
@supports selector([data-bs-theme = "dark"]) {
  .img-thumbnail {
    background-color: #ffffff !important;
  }
}
```

上面的css代码我直接写在了index.html里面。代码仅处理了本站点目前使用的md标记元素的样式，如果使用了更多的标记，需要查看样式再具体更改相关的代码。另外，需要注意的是代码最后面部分中我对于图片样式的处理；这里，由于我md里面的图片直接使用了bs的图片样式类，并且我的图片用来Png背景透明，如果在明亮模式还好；暗黑模式的话，图片根本看不清楚！因此，这里我考虑使用了css规则约束当暗黑模式时，设置图片背景为白色~ 这样的话，看起来效果就还可以哦~ 




### 响应式布局样式修复
<FunctionUpdate :date="'2024-02-23'" />

MD文章布局响应式（修复移动端显示问题）

```html
<!-- article content -->
<div class="container d-flex justify-content-start">
    <div class="col-md-3 col-sm-0" @mouseenter="showPageIoc" @mouseleave="unshowPageIoc">
        <div class="ms-3-md">
            <TableOfContents :toc="useRouter().currentRoute.value.meta.toc" ref="ioc" />
        </div>            
    </div>

    <div class="d-flex flex-column justify-content-start col-md-8 col-sm-12 col-12 animate__animated animate__fadeIn animate__slow">
        <div style="height: 10vh;"></div>
        <RouterView />
    </div>

    <!-- <div class="col-md-1 col-sm-0"></div> -->
</div>
```

### 文章标题包含空格的锚点导航
<FunctionUpdate :date="'2024-02-22'" />

#### 安装扩展

 [扩展插件功能原文](https://mdit-plugins.github.io/attrs.html)

安装markdown-it扩展: @mdit/plugin-attrs
```js
npm i -D @mdit/plugin-attrs
```
vite.config.js 导入
```js
import { attrs } from "@mdit/plugin-attrs"
```

配置markdown-it插件:

md.use(attrs)

#### 文章标题使用属性ID
 
书写包含空格的head 后面定义真实的锚点ID名

```html
#### Router process flow {#Router-process-flow}
```

### 其他问题

由于自制了TOC，想要toc内包含空格的title, 需要在点击目录时额外处理一下路由，将路中hash 后的空格替换为中横线。

以下代码，是本站toc导航的href处理；将anchor（含有空格的）空格替换为‘-’ 中横线
```html
<li class="nav-item" v-for="item in props.toc" :key="item">
    <a v-if="item.parentId == 0" class="nav-link active py-1 ps-0" aria-current="page" 
      :href="'#' + item.anchor.replaceAll(' ','-')">
      {{ item.anchor }}
    </a>
    <a v-else class="nav-link active py-1 ps-0 ms-4" aria-current="page" :href="'#' + item.anchor.replaceAll(' ','-')">
      {{ item.anchor }}
    </a>
</li>
```
