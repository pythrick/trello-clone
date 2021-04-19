<template>
  <v-btn elevation="2" large fab fixed :color="color" dark bottom right>
    <v-icon>mdi-plus</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: "FAButton",
  props: ["color"],
};
</script>

<style scoped></style>
