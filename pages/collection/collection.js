var Collection = {
  template : `
<div>
  <SourceView src="/app/collection.js">
    <h1>CollectionView</h1>
    <CollectionView topic="demo" :headers="headers" resource="/api/collection"
                    id="id" :selected="model.selected" @select="select"
                    sortBy="created">
      <div style="margin:20px" v-html="$options.filters.syntaxHighlight(model.selected, 400)"></div>
    </CollectionView>
  </SourceView>
</div>
`,
  methods: {
    select : function(selected) {
      this.model.selected = selected;
    }
  },
  data: function() {
    return {
      model: {
        selected: {}
      },
      headers: [
        { text: "id",      align: "left",  sortable: true, value: "id"      },
        { text: "name",    align: "left",  sortable: true, value: "name"    },        
        { text: "updated", align: "left",  sortable: true, value: "updated" },
        { text: "created", align: "left",  sortable: true, value: "created" }
      ],
    }
  }
};

Navigation.add_page("Components", "extension", "CollectionView", "/collection", Collection);
