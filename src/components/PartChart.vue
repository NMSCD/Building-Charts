<script setup lang="ts">
import type { Base } from '@/types/Base';
import { computed, reactive } from 'vue';
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { minColourValue, maxColourValue } from '@/constants/colours';
import { maxObjects } from '@/constants/base';

ChartJS.register(ArcElement, Tooltip, Legend);

const props = defineProps<{
  bases: Base[];
  totalParts: number;
}>();

// min and max are both included
function getRndInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColour() {
  const rgb = Array.from({ length: 3 }).map(() => getRndInteger(minColourValue, maxColourValue));
  const hexCode = rgb.map((colour) => colour.toString(16)).join('');
  return `#${hexCode}`;
}

const labels = computed(() => props.bases.map((base) => base.Name));
const objectCounts = computed(() => props.bases.map((base) => base.Objects.length));
const colours = computed(() => props.bases.map(getRandomColour));

const baseObjectsLeft = computed(() => maxObjects - props.totalParts);
const objectCountsWithBuffer = computed(() => [...objectCounts.value, baseObjectsLeft.value]);
const labelsWithBuffer = computed(() => [...labels.value, 'Unused']);
const coloursWithBuffer = computed(() => [...colours.value, '#333333']);

const baseData = reactive({
  labels,
  objectCounts,
  colours,
  labelsWithBuffer,
  objectCountsWithBuffer,
  coloursWithBuffer,
});

const data = computed(() => ({
  labels: baseData.labelsWithBuffer,
  datasets: [
    {
      backgroundColor: baseData.colours,
      data: baseData.objectCounts,
    },
    {
      backgroundColor: baseData.coloursWithBuffer,
      data: baseData.objectCountsWithBuffer,
    },
  ],
}));

const options = {
  maintainAspectRatio: true,
};
</script>

<template>
  <Pie
    :data
    :options
    class="chart mx-auto"
  />
</template>

<style scoped lang="css">
.chart {
  width: min(100%, 800px);
}
</style>
