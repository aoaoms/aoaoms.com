<script setup>
const props = defineProps(['path', 'list'])

// process date format from md's frontmatter date attr i.e. 2024-02-22
const fmDate = (date) => {
    if (date && typeof(date) === 'string'){
        let time = new Date(new Date(date).getTime())

        return Date.parse(time.toUTCString()).toString("MMMM dS")
    } else {
        return Date.parse(new Date().toString("M/d/yyyy")).toString("MMMM dS") 
    }
        
}
</script>

<template>
    <ul class="nav flex-column animate__animated animate__fadeIn animate__slow position-relative">
        <div class="position-absolute year">
            2024
        </div>
        <div class="py-4"></div>
        <li class="nav-item p-1" v-for="item in props.list" :key="item">
            <div class=" position-relative d-flex">
                <a class="nav-link text-decoration-none py-2 fs-6" :href="item.path" target="_blank">
                    {{ item.meta.frontmatter.title }}
                    <span v-if="item.meta.frontmatter.top" class="badge bg-info d-inline ms-2">置顶</span>
                </a>
                <span v-if="item.meta !== null " class="py-2 ms-1 small">{{ fmDate(item.meta.frontmatter.date)  }} </span>
            </div>
        </li>
    </ul>
    <p style="height: 60vh;"></p>
</template>

<style>
.year {
    font-size: 8em;
    font-weight: 700;
    margin-top: -30px;
    margin-left: -60px;
    color:var(--bs-body-bg);
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: rgba(170, 170, 170, 0.132);
}
.date {
    color: rgb(5, 0, 0);
}
</style>