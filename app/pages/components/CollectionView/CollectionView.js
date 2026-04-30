var CollectionViewDemo = {
  template : `
<PageWithStatus>
  <PageWithBanner>
    <SourceView src="/app/CollectionView.js">
      <h1>CollectionView</h1>
      <CollectionView topic="demo" :headers="headers" resource="/api/collection"
                      id="id" :selected="model.selected" @select="select"
                      actions="delete"
                      sortBy="created"
                      :labels="model.labels"
                      :enrich="mark_johns">
        <div style="margin:20px" v-html="$options.filters.syntaxHighlight(model.selected, 400)"></div>
      </CollectionView>
    </SourceView>
  </PageWithBanner>
</PageWithStatus>
`,
  navigation: {
    section: "Components",
    icon:     "extension",
    text:     "CollectionView",
    path:     "/components/CollectionView"
  },
  methods: {
    select : function(selected) {
      this.model.selected = selected;
    },
    mark_johns: function(rows) {
      return rows.map(function(row) {
        if(row["name"].startsWith("John")) {
          row["isAJohn"] =  "✅";
        }
        return row;
      });
    }
  },
  data: function() {
    return {
      model: {
        selected: {},
        labels: {
          "delete it"     : "Are you sure?",
          "delete item"   : "Do you really want to delete item",
          "cancel delete" : "No, don't delete it",
          "confirm delete": "Yes, delete it"
        }
      },
      headers: [
        { text: "id",      align: "left",  sortable: true,  value: "id"      },
        { text: "name",    align: "left",  sortable: true,  value: "name"    },        
        { text: "updated", align: "left",  sortable: true,  value: "updated" },
        { text: "created", align: "left",  sortable: true,  value: "created" },
        { text: "John?",   align: "center",sortable: false, value: "isAJohn" }
      ],
    }
  }
};

Navigation.add(CollectionViewDemo);
