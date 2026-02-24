<script setup>
const props = defineProps({
  groups: Array
})

const getSortedMembers = (members) => {
  if (!members) return [];
  return [...members].sort((a, b) => {
    const roleRank = {
      'リーダー': 1,
      'サブリーダー': 2
    };
    const rankA = roleRank[a.role] || 99;
    const rankB = roleRank[b.role] || 99;

    if (rankA !== rankB) {
      return rankA - rankB;
    }
    return a.no - b.no;
  });
};
</script>
<template>
  <div class="groups-grid">
    <div v-for="group in groups" :key="group.id" class="group-card">
      <div class="card-header">
        <h2>{{ group.name }}</h2>
        <span class="member-count">{{ group.members.length }}名</span>
      </div>
      <ul class="member-list">
        <li v-for="member in getSortedMembers(group.members)" :key="member.no" class="member-item">
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
</template>
<style setup>
.groups-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--s-md);
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
