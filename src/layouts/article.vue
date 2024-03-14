
<script setup>
import { useRouter } from 'vue-router'
const ioc = ref()
const showPageIoc = (() => {
   ioc.value.enterPageNav()
})
const unshowPageIoc = (() => {
    ioc.value.leavePageNav()
})

const articleContent = ref()

</script>
<template>
    <Header />
    <!-- article content -->
    <div  class="container d-flex justify-content-start">
        <div class="col-md-3 col-sm-0" @mouseenter="showPageIoc" @mouseleave="unshowPageIoc">
            <div class="ms-3-md">
                <TableOfContents ref="ioc"/>
            </div>            
        </div>

        <div ref="articleContent" class="d-flex flex-column justify-content-start col-md-8 col-sm-12 col-12 animate__animated animate__fadeIn animate__slow">
            <div style="height: 10vh;"></div>
            <RouterView />
        </div>
    </div>
    <div class="" style="height: 50vh;"></div>
    <BackToTop />
    <Footer />
</template>