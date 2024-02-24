<script setup lang="ts">
import { computed, ref } from 'vue';
import BaseList from './components/BaseList.vue';
import type { Base } from '@/types/Base';
import PartChart from './components/PartChart.vue';
import { maxObjects } from './constants/base';

const isJsonInvalid = ref(false);
const baseJson = ref<Base[]>([]);

const totalBases = computed(() => baseJson.value.length);

const totalPartsUsed = computed(() => {
  const objectCounts = baseJson.value.map((base) => base.Objects.length);
  return objectCounts.reduce((prev, cur) => prev + cur, 0);
});

const totalPartsUnused = computed(() => maxObjects - totalPartsUsed.value);

function parseOnInput(e: Event) {
  if (!(e.target instanceof HTMLTextAreaElement)) return;
  parseJson(e.target.value);
}

function parseJson(rawJson: string) {
  try {
    const parsedJson: Base[] = JSON.parse(rawJson);
    isJsonInvalid.value = false;
    const playerBases = parsedJson.filter((item) =>
      ['HomePlanetBase', 'FreighterBase'].includes(item.BaseType.PersistentBaseTypes)
    );
    const freighter = playerBases.find((item) => item.BaseType.PersistentBaseTypes === 'FreighterBase');
    if (freighter) freighter.Name = 'Freighter';
    const sortedJson = playerBases.toSorted((a, b) => b.Objects.length - a.Objects.length);
    baseJson.value = sortedJson;
  } catch (error) {
    isJsonInvalid.value = true;
    console.warn(error);
  }
}
</script>

<template>
  <nav class="my-4 is-size-5">
    <a
      href=".."
      title="Other pages"
      >&larr; View other pages</a
    >
  </nav>
  <h1 class="title is-3 has-text-centered">Building Charts</h1>
  <div class="is-flex is-flex-direction-column">
    <label
      class="label"
      for="json-input"
      >Enter your PersistentPlayerBases JSON section here:</label
    >
    <textarea
      class="textarea"
      id="json-input"
      @input="parseOnInput"
    ></textarea>
  </div>
  <p v-if="isJsonInvalid">
    Something went wrong. Please make sure you copied the whole PersistentPlayerBases JSON section.
  </p>
  <div
    v-if="baseJson.length"
    class="my-4"
  >
  <div class="stats is-flex is-flex-wrap-wrap">
    <p>Total Number of Bases: {{ totalBases }}</p>
    <p>Total Parts Used: {{ totalPartsUsed }}</p>
    <p>Unused Parts: {{ totalPartsUnused }}</p>
  </div>
    <BaseList :bases="baseJson" />
    <PartChart
      :bases="baseJson"
      :total-parts="totalPartsUsed"
    />
  </div>
</template>

<style scoped lang="scss">
.stats {
  gap: 0 2rem;
}
</style>
