<script setup>
import { computed, ref, onMounted } from 'vue'
import ProjectHeader from './components/ProjectHeader.vue'
import GroupList from './components/GroupList.vue'

const projectInfo = ref(null);
const membersData = ref(null);
const teamsData = ref(null);

onMounted(async () => {
  try {
    const baseUrl = import.meta.env.BASE_URL;

    let res = await fetch(`${baseUrl}data/202511_6c_gyoza/project-info.json`);
    if (!res.ok) throw new Error('Failed to fetch project-info: ' + res.statusText);
    projectInfo.value = await res.json();

    res = await fetch(`${baseUrl}data/202511_6c_gyoza/members.json`)
    if (!res.ok) throw new Error('Failed to fetch members: ' + res.statusText);
    membersData.value = await res.json()

    res = await fetch(`${baseUrl}data/202511_6c_gyoza/teams.json`)
    if (!res.ok) throw new Error('Failed to fetch teams: ' + res.statusText);
    teamsData.value = await res.json()
  } catch (e) {
    console.error('Error loading data:', e);
  }
})

const groups = computed(() => {
  if (membersData.value && teamsData.value) {

    return teamsData.value.map((team) => {
      const members = membersData.value.filter((m) => m.team_id === team.id)

      return {
        id: team.id,
        name: team.name,
        members: members
      }
    })
  } else {
    return [];
  }
})
</script>

<template>
  <div v-if="projectInfo" class="container">
    <ProjectHeader :info="projectInfo" />
    <GroupList :groups="groups" />
  </div>
</template>

<style scoped></style>