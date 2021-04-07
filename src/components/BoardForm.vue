<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          elevation="2"
          large
          fab
          fixed
          color="pink"
          dark
          bottom
          right
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Add new board</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="newBoard.name"
                  label="Name*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="newBoard.description"
                  label="Description"
                  hint="example of helper text only on focus"
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
  data: () => ({
    dialog: false,
    newBoard: {
      id: null,
      name: "",
      description: "",
      progress: 0,
    },
  }),
  methods: {
    async closeDialog() {
      this.dialog = false;
      this.resetForm();
    },
    async saveBoard() {
      await this.$emit("click:save", Object.assign({}, this.newBoard));
      await this.closeDialog();
    },
    async resetForm() {
      this.newBoard.id = null;
      this.newBoard.name = "";
      this.newBoard.description = "";
    },
  },
};
</script>

<style></style>
