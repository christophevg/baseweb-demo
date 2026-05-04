var Page2 = {
  template : `
<Page>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="6">
        <v-card>
          <v-img
            src="/app/static/desert.jpg"
            aspect-ratio="2.75"
          ></v-img>

          <v-card-title>
            <h3 class="text-h5">Page 2</h3>
          </v-card-title>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</Page>
`,
  navigation: {
    section: "Pages",
    icon:    "mdi-text-box",
    text:    "Page with card",
    path:    "/page2"
  }
};

Navigation.add(Page2);