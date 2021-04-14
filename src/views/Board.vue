<template>
  <div>
    <div v-if="value === `todo`">
      <tasks-cards :tasks-list="todoList" list-name="TO DO" />
    </div>
    <div v-if="value === `doing`">
      <tasks-cards :tasks-list="doingList" list-name="DOING" />
    </div>
    <div v-if="value === `done`">
      <tasks-cards :tasks-list="doneList" list-name="DONE" />
    </div>
    <v-bottom-navigation v-model="value" fixed>
      <v-btn value="todo">
        <span>To do</span>
        <v-icon>mdi-playlist-plus</v-icon>
      </v-btn>

      <v-btn value="doing">
        <span>Doing</span>
        <v-icon>mdi-list-status</v-icon>
      </v-btn>

      <v-btn value="done">
        <span>Done</span>
        <v-icon>mdi-playlist-check</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
export default {
  name: "Board",
  components: {
    "tasks-cards": require("@/components/TasksCards.vue").default,
  },
  data: () => ({
    value: "todo",
    todoList: [],
    doingList: [],
    doneList: [],
  }),
  methods: {
    async getTasksList() {
      const response = await this.$http.get(
        `/cards?board_id=${this.$route.params.id}`
      );
      return response.data;
    },
  },
  async mounted() {
    const tasks = await this.getTasksList();
    this.todoList = tasks.filter((task) => task.status === "TODO");
    this.doingList = tasks.filter((task) => task.status === "DOING");
    this.doneList = tasks.filter((task) => task.status === "DONE");
  },
};
</script>

<style></style>
