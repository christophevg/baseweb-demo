var Page5 = {
  template : `
<Page>
  <h1>A page with a form...</h1>
  <p>
    Vue Form Generator is included...
  </p>

  <v-card>
    <v-card-text>
      <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
    </v-card-text>
  </v-card>

  <v-card>
    <v-card-text>
      <div style="margin:20px">
        <div style="margin:20px" v-html="$filters.syntaxHighlight(model, 800)"></div>
      </div>
    </v-card-text>
  </v-card>
</Page>
`,
  navigation: {
    section : "Pages",
    icon    : "mdi-text-box",
    text    : "Page with a form",
    path    : "/page5"
  },
  data: function() {
    return {
      model : {
        name : ""
      },
      schema: {
        fields: [
          {
            type       : "input",
            inputType  : "text",
            label      : "Name",
            placeholder: "First and last name",
            model      : "name",
            required   : true,
            min:       3
          }
        ]
      },
      formOptions: {
        validateAfterLoad:    true,
        validateAfterChanged: true
      }
    }
  }
}

Navigation.add(Page5)
