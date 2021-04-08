<template>
  <div>
    <h1 class="mb-3">{{ listName }}</h1>
    <v-row>
      <v-col
        cols="12"
        xl="2"
        lg="3"
        md="4"
        sm="6"
        xs="1"
        v-for="item of tasksList"
        :key="item.id"
      >
        <v-card elevation="2" class="card">
          <v-card-title>{{ item.name }}</v-card-title>
          <v-card-text>{{ item.description }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "TasksCards",
  props: ["tasksList", "listName"],
};
</script>

<style></style>
