<template>
  <v-navigation-drawer :value="drawer" app clipped>
    <v-list dense>
      <v-list-item v-for="item in items" :key="item.meta.title" :to="item.path" link>
        <v-list-item-action>
          <v-icon>{{ item.meta.icon }}</v-icon>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title>{{ item.meta.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// 侧边栏
export default {
  props: {
    // 是否显示
    drawer: { type: Boolean, require: true }
  },
  computed: {
    // 导航栏路由
    items() {
      return this.$router.options.routes.find(i => i.path === '/').children;
    }
  }
};
</script>
