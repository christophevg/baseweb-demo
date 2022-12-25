var Page2 = {
  template : `
<v-layout>
  <v-flex xs12 sm6 offset-sm3>
    <v-card>
      <v-img
        src="/app/static/desert.jpg"
        aspect-ratio="2.75"
      ></v-img>

      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">Page 2</h3>
        </div>
      </v-card-title>

    </v-card>
  </v-flex>
</v-layout>
`,
  computed: {},
  methods: {},
  data: function() {
    return {}
  }
};

Navigation.add_page("Pages", "description", "Page with card", "/page2", Page2);
