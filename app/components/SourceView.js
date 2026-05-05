app.component("SourceView", {
  props: [ "src" ],
  template : `
    <div>
      <v-tabs v-model="model.tab">
        <v-tab value="demo">Demo</v-tab>
        <v-tab value="source">Source</v-tab>
      </v-tabs>

      <v-divider></v-divider>

      <v-tabs-window v-model="model.tab">
        <v-window-item value="demo">
          <v-card>
            <v-card-text>
              <slot></slot>
            </v-card-text>
          </v-card>
        </v-window-item>

        <v-window-item value="source">
          <v-card>
            <v-card-text>
              <div style="margin:20px">
                <div style="margin:20px" v-html="$filters.syntaxHighlight(model.content, 800, 'javascript')"></div>
              </div>
            </v-card-text>
          </v-card>
        </v-window-item>
      </v-tabs-window>
    </div>
  `,
  created: function() {
    var self = this;
    // Use fetch instead of jQuery for Vue 3 compatibility
    fetch(this.src)
      .then(function(response) { return response.text(); })
      .then(function(content) { self.model.content = content; })
      .catch(function(error) { console.error('Error loading source:', error); });
  },
  data: function() {
    return {
      model : {
        content : "",
        tab: "demo"
      }
    }
  }
});
