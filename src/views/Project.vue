<template>
  <div>
    <div v-if="value === `TODO`">
      <tasks-cards
        :tasks-list="todoList"
        list-name="TO DO"
        @click:card="editTask"
      />
    </div>
    <div v-if="value === `DOING`">
      <tasks-cards :tasks-list="doingList" list-name="DOING" />
    </div>
    <div v-if="value === `DONE`">
      <tasks-cards :tasks-list="doneList" list-name="DONE" />
    </div>
    <v-bottom-navigation v-model="value" fixed>
      <v-btn value="TODO">
        <span>To do</span>
        <v-icon>mdi-playlist-plus</v-icon>
      </v-btn>

      <v-btn value="DOING">
        <span>Doing</span>
        <v-icon>mdi-list-status</v-icon>
      </v-btn>

      <v-btn value="DONE">
        <span>Done</span>
        <v-icon>mdi-playlist-check</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <fabutton color="green" @click.native="formOpen = true" />
    <task-form
      :dialog="formOpen"
      :task="currentTask"
      @click:close="closeForm"
      @click:save="saveTask"
    />
  </div>
</template>

<script>
export default {
  name: "Project",
  components: {
    "tasks-cards": require("@/components/TasksCards.vue").default,
    fabutton: require("@/components/FAButton.vue").default,
    "task-form": require("@/components/TaskForm.vue").default,
  },
  data: () => ({
    formOpen: false,
    value: "TODO",
    todoList: [],
    doingList: [],
    doneList: [],
    currentTask: {
      id: null,
      name: "",
      description: "",
      status: "TODO",
      project_id: null,
    },
  }),
  computed: {},
  methods: {
    async editTask(task) {
      this.formOpen = true;
      this.currentTask = task;
    },
    async closeForm() {
      this.formOpen = false;
    },
    async saveTask(task) {
      if (task.id) {
        await this.$http.patch(`/tasks/${task.id}/`, task);

        this.todoList = this.todoList.filter((item) => item.id !== task.id);
        this.doingList = this.doingList.filter((item) => item.id !== task.id);
        this.doneList = this.doneList.filter((item) => item.id !== task.id);
        const targetList = {
          TODO: this.todoList,
          DOING: this.doingList,
          DONE: this.doneList,
        };
        targetList[task.status].unshift(task);
      } else {
        const response = await this.$http.post("/tasks/", task);
        const targetList = {
          TODO: this.todoList,
          DOING: this.doingList,
          DONE: this.doneList,
        };
        targetList[task.status].unshift(response.data);
      }
      this.value = task.status;
    },
    async getTasksList() {
      const response = await this.$http.get(
        `/tasks?project_id=${this.$route.params.id}`
      );
      return response.data;
    },
  },
  async mounted() {
    this.currentTask.project_id = this.$route.params.id;
    const tasks = await this.getTasksList();
    this.todoList = tasks.filter((task) => task.status === "TODO");
    this.doingList = tasks.filter((task) => task.status === "DOING");
    this.doneList = tasks.filter((task) => task.status === "DONE");
  },
};
</script>

<style></style>
