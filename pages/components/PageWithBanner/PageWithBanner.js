var PageWitBannerDemo = {
  template : `
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
      <v-layout justify-center row>
      <v-btn @click="update({'alert' : true }      )">show the banner</v-btn>
      <v-btn @click="update({'alert' : false }     )">hide the banner</v-btn>
      <v-btn @click="update({'type'  : 'success' } )">make it an success banner</v-btn>
      <v-btn @click="update({'type'  : 'info' }    )">make it an info banner</v-btn>
      <v-btn @click="update({'type'  : 'warning' } )">make it an warning banner</v-btn>
      <v-btn @click="update({'type'  : 'error' }   )">make it an error banner</v-btn>
    </v-layout>
    </v-card-text>
  </v-card>     

  <v-card>
    <v-card-text>
      <div style="margin:20px">
        <div style="margin:20px" v-html="$options.filters.syntaxHighlight(banner, 800)"></div>
      </div>
    </v-card-text>
  </v-card>     
  
</PageWithBanner>
`,
  navigation: {
    section: "Components",
    icon:    "extension",
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
