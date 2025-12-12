import { ref, computed } from 'vue'

export function useGroupData() {
  const projectInfo = ref(null);
  const membersData = ref(null);
  const teamsData = ref(null);

  const fetchData = async (dataPath) => {
    try {
      const baseUrl = import.meta.env.BASE_URL

      let res = await fetch(`${baseUrl}data/${dataPath}/project-info.json`)
      if (!res.ok) {
        throw new Error('プロジェクト情報の読み込みに失敗しました。')
      }
      projectInfo.value = await res.json();

      res = await fetch(`${baseUrl}data/${dataPath}/members.json`)
      if (!res.ok) {
        throw new Error('メンバー情報の読み込みに失敗しました。')
      }
      membersData.value = await res.json();

      res = await fetch(`${baseUrl}data/${dataPath}/teams.json`)
      if (!res.ok) {
        throw new Error('チーム情報の読み込みに失敗しました。')
      }
      teamsData.value = await res.json();
    } catch (e) {
      console.error('データの読み込みに失敗しました: ', e)
    }
  }
  const groups = computed(() => {
    if (!(membersData.value && teamsData.value)) {
      return []
    }
    return teamsData.value.map((team) => {
      const members = membersData.value.filter((m) => m.team_id === team.id)
      return {
        id: team.id,
        name: team.name,
        members: members
      }
    })
  })
  return {
    projectInfo,
    groups,
    fetchData,
  }

}