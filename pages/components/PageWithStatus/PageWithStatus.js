var PageWithStatusDemo = {
  template : `
<PageWithStatus>
  <PageWithBanner>
    <h1>A page with status...</h1>
    <p>

      <code>PageWithStatus</code> gives you a blank page. At first sight.

      Along with it, a <code>status</code> store is provided, allowing for
      raising an error/info/... message, which will be displayed as a snackbar
      at the top.

      So, to raise something just issue
  
      <code>store.commit("error", "something went wrong")</code>
  
      or
  
      <code>store.commit("success", "all good!")</code>

      or
  
      <code>store.commit("warning", "be carefull!")</code>
  
    </p>
  
    <v-card>
      <v-card-text>
        <v-layout justify-center row>
        <v-btn @click="raise('error', 'something went wrong')">raise an error</v-btn>
        <v-btn @click="raise('error', 'something else went wrong')">raise an another error</v-btn>
        <v-btn @click="raise('warning', 'something might go wrong')">raise a warning</v-btn>
        <v-btn @click="raise('success', 'nothing went wrong')">report everything is ok</v-btn>
        <v-btn @click="raise('info', 'things can or cannot go wrong')">inform about options</v-btn>
      </v-layout>
      </v-card-text>
    </v-card>     

    <v-card>
      <v-card-text>
        <div style="margin:20px">
          <code>store.state.status</code>
          <div style="margin-top:20px" v-html="$options.filters.syntaxHighlight(status, 800)"></div>
        </div>
      </v-card-text>
    </v-card>     

  </PageWithBanner>
</PageWithStatus>
`,
  navigation: {
    section: "Components",
    icon:    "extension",
    text:    "Page with status",
    path:    "/components/PageWithStatus"
  },
  methods: {
    raise : function(level, msg) {
      store.commit(level, msg);
    }
  },
  computed: {
    status: function() {
      return store.state.status;
    }
  }
};

Navigation.add(PageWithStatusDemo);
