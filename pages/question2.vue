<template>
  <div class="flex justify-center h-screen">
    <div class="p-4">
      <h1 class="text-2xl font-bold">Name - Team</h1>
      <ul class="mt-4">
        <li v-for="user in users" :key="user.id" @click="fetchUserActivities(user.id)" class="cursor-pointer">
          <span class="font-bold">{{ user.name }}</span> - {{ user.team }}
        </li>
      </ul>
      <div v-if="selectedUser" class="mt-4">
        <h2 class="text-lg font-bold">{{ selectedUser.name }}'s Activities</h2>
        <ul>
          <li v-for="activity in activities" :key="activity.id">
            {{ activity.workout }} - Minutes: {{ activity.minutes }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

interface User {
  id: number;
  name: string;
  team: string;
}

interface Activity {
  id: number;
  workout: string;
  minutes: number;
}

export default {
  setup() {
    const users = ref<User[]>([]);
    const selectedUser = ref<User | null>(null);
    const activities = ref<Activity[]>([]);

    const fetchUsers = async () => {
      try {
        const response = await $fetch<{ users: User[] }>("/api/users");
        users.value = response.users;
      } catch (error) {
        console.error(error);
      }
    };

    const fetchUserActivities = async (userId: number) => {
      try {
        const response = await $fetch<{ activity: Activity[] }>(`/api/activity/${userId}`);
        selectedUser.value = users.value.find((user) => user.id === userId) || null;
        activities.value = response.activity;
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();

    return {
      users,
      selectedUser,
      activities,
      fetchUserActivities,
    };
  },
};
</script>

<style scoped>
</style>
