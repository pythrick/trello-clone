<template>
  <div class="home">
    <v-row>
      <v-col
        cols="12"
        xl="2"
        lg="3"
        md="4"
        sm="2"
        xs="1"
        v-for="board of boards"
        :key="board.id"
      >
        <v-card elevation="2" class="card">
          <v-card-title>{{ board.name }}</v-card-title>
          <v-card-text>{{ board.description }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-btn elevation="2" large fab fixed color="pink" dark bottom right>
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data: () => ({
    boards: [
      {
        id: 1,
        name: "Trello Clone",
        description: "Um clone do Trello, só que muito melhor.",
        progress: 23.5,
      },
      {
        id: 2,
        name: "Lorem ipsum dolor sit amet,",
        description:
          "uspendisse at nisi at diam viverra maximus quis in est. Sed at vulputate mauris.",
        progress: 15,
      },
      {
        id: 3,
        name: " bibendum consectetur arcu",
        description:
          "Nulla facilisi. Curabitur pellentesque eu sapien sit amet dictum.",
        progress: 55,
      },
      {
        id: 4,
        name: "Suspendisse at nisi at diam",
        description: "Nunc accumsan neque tincidunt rutrum consectetur.",
        progress: 0,
      },
      {
        id: 5,
        name: "Suspendisse facilisis mauris metus",
        description: " Quisque finibus sit amet lorem a gravida",
        progress: 73,
      },
      {
        id: 6,
        name: "Curabitur rhoncus id",
        description: "Sed vitae nisl placerat, varius sapien ut, sagittis erat",
        progress: 28,
      },
      {
        id: 7,
        name: "Ut vestibulum velit nec",
        description:
          "Duis pellentesque quam lacus, a viverra magna ornare sit amet.",
        progress: 48,
      },
      {
        id: 8,
        name: "Aenean nec lacus",
        description: "In quis eros malesuada, rutrum magna id, feugiat nisl",
        progress: 36,
      },
    ],
  }),
};
</script>

<style scoped>
.card {
  min-height: 150px;
}
</style>
