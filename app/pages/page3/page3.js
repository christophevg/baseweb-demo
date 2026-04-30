var Page3 = {
  template : `
<Page>
  <h1>A page with config...</h1>
  <p>

    Baseweb is configurable through environment variables, typically stored in
    a <code>.env</code> file. These are all loaded into an <code>app</code>
    object, available from <code>baseweb.config</code> in the Python code and
    injected in the top-level Vuex store available as
    <code>store.state.config</code>.

  </p>

  <p>

    Below is the content of this configuration for the demo application. Notice
    the <code>baseweb-demo</code> entry, which was injected from the demo app.

  </p>
  
  <v-card>
    <v-card-text>
      <div style="margin:20px">
        <div style="margin:20px" v-html="$options.filters.syntaxHighlight(config, 800)"></div>
      </div>
    </v-card-text>
  </v-card>     
</Page>
`,
  navigation: {
    section: "Pages",
    icon:    "description",
    text:    "Page with config",
    path:    "/page3"
  },
  computed: {
    config: function() {
      return store.state.config;
    }
  }
};

Navigation.add(Page3);
