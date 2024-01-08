<template>
    <div class="fixed bottom-0 right-0 w-12 h-12 m-4 flex-center rounded-full bg-primary ring-slate-300 ring-4 hover:ring-offset-4 duration-300 hover:bg-slate-600 cursor-pointer">
        <Icon name="ep:caret-top" size="2rem" @click="scrollToTop" color="white" class="flex-1"/>
    </div>
</template>

<script setup lang="ts">

const scrollToTop = () => {
    const navBarElement = document.getElementById("navbar");
    navBarElement.scrollIntoView(true);
}

</script>

<style scoped>

</style>