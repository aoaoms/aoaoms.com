<script setup>

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
</script>

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
              <a class="nav-link" aria-current="page" href="/project" target="_blank">项目</a>
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
        <a class="icon-link d-md-none" href="/blog">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            class="bi bi-file-earmark-text" viewBox="0 0 16 16">
            <path
              d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5" />
            <path
              d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1z" />
          </svg>
        </a>
        <!-- project -->
        <a class="icon-link d-md-none" href="/project">
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
        <a v-if="themeIcon == 'light'" class="icon-link" @click="switchColorMod">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-brightness-high"
            viewBox="0 0 16 16">
            <path
              d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708" />
          </svg>
        </a>
        <a v-if="themeIcon == 'dark'" class="icon-link" @click="switchColorMod">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-fill"
            viewBox="0 0 16 16">
            <path
              d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278" />
          </svg>
        </a>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>
