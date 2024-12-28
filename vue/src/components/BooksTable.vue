<script setup lang="ts">
import { useBooksStore } from '@/stores/books';
import Book from './Book.vue';

const booksStore = useBooksStore()
booksStore.getBooks()

</script>

<template>
  <table>
    <tr>
      <th>id</th>
      <th>title</th>
      <th>author</th>
    </tr>

    <Book v-for="book in booksStore.books" :id="book.id" :title="book.title" :author="book.author" />
  </table>
</template>

<style>
table {
  width: 50%;
  border-collapse: collapse;
  margin: 1rem;
}

td {
  border-left: 1px solid black;
  margin: 0;
  padding-left: 1rem;
}

td:first-child {
  border-left: none;
}

th {
  border-bottom: 1px solid black;
}
</style>
