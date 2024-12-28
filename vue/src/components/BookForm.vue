<script setup lang="ts">
import { ref } from 'vue';
import { useBooksStore } from '@/stores/books';
const bookStore = useBooksStore()

let title = ref('')
let author = ref('')

</script>

<template>
  <input type="text" v-model="title" placeholder="Book Title" required>
  <input type="text" v-model="author" placeholder="Book Author" required>
  <button @click="bookStore.addBook(title, author)">Add Book</button>
</template>
