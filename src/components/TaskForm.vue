<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">{{
            task.id ? "Edit task" : "Add new task"
          }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="task.name"
                  label="Name*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="task.description"
                  label="Description"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  v-model="task.status"
                  :items="statusOptions"
                  label="Status"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog()">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="saveProject()">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "TaskForm",
  data: () => ({
    statusOptions: [
      { text: "To-do", value: "TODO" },
      { text: "Doing", value: "DOING" },
      { text: "Done", value: "DONE" },
    ],
  }),
  props: ["dialog", "task"],
  methods: {
    async closeDialog() {
      await this.$emit("click:close");
      await this.resetForm();
    },
    async saveProject() {
      await this.$emit("click:save", Object.assign({}, this.task));
      await this.closeDialog();
    },
    async resetForm() {
      this.task.id = null;
      this.task.name = "";
      this.task.description = "";
      this.task.board_id = null;
      this.task.status = "TODO";
    },
  },
};
</script>

<style></style>
