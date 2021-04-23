<template>
  <div>
    <v-row class="d-none d-sm-flex d-md-flex">
      <v-col cols="12" sm="4">
        <v-sheet rounded="lg" min-height="70vh">
          <div class="container">
            <tasks-cards
              :tasks-list="todoList"
              list-name="TO DO"
              @click:card="editTask"
            />
          </div>
        </v-sheet>
      </v-col>

      <v-col cols="12" sm="4">
        <v-sheet min-height="70vh" rounded="lg">
          <div class="container">
            <tasks-cards
              :tasks-list="doingList"
              list-name="Doing"
              @click:card="editTask"
            />
          </div>
        </v-sheet>
      </v-col>

      <v-col cols="12" sm="4">
        <v-sheet rounded="lg" min-height="70vh">
          <div class="container">
            <tasks-cards
              :tasks-list="doneList"
              list-name="Done"
              @click:card="editTask"
            />
          </div>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row class="d-sm-none">
      <v-container v-if="value === `TODO`">
        <v-sheet rounded="lg" min-height="70vh" class="pa-4">
          <tasks-cards
            :tasks-list="todoList"
            list-name="TO DO"
            @click:card="editTask"
          />
        </v-sheet>
      </v-container>

      <v-container v-if="value === `DOING`">
        <v-sheet rounded="lg" min-height="70vh" class="pa-4">
          <tasks-cards :tasks-list="doingList" list-name="DOING" />
        </v-sheet>
      </v-container>

      <v-container v-if="value === `DONE`">
        <v-sheet rounded="lg" min-height="70vh" class="pa-4">
          <tasks-cards :tasks-list="doneList" list-name="DONE" />
        </v-sheet>
      </v-container>
    </v-row>

    <v-row class="d-sm-none">
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
    </v-row>
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
