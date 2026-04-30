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
        <v-layout justify-center row>
        </v-layout>
      </v-card-text>
    </v-card>     

    <v-card>
      <v-card-text>
        <v-tabs>
          <v-tab>Data</v-tab>
          <v-tab>Component</v-tab>

          <v-tab-item key="0" fluid>
            <v-card>
              <v-card-text>
                <div style="margin:20px">
                  <code>data.process</code>
                  <div style="margin-top:20px" v-html="$options.filters.syntaxHighlight(process, 800, 'json')"></div>
                </div>
              </v-card-text>
            </v-card>      
          </v-tab-item>

          <v-tab-item key="1" fluid>
            <v-card>
              <v-card-text>
                <div style="margin:20px">
                  <code>ProcessDiagramDemoBody</code>
                  <div style="margin-top:20px" v-html="$options.filters.syntaxHighlight(component, 800, 'javascript')"></div>
                </div>
              </v-card-text>
            </v-card>      
          </v-tab-item>
        </v-tabs>
      </v-card-text>
    </v-card>     

  </PageWithBanner>
</PageWithStatus>
`,
  navigation: {
    section: "Components",
    icon:    "extension",
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
