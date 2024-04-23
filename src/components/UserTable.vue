<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '../stores/userStore';
import { useRouter } from "vue-router";

const errorMessage = ref('');
const userStore = useUserStore();

const router = useRouter();

function generateData() {
  try {
    userStore.generateUsers();
  } catch (error: unknown) {
    if (error instanceof Error) {
      errorMessage.value = error.message;
    } else {
      errorMessage.value = 'Kunde inte generera användare';
    }
  }
}

function navigateToAddUser() {
  router.push('/add');
}

function navigateToEditUser(userId: string) {
  router.push(`/edit/${userId}`);
}

</script>

<template>
  <div>
    <h1>Användare</h1>
    <table>
      <thead>
        <tr>
          <th>
            ID
          </th>
          <th>
            Namn
          </th>
          <th>
            Email
          </th>
          <th>

          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in userStore.users" :key="user.id">
          <td>
            {{ user.id }}
          </td>
          <td>
            {{ user.name }}
          </td>
          <td>
            {{ user.email }}
          </td>
          <td>
            <button @click="navigateToEditUser(user.id)">Ändra</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      <button @click="generateData">Generera Användare</button>
      <button @click="navigateToAddUser">Skapa Användare</button>
    </div>
    <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
  </div>
</template>
