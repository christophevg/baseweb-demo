Vue.component("SourceView", {
  props: [ "src" ],
  template : `
    <v-tabs>
      <v-tab>Demo</v-tab>
      <v-tab>Source</v-tab>

      <v-tab-item key="0" fluid>
        <v-card>
          <v-card-text>
            <slot></slot>
          </v-card-text>
        </v-card>      
      </v-tab-item>

      <v-tab-item key="1" fluid>
        <v-card>
          <v-card-text>
            <div style="margin:20px">
              <div style="margin:20px" v-html="$options.filters.syntaxHighlight(model.content, 800, 'javascript')"></div>
            </div>
          </v-card-text>
        </v-card>      
      </v-tab-item>
  </v-tabs>
`,
  created: function() {
    var self = this;
    $.get({
      url: this.src,
      success: function(response) {
        self.model.content = response;
      },
      dataType: "html" // else the script is actually processed by JQuery ;-)
    });
  },
  data: function() {
    return {
      model : {
        content : ""
      }
    }
  }
});
