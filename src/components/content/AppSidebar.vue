<template>
  <v-navigation-drawer :value="drawer" app clipped>
    <v-list dense>
      <v-list-item v-for="item in items" :key="item.title" link>
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    drawer: Boolean
  },
  data: () => ({
    items: [
      { title: '仪表盘', icon: 'mdi-view-dashboard' },
      { title: '用户管理', icon: 'mdi-account-box-multiple' },
      { title: '标签管理', icon: 'mdi-tag-multiple' },
      { title: '文章管理', icon: 'mdi-text-box-multiple' }
    ]
  })
};
</script>
