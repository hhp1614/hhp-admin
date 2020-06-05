<template>
  <div id="home">
    <app-sidebar :drawer="drawer" />
    <app-header @toggleDrawer="drawer = !drawer" />
    <v-content>
      <v-container fluid>
        <h2 class="mb-2">{{ $route.meta.title }}</h2>
        <router-view />
      </v-container>
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
