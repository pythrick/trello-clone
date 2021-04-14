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
          <v-card-actions v-on:click.prevent>
            <v-spacer></v-spacer>
            <v-btn icon @click="editBoard(board)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon><v-icon>mdi-delete</v-icon></v-btn>
          </v-card-actions>
          <v-progress-linear
            top
            absolute
            rounded
            :value="board.progress * 100"
            :color="getProgressColor(board)"
          ></v-progress-linear>
        </v-card>
      </v-col>
    </v-row>
    <board-form
      :dialog="formOpen"
      :board="currentBoard"
      @click:close="closeForm"
      @click:save="saveBoard"
    />
    <v-btn
      elevation="2"
      large
      fab
      fixed
      color="pink"
      dark
      bottom
      right
      @click="formOpen = true"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {
    "board-form": require("@/components/BoardForm.vue").default,
  },
  methods: {
    async editBoard(board) {
      this.formOpen = true;
      this.currentBoard = Object.assign({}, board);
    },
    async closeForm() {
      this.formOpen = false;
    },
    async saveBoard(board) {
      if (board.id) {
        await this.$http.patch(`/boards/${board.id}`, board);
        const boardIndex = this.boards.findIndex(
          (item) => item.id === board.id
        );
        const newBoardsList = [...this.boards];
        newBoardsList[boardIndex] = {
          ...newBoardsList[boardIndex],
          name: board.name,
          description: board.description,
        };
        this.boards = newBoardsList;
      } else {
        const response = await this.$http.post("/boards", board);
        this.boards.push(response.data);
      }
    },
    async getBoardsList() {
      const response = await this.$http.get("/boards");
      this.boards = response.data;
    },
    getProgressColor(board) {
      if (board.progress < 0.5) {
        return "primary";
      } else if (board.progress < 0.7) {
        return "yellow";
      } else {
        return "green";
      }
    },
  },
  async mounted() {
    await this.getBoardsList();
  },
  data: () => ({
    boards: [],
    formOpen: false,
    currentBoard: {
      id: null,
      name: "",
      description: "",
      progress: 0,
    },
  }),
};
</script>

<style scoped>
.card {
  min-height: 150px;
}
</style>
