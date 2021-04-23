<template>
  <div>
    <h1 class="mb-3">{{ listName }}</h1>
    <v-row>
      <v-col v-for="item of tasksList" :key="item.id">
        <v-card
          elevation="2"
          class="card"
          @click="$emit('click:card', Object.assign({}, item))"
        >
          <v-card-title>{{ item.name }}</v-card-title>
          <v-card-text>{{ item.description }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "TasksTasks",
  props: ["tasksList", "listName"],
};
</script>

<style></style>
