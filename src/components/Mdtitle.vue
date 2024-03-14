<script setup>
const props = defineProps(['title', 'update'])
</script>

<template>
    <div class="my-5">
        <p class="h1 fw-bolder" v-if="props.title">{{ props.title }}</p>
        <p class="small" v-if="props.update">Update: {{ Date.parse($fromatDateFromMdMatter(props.update)).toString("MMMM dS, yyyy") }}</p>
    </div>
</template>

<style scoped></style>
