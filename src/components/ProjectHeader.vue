<script setup>
import { computed } from 'vue';
const props = defineProps({
  info: Object
})
const period = computed(() => {
  if (!props.info) {
    return [];
  }

  const start = new Date(props.info.period.start)
  const end = new Date(props.info.period.end)

  const formatDate = (d) => d.toLocaleString('ja-JP', {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })

  return [formatDate(start), formatDate(end)]

})
</script>

<template>
  <header class="page-header">
    <h1>{{ info.title }}</h1>
    <div class="header-info">
      <p class="phase">{{ info.phase }}</p>
      <p class="period">
        <time :datetime="info.period.start">{{ period[0] }}</time>
        -
        <time :datetime="info.period.end">{{ period[1] }}</time>
      </p>
    </div>
  </header>

</template>

<style scoped>
.header-info {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--s-md);
  margin-top: var(--s-sm);
  flex-wrap: wrap;
}

.phase {
  background-color: rgba(34, 211, 238, 0.1);
  color: var(--color-accent);
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 600;
  border: 1px solid rgba(34, 211, 238, 0.2);
  margin: 0;
}

.period {
  color: var(--color-text-muted);
  font-size: 0.875rem;
  margin: 0;
  font-family: monospace;
}
</style>
