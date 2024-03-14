<script setup>
const props = defineProps(['date'])
</script>

<template>
    <p class="text-body-secondary" v-if="props.date">Add: {{ Date.parse(props.date).toString("MMMM dS, yyyy") }}</p>
</template>

<style scoped></style>