<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import ProjectHeader from './components/ProjectHeader.vue'
import GroupList from './components/GroupList.vue'
import { useGroupData } from './composables/useGroupData';

const route = useRoute()
const router = useRouter()
const { projectInfo, groups, fetchData } = useGroupData()

const currentKey = ref(route.params.id || '202511_6c_gyoza')

const loadData = async (key) => {
  if (!key) { key = '202511_6c_gyoza' }
  await fetchData(key)
}

onMounted(async () => {
  await fetchData(currentKey.value);
})


watch(
  // 第一引数: 監視対象。オブジェクトのプロパティを監視する場合はアロー関数でラップする。
  () => route.params.id,
  // 第二引数: 監視対象が変化した時に実行するコールバック関数
  (newId) => {
    // 念の為代入
    currentKey.value = newId || '202511_6c_gyoza'
    loadData(newId)
  }
)

// selectがchangeした時に実行される関数。新しいURLを作る。
const updateLocation = () => {
  router.push('/' + currentKey.value)
}
</script>

<template>
  <div class="data-selector">
    <select name="data-selector" id="data-selector" v-model="currentKey" @change="updateLocation">
      <option value="202511_6c_gyoza">6C 福岡餃子FES デザインフェーズ</option>
      <option value="dummy_class_b">テスト用ダミー</option>
    </select>
  </div>
  <div v-if="projectInfo" class="container">
    <ProjectHeader :info="projectInfo" />
    <main>
      <GroupList :groups="groups" />
    </main>
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