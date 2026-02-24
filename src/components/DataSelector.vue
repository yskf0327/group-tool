<script setup>
// App.jsから受け取る値
defineProps(['modelValue'])
// App.vueに選択項目の変化を通知するイベント
defineEmits(['update:modelValue'])
</script>
<template>
  <div class="data-selector">
    <select name="data-selector" id="data-selector" :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)">
      <option value="202602_6c_gyoza">6C 福岡餃子FES 機能実装フェーズ</option>
    </select>
  </div>

</template>
<style scoped>
.data-selector {
  text-align: right;
  padding: 1rem;
}

select {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background: #fff;
  color: #333;
}
</style>