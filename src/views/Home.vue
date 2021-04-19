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
        v-for="project of projects"
        :key="project.id"
      >
        <v-card elevation="2" class="card" :to="`project/${project.id}`">
          <v-card-title>{{ project.name }}</v-card-title>
          <v-card-text>{{ project.description }}</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon @click.prevent @click="editProject(project)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <!--            <v-btn icon><v-icon>mdi-delete</v-icon></v-btn>-->
          </v-card-actions>
          <v-progress-linear
            top
            absolute
            rounded
            :value="project.progress * 100"
            :color="getProgressColor(project)"
          ></v-progress-linear>
        </v-card>
      </v-col>
    </v-row>
    <project-form
      :dialog="formOpen"
      :project="currentProject"
      @click:close="closeForm"
      @click:save="saveProject"
    />
    <fabutton color="pink" @click.native="formOpen = true" />
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {
    "project-form": require("@/components/ProjectForm.vue").default,
    fabutton: require("@/components/FAButton.vue").default,
  },
  methods: {
    async editProject(project) {
      this.formOpen = true;
      this.currentProject = Object.assign({}, project);
    },
    async closeForm() {
      this.formOpen = false;
    },
    async saveProject(project) {
      if (project.id) {
        await this.$http.patch(`/projects/${project.id}`, project);
        const projectIndex = this.projects.findIndex(
          (item) => item.id === project.id
        );
        const newProjectsList = [...this.projects];
        newProjectsList[projectIndex] = {
          ...newProjectsList[projectIndex],
          name: project.name,
          description: project.description,
        };
        this.projects = newProjectsList;
      } else {
        const response = await this.$http.post("/projects", project);
        this.projects.unshift(response.data);
      }
    },
    async getProjectsList() {
      const response = await this.$http.get("/projects");
      this.projects = response.data;
    },
    getProgressColor(project) {
      if (project.progress < 0.5) {
        return "primary";
      } else if (project.progress < 0.7) {
        return "yellow";
      } else {
        return "green";
      }
    },
  },
  async mounted() {
    await this.getProjectsList();
  },
  data: () => ({
    projects: [],
    formOpen: false,
    currentProject: {
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
