<template>
  <div class="home">
    <v-row>
      <v-col
        cols="12"
        xl="2"
        lg="3"
        md="4"
        sm="6"
        xs="1"
        v-for="board of boards"
        :key="board.id"
      >
        <v-card elevation="2" class="card" :to="`board/${board.id}`">
          <v-card-title>{{ board.name }}</v-card-title>
          <v-card-text>{{ board.description }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <board-form @click:save="addBoard" />
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {
    "board-form": require("@/components/BoardForm.vue").default,
  },
  methods: {
    async addBoard(board) {
      const response = await this.$http.post("/boards", board);
      this.boards.push(response.data);
    },
    async getBoardsList() {
      const response = await this.$http.get("/boards");
      this.boards = response.data;
    },
  },
  async mounted() {
    await this.getBoardsList();
  },
  data: () => ({
    boards: [],
  }),
};
</script>

<style scoped>
.card {
  min-height: 150px;
}
</style>
