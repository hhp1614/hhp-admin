<template>
  <div id="home">
    <app-header />
    <v-content style="height: 100vh">
      <v-navigation-drawer color="primary">
        <v-list>
          <v-list-item v-for="item in items" :key="item.title" link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-content>
  </div>
</template>

<script>
import AppHeader from '../components/content/AppHeader';

export default {
  components: { AppHeader },
  data() {
    return {
      items: [
        { title: '仪表盘', icon: 'mdi-view-dashboard' },
        { title: '用户管理', icon: 'mdi-account-box-multiple' },
        { title: '标签管理', icon: 'mdi-tag-multiple' },
        { title: '文章管理', icon: 'mdi-text-box-multiple' }
      ]
    };
  }
};
</script>
