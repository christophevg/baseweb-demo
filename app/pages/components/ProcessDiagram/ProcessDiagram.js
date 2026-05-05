var ProcessDiagramDemo = {
  template : `
<PageWithStatus>
  <PageWithBanner>

    <h1>Process Diagram</h1>

    <p>

      This is a simple wrapper around the wonderful work found at
      <a href="https://www.cssscript.com/process-flow-diagram/">
        https://www.cssscript.com/process-flow-diagram/
      </a>.

    </p>

    <p>

        Steps in the process can be specified as a <code>title</code> and some
        <code>html</code> or a <code>body</code> with a custom
        <code>component</code> and some <code>data</code>.

    </p>

    <v-card>
      <v-card-text>
        <ProcessDiagram :diagram="process"/>
      </v-card-text>
    </v-card>

    <v-card>
      <v-card-text>
        <v-tabs v-model="tab">
          <v-tab value="data">Data</v-tab>
          <v-tab value="component">Component</v-tab>
        </v-tabs>

        <v-divider></v-divider>

        <v-tabs-window v-model="tab">
          <v-window-item value="data" fluid>
            <v-card>
              <v-card-text>
                <div style="margin:20px">
                  <code>data.process</code>
                  <div style="margin-top:20px" v-html="$filters.syntaxHighlight(process, 800, 'json')"></div>
                </div>
              </v-card-text>
            </v-card>
          </v-window-item>

          <v-window-item value="component" fluid>
            <v-card>
              <v-card-text>
                <div style="margin:20px">
                  <code>ProcessDiagramDemoBody</code>
                  <div style="margin-top:20px" v-html="$filters.syntaxHighlight(component, 800, 'javascript')"></div>
                </div>
              </v-card-text>
            </v-card>
          </v-window-item>
        </v-tabs-window>
      </v-card-text>
    </v-card>

  </PageWithBanner>
</PageWithStatus>
`,
  navigation: {
    section: "Components",
    icon:    "mdi-puzzle",
    text:    "ProcessDiagram",
    path:    "/components/ProcessDiagram"
  },
  created: function() {
    var self = this;
    $.get({
      url: "/app/ProcessDiagramDemoBody.js",
      success: function(response) {
        self.component = response;
      },
      dataType: "html" // else the script is actually processed by JQuery ;-)
    });
  },
  data: function() {
    return {
      tab: "data",
      component : "",
      process : {
        sequence : [
          {
            title : "Step 1",
            html: "<b>body</><br>of<br><i>step 1</i>"
          },
          {
            fanout : [
              {
                "sequence" : [
                  {
                    title : "Step 2a",
                    html: "<b>body</><br>of<br><i>step 2a</i>"
                  },
                  {
                    fanout: [
                      {
                        title : "Step 3a",
                        html: "<b>body</><br>of<br><i>step 3a</i>"
                      },
                      {
                        title : "Step 3b",
                        body: {
                          component: "ProcessDiagramDemoBody",
                          data: {
                            title: "Custom Component",
                            body: "Custom Body Component Body"
                          }
                        }
                      }
                    ]
                  }
                ]
              },
              {
                title : "Step 2b",
                html: "<b>body</><br>of<br><i>step 2b</i>"
              }
            ]
          },
          {
            title : "Step 4",
            html: "<b>body</><br>of<br><i>step 4</i>"
          }
        ]
      }
    }
  }
};

Navigation.add(ProcessDiagramDemo);
