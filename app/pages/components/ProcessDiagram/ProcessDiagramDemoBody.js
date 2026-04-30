Vue.component("ProcessDiagramDemoBody", {
  props: [ "title", "body" ],
  template: `
    <v-card>
      <v-card-actions>
        <h2>{{ title }}</h2>
      </v-card-actions>
      <v-card-text>
        {{ body }}
      </v-card-text>
    </v-card>`
});
