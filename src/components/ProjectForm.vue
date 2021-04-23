<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">{{
            project.id ? "Edit project" : "Add new project"
          }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="project.name"
                  label="Name*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="project.description"
                  label="Description*"
                  required
                ></v-text-field>
              </v-col>

              <v-color-picker
                v-model="color"
                class="mx-auto"
                hide-canvas
                hide-inputs
                hide-sliders
                hide-mode-switch
                swatches-max-height="300"
                mode="hexa"
                :swatches="swatches"
                show-swatches
              ></v-color-picker>
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
  name: "ProjectForm",
  data: () => ({
    swatches: [["#EF5350"], ["#EC407A"], ["#9FA8DA"], ["#66BB6A"]],
  }),
  props: ["dialog", "project"],
  computed: {
    color: {
      // getter
      get: function () {
        return this.project.color;
      },
      // setter
      set: function (newValue) {
        this.project.color = newValue.hexa;
      },
    },
  },
  methods: {
    async closeDialog() {
      await this.$emit("click:close");
      await this.resetForm();
    },
    async saveProject() {
      await this.$emit("click:save", Object.assign({}, this.project));
      await this.closeDialog();
    },
    async resetForm() {
      this.project.id = null;
      this.project.name = "";
      this.project.description = "";
      this.project.color = "#EF5350";
    },
  },
};
</script>

<style></style>
