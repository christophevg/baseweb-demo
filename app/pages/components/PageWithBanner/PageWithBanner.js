var PageWithBannerDemo = {
  template : `
<Page banner status>
  <h1>A page with a banner...</h1>
  <p>

    If you apply the <code>Page</code> component with <code>banner</code> prop,
    you have an optional banner available through global state configuration as
    <code>store.state.page.banner</code>. All pages that use <code>&lt;Page banner&gt;</code>
    will show the same banner when activated.

  </p>

  <v-card>
    <v-card-text>
      <v-row justify="center">
        <v-btn @click="update({'alert' : true }      )" class="ma-1">show the banner</v-btn>
        <v-btn @click="update({'alert' : false }     )" class="ma-1">hide the banner</v-btn>
        <v-btn @click="update({'type'  : 'success' } )" class="ma-1">make it a success banner</v-btn>
        <v-btn @click="update({'type'  : 'info' }    )" class="ma-1">make it an info banner</v-btn>
        <v-btn @click="update({'type'  : 'warning' } )" class="ma-1">make it a warning banner</v-btn>
        <v-btn @click="update({'type'  : 'error' }   )" class="ma-1">make it an error banner</v-btn>
      </v-row>
    </v-card-text>
  </v-card>

  <v-card>
    <v-card-text>
      <div style="margin:20px">
        <code>store.state.page.banner</code>
        <div style="margin-top:20px" v-html="$filters.syntaxHighlight(banner, 800)"></div>
      </div>
    </v-card-text>
  </v-card>
</Page>
`,
  navigation: {
    section: "Components",
    icon:    "mdi-puzzle",
    text:    "Page with a banner",
    path:    "/components/PageWithBanner"
  },
  methods: {
    update: function (args) {
      store.commit("page/banner", args);
    }
  },
  computed: {
    banner: function () {
      return store.state.page.banner;
    }
  }
};

Navigation.add(PageWithBannerDemo);