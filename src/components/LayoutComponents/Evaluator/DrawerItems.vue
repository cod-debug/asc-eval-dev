<template>
  <div>
    <div v-for="(item,key) in drawerItems" :key="key">
      <q-expansion-item
        class="nav-item"
        dense-toggle
        expand-separator
        :icon="item.icon"
        :label="item.label"
        v-if="item.children && item.children.length > 0"
      >
        <q-item clickable v-ripple class="nav-item-child"
          v-for="(i,k) in item.children" :key="k"
          :to="i.path"
          exact
        >
          <q-item-section avatar class="drawer-item-icon">
            <i :class="i.icon"></i>
          </q-item-section>

          <q-item-section class="text-red-15">
            {{ i.label || "N/A" }}
          </q-item-section>
          <q-item-section avatar>
            <q-badge class="drawer-badge" rounded  color="green" text-color="black" :label="i.count" />
          </q-item-section>

        </q-item>
      </q-expansion-item>

      <q-item clickable v-ripple class="nav-item"
        v-else
        :to="item.path"
        exact
      >
        <q-item-section avatar>
          <i :class="item.icon"></i>
        </q-item-section>

        <q-item-section class="text-red-15">
          {{ item.label || "N/A" }}
        </q-item-section>
      </q-item>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    drawerItems: [],
  }),
  methods: {
    
    async initApp() {
      let vm = this;
      vm.drawerItems = [
        {
          icon: "fa-solid fa-user-circle",
          label: "S1 Applications",
          children: [
            {
              icon: "fa-solid fa-caret-right",
              label: "Individual Applications",
              count: 0,
              path: "/asc/page/application/s1/lists",
            },
            {
              icon: "fa-solid fa-caret-right",
              label: "Multiple Applications",
              count: 0,
              path: "/asc/page/application/s1/multiple",
            },
            {
              icon: "fa-solid fa-caret-right",
              label: "Special Applications",
              count: 0,
              path: "/asc/page/application/s1/special",
            }
          ]
        },
        {
          icon: "fa-solid fa-user-circle",
          label: "S2 Applications",
          children: [
            {
              icon: "fa-solid fa-caret-right",
              label: "Individual Applications",
              count: 0,
              path: "/asc/page/application/s2/lists",
            },
            {
              icon: "fa-solid fa-caret-right",
              label: "Multiple Applications",
              count: 0,
              path: "/asc/page/application/s2/multiple",
            },
            {
              icon: "fa-solid fa-caret-right",
              label: "Special Applications",
              count: 0,
              path: "/asc/page/application/s2/special",
            },
          ]
        },
        {
          icon: "fa-solid fa-info-circle",
          label: "Announcement",
          path: "/asc/page/announcement",
        },
      ];

      setInterval(async () => {
        let {data, status} = await vm.$store.dispatch("ascUser/getCountByRole");
        if([200, 201].includes(status)){
          vm.drawerItems[0].children[0].count = data.individualCount;
          vm.drawerItems[0].children[1].count = data.multipleCount;
          vm.drawerItems[0].children[2].count = data.specialCount;
          vm.drawerItems[1].children[0].count = data.s2InvididualCount;
          vm.drawerItems[1].children[1].count = data.s2MultipleCount;
          vm.drawerItems[1].children[2].count = data.s2SpecialCount;
        }
      }, 2500);
    }
  },
  mounted() {
    this.initApp();
  },
}
</script>

