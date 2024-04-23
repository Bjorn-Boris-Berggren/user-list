<script setup lang="ts">
import { reactive, computed, watch, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '../stores/userStore';
import { v4 as uuidv4 } from 'uuid';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const userId = route.params.id;
const errorMessage = ref('');

const formData = reactive({
  id: '',
  name: '',
  email: ''
});

const isEditMode = computed(() => !!userId);

function navigateHome() {
  router.push('/');
}

watch(() => userId, (newId) => {
  if (newId && userStore.users.length) {
    const userToEdit = userStore.users.find(user => user.id === newId);
    if (userToEdit) {
      formData.id = userToEdit.id;
      formData.name = userToEdit.name;
      formData.email = userToEdit.email;
    } else {
      errorMessage.value = 'Användaren hittades inte';
    }
  } else {
    formData.id = '';
    formData.name = '';
    formData.email = '';
  }
}, { immediate: true });

function handleSubmit() {
  try {
    if (isEditMode.value) {
      userStore.editUser(formData.id, { name: formData.name, email: formData.email });
    } else {
      formData.id = uuidv4();
      userStore.addUser({ ...formData });
      formData.name = '';
      formData.email = '';
    }
    router.push('/');
  } catch (error: unknown) {
    if (error instanceof Error) {
      errorMessage.value = error.message;
    } else {
      errorMessage.value = 'Användaren har inte sparats något gick fel';
    }
  }
}
</script>

<template>
  <div class="form-container">
    <h1>{{ isEditMode ? 'Redigera Användare' : 'Skapa Användare' }}</h1>
    <form @submit.prevent="handleSubmit">
      <label for="name">Namn</label>
      <input id="name" v-model="formData.name" class="input-box" type="text" required>

      <label for="email">Email</label>
      <input id="email" v-model="formData.email" class="input-box" type="email" required>

      <button type="button" @click="navigateHome">Tillbaka</button>
      <button type="submit">{{ isEditMode ? 'Spara' : 'Skapa' }}</button>
    </form>
    <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
  </div>
</template>

<style scoped></style>