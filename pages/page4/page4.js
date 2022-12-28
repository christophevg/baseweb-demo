var Page4 = {
  template : `
<Page>
  <h1>A page with a badge...</h1>
  <p>

    A page can apply a badge to it's <code>NavigationDrawer</code> tile.
  
  </p>
  
  <p>

    Use the buttons below to increase/decrease a local value for this page. It
    will be reflected on the <code>NavigationDrawer</code> tile's badge.

  </p>

  <p>

    The data structure below shows the entire <code>NavigationDrawer</code>
    configuration, as it is stored in the <code>store.state.drawer</code>.

  </p>

  <v-card>
    <v-card-text>
      <v-layout justify-center row>
      <v-btn @click="update(-1)">-</v-btn>
      <v-chip :color="badge.color" text-color="white">{{ badge.text }}</v-chip>
      <v-btn @click="update(+1)">+</v-btn>
    </v-layout>
    </v-card-text>
  </v-card>     

  <v-card>
    <v-card-text>
      <div style="margin:20px">
        <div style="margin:20px" v-html="$options.filters.syntaxHighlight(config, 800)"></div>
      </div>
    </v-card-text>
  </v-card>     
</Page>
`,
  created: function() {
    // (re)link our "local" reactive property managing the badge
    // it is stored in a store therefore to remain persistent across route 
    // changes. it's a bit dirty, but it gets the job done ;-) 
    Vue.set(Page4.navigation, "badge", this.badge);
  },
  navigation: {
    section : "Pages",
    icon    : "description",
    text    : "Page with a badge",
    path    : "/page4"
  },
  methods: {
    update: function(change) {
      store.commit("update_badge", change);
    }
  },
  computed: {
    config: function() {
      return store.state.drawer;
    },
    badge : function() {
      return store.state.badge;
    }
  }
}

Navigation.add(Page4)

store.registerModule("badge", {
  state: {
    visible : false,
    text    : 0,
    color   : "blue"
  },
  mutations: {
    update_badge: function(state, change) {
      state.text   += change;
      state.color   = state.text >= 0 ? "green" : "red";
      state.visible = state.text != 0;
    }
  }
});
