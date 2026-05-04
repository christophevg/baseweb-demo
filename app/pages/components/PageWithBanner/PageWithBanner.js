var PageWitBannerDemo = {
  template : `
<PageWithStatus>
  <PageWithBanner>
    <h1>A page with a banner...</h1>
    <p>

      If you apply the <code>PageWithBanner</code> component in stead of
      <code>Page</code> you have an optional banner available through global
      state configuration as <code>store.state.banner</code>. All pages that
      derive from <code>PageWithBanner></code> will show the same banner when
      activated.

    </p>

    <p>

      PS Other component demo pages also derive from <code>PageWithBanner</code>.

    </p>

    <v-card>
      <v-card-text>
        <v-row justify="center">
          <v-btn @click="update({'alert' : true }      )" class="ma-1">show the banner</v-btn>
          <v-btn @click="update({'alert' : false }     )" class="ma-1">hide the banner</v-btn>
          <v-btn @click="update({'type'  : 'success' } )" class="ma-1">make it an success banner</v-btn>
          <v-btn @click="update({'type'  : 'info' }    )" class="ma-1">make it an info banner</v-btn>
          <v-btn @click="update({'type'  : 'warning' } )" class="ma-1">make it an warning banner</v-btn>
          <v-btn @click="update({'type'  : 'error' }   )" class="ma-1">make it an error banner</v-btn>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-text>
        <div style="margin:20px">
          <code>store.state.banner</code>
          <div style="margin-top:20px" v-html="$filters.syntaxHighlight(banner, 800)"></div>
        </div>
      </v-card-text>
    </v-card>
  </PageWithBanner>
</PageWithStatus>
`,
  navigation: {
    section: "Components",
    icon:    "mdi-puzzle",
    text:    "Page with a banner",
    path:    "/components/PageWitBanner"
  },
  methods: {
    update : function(args) {
      store.commit("banner", args);
    }
  },
  computed: {
    banner: function() {
      return store.state.banner;
    }
  }
};

Navigation.add(PageWitBannerDemo);
