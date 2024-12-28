<script setup lang="ts">
import { ref } from 'vue';
import { useBooksStore } from '@/stores/books';

const props = defineProps(['id', 'title', 'author'])
const bookStore = useBooksStore()

let isEditing = ref(false)


let title = ref(props.title)
let author = ref(props.author)

function submit() {
  bookStore.editBook(props.id, title.value, author.value)
  isEditing.value = !isEditing.value
}

</script>

<template>
  <tr>
    <td>{{ id }}</td>
    <td>
      <span v-if="!isEditing">{{ props.title }}</span>
      <input v-if="isEditing" type="text" v-model="title" placeholder="new title">
    </td>
    <td>
      <span v-if="!isEditing">{{ props.author }}</span>
      <input v-if="isEditing" type="text" v-model="author" placeholder="new author">
    </td>
    <td>
      <button v-if="!isEditing" @click="isEditing = !isEditing">Edit</button>
      <button v-if="isEditing" @click="submit">Submit</button>
    </td>
    <td>
      <button @click="bookStore.deleteBook(props.id)">Delete</button>
    </td>
  </tr>
</template>
