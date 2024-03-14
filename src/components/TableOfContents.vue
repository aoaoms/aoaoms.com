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

<style scoped>

</style>