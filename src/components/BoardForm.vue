<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">{{
            board.id ? "Edit board" : "Add new board"
          }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="board.name"
                  label="Name*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="board.description"
                  label="Description"
                ></v-text-field>
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
          <v-btn color="blue darken-1" text @click="saveBoard()"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data: () => ({}),
  props: ["dialog", "board"],
  methods: {
    async closeDialog() {
      await this.$emit("click:close");
      await this.resetForm();
    },
    async saveBoard() {
      await this.$emit("click:save", Object.assign({}, this.board));
      await this.closeDialog();
    },
    async resetForm() {
      this.board.id = null;
      this.board.name = "";
      this.board.description = "";
    },
  },
};
</script>

<style></style>
