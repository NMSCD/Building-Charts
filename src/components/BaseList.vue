<script setup lang="ts">
import type { Base } from '@/types/Base';
import BaseItem from './BaseItem.vue';

defineProps<{
  bases: Base[];
}>();
</script>

<template>
  <div class="base-list is-flex is-flex-wrap-wrap my-3">
    <BaseItem
      v-for="base in bases"
      :base
    />
  </div>
</template>

<style scoped lang="css">
.base-list {
  gap: 0.5rem;
}
</style>
