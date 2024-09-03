<template>
  <div class="h-screen w-full grid place-items-center backdrop-blur-xl">
    <div
      class="w-2/4 h-2/4 bg-foreground rounded-xl border-2 border-border shadow-primary shadow-lg"
    >
      <div class="flex-center h-full flex-col gap-8">
        <p class="text-3xl text-highlight-text">Noch in der Arbeit!</p>
        <Icon
          name="fluent-mdl2:construction-cone"
          class="text-highlight-text"
          size="5rem"
        />
        <Button size="Large" @click="() => navigateTo('/fixedcosts')"
          >Zur Hompage</Button
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
