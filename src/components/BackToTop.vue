<script setup>
// import { ref, onMounted } from 'vue'
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
/* scroll to top */
.bbtt {
    position: fixed;
    bottom: 40px;
    right: 30px;
}
</style>
