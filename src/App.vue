<script setup>
import { computed } from 'vue'
import projectInfo from './assets/data/project-info.json'
import membersData from './assets/data/members.json'
import teamsData from './assets/data/teams.json'

const groups = computed(() => {
  return teamsData.map((team) => {
    const members = membersData.filter((m) => m.team_id === team.id)

    return {
      id: team.id,
      name: team.name,
      members: members
    }
  })
})
const period = computed(() => {
  const start = new Date(projectInfo.period.start)
  const end = new Date(projectInfo.period.end)

  const formatDate = (d) => d.toLocaleString('ja-JP', {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })

  return [formatDate(start), formatDate(end)]
})
</script>

<template>
  <div class="container">
    <header class="page-header">
      <h1>{{ projectInfo.title }}</h1>
      <div class="header-info">
        <p class="phase">{{ projectInfo.phase }}</p>
        <p class="period">
          <time :datetime="projectInfo.period.start">{{ period[0] }}</time>
          -
          <time :datetime="projectInfo.period.end">{{ period[1] }}</time>
        </p>
      </div>
    </header>

    <div class="groups-grid">
      <div v-for="group in groups" :key="group.id" class="group-card">
        <div class="card-header">
          <h2>{{ group.name }}</h2>
          <span class="member-count">{{ group.members.length }}名</span>
        </div>
        <ul class="member-list">
          <li v-for="member in group.members" :key="member.no" class="member-item">
            <span class="member-no">No.{{ member.no }}</span>
            <span class="member-name">{{ member.name }}</span>
            <span v-if="member.role" class="member-role" :class="{
              'role-leader': member.role === 'リーダー',
              'role-sub': member.role === 'サブリーダー'
            }">{{ member.role
              }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.groups-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--s-lg);
}

.group-card {
  background-color: var(--color-card-bg);
  border-radius: 12px;
  padding: var(--s-md);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--s-md);
  padding-bottom: var(--s-sm);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.card-header h2 {
  margin: 0;
  color: var(--color-primary);
  font-size: 1.25rem;
}

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

.member-count {
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

.member-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.member-item {
  display: flex;
  align-items: center;
  padding: var(--s-sm);
  border-radius: 6px;
  transition: background-color 0.2s;
}

.member-item:hover {
  background-color: rgba(255, 255, 255, 0.03);
}

.member-no {
  width: 3rem;
  color: var(--color-text-muted);
  font-size: 0.9rem;
  font-family: monospace;
}

.member-name {
  flex-grow: 1;
  font-weight: 500;
}

.member-role {
  font-size: 0.75rem;
  padding: 2px 8px;
  /* background-color: rgba(34, 211, 238, 0.1); */
  /* color: var(--color-accent); */
  border-radius: 999px;
  /* border: 1px solid rgba(34, 211, 238, 0.2); */
}

/* リーダー用: ゴールドっぽい色 */
.role-leader {
  background-color: rgba(251, 191, 36, 0.1);
  color: #fbbf24;
  border-color: rgba(251, 191, 36, 0.2);
}

/* サブリーダー用: 紫っぽい色（例） */
.role-sub {
  background-color: rgba(167, 139, 250, 0.1);
  color: #a78bfa;
  border-color: rgba(167, 139, 250, 0.2);
}
</style>