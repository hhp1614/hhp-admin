<template>
  <div id="home">
    <app-sidebar :drawer="drawer" />
    <app-header @toggleDrawer="drawer = !drawer" />
    <v-content>
      hello
    </v-content>
  </div>
</template>

<script>
import AppHeader from '../components/content/AppHeader';
import AppSidebar from '../components/content/AppSidebar';

export default {
  components: { AppHeader, AppSidebar },
  data() {
    return {
      drawer: null
    };
  }
};
</script>
