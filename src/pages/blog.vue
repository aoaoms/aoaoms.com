<script setup>

import { useRoute } from 'vue-router'
const activeTab = ref('posts')
const tabs = reactive(useRoute().meta.tabs)

</script>

<template>
    <!-- body content -->
    <div class="container d-flex justify-content-center">
        <div class="col-md-3 col-sm-0"></div>

        <div class="d-flex flex-column justify-content-start col-md-7 col-sm-12 ms-2">
            <!-- index post main titles -->
            <!-- tabs -->
            <ul class="nav nav-underline mt-5 flex-sm-colume fs-4">
                <li class="nav-item" @click="activeTab = 'posts'">
                    <a role="button" class="nav-link" :class="[activeTab === 'posts' ? 'active' : '']">Posts</a>
                </li>                
                <li class="nav-item" @click="activeTab = 'javascript'">
                    <a role="button" class="nav-link" :class="[activeTab === 'javascript' ? 'active' : '']" >Javascript</a>
                </li>
                <li class="nav-item" @click="activeTab = 'net'">
                    <a role="button" class="nav-link" :class="[activeTab === 'net' ? 'active' : '']" >.Net</a>
                </li>
                <li class="nav-item" @click="activeTab = 'ai'">
                    <a role="button" class="nav-link" :class="[activeTab === 'ai' ? 'active' : '']" >Ai ...</a>
                </li>
            </ul>
            <!-- placeholder vertical -->
            <div class="" style="height: 30px;"></div>
            <KeepAlive>
                <TabsList :list="tabs[activeTab]" :path="activeTab" :key="activeTab"/>
            </KeepAlive>
        </div>

        <div class="col-md-1 col-sm-0"></div>
    </div>
</template>
