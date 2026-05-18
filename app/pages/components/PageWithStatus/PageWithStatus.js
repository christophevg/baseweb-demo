var PageWithStatusDemo = {
  template : `
<Page banner status>
  <h1>A page with status...</h1>
  <p>

    Status notifications are handled by the Page component when the <code>status</code>
    prop is set. To raise a notification, use:

    <code>store.commit("page/success", "message")</code>

    or

    <code>store.commit("page/error", "something went wrong")</code>

    or

    <code>store.commit("page/warning", "be careful")</code>

  </p>

  <v-card>
    <v-card-text>
      <v-row justify="center">
        <v-btn @click="raise('error', 'something went wrong')" class="ma-1">raise an error</v-btn>
        <v-btn @click="raise('error', 'something else went wrong')" class="ma-1">raise another error</v-btn>
        <v-btn @click="raise('warning', 'something might go wrong')" class="ma-1">raise a warning</v-btn>
        <v-btn @click="raise('success', 'nothing went wrong')" class="ma-1">report everything is ok</v-btn>
        <v-btn @click="raise('info', 'things can or cannot go wrong')" class="ma-1">inform about options</v-btn>
      </v-row>
    </v-card-text>
  </v-card>

  <v-card>
    <v-card-text>
      <div style="margin:20px">
        <code>store.state.page.status</code>
        <div style="margin-top:20px" v-html="$filters.syntaxHighlight(status, 800)"></div>
      </div>
    </v-card-text>
  </v-card>
</Page>
`,
  navigation: {
    section: "Components",
    icon:    "mdi-puzzle",
    text:    "Page with status",
    path:    "/components/PageWithStatus"
  },
  methods: {
    raise: function (level, msg) {
      store.commit("page/" + level, msg);
    }
  },
  computed: {
    status: function() {
      return store.state.page.status;
    }
  }
};

Navigation.add(PageWithStatusDemo);