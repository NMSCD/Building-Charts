<script setup lang="ts">
import type { Base } from '@/types/Base';
import { computed } from 'vue';

const props = defineProps<{
  base: Base;
}>();

const uploadLimit = 3000;

const isNotUploadable = computed(() => props.base.Objects.length >= uploadLimit);
</script>

<template>
  <div class="card p-4">
    <div>Name: {{ base.Name }}</div>
    <div>
      Parts:
      <span
        :class="{ 'has-text-danger': isNotUploadable }"
        :title="isNotUploadable ? 'Cannot be uploaded' : undefined"
        >{{ base.Objects.length }}</span
      >
    </div>
  </div>
</template>
