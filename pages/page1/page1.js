var Page1 = {
  template : `
<div>
  <h1>Page 1</h1>
</div>
`,
  computed: {},
  methods: {},
  data: function() {
    return {}
  }
};

Navigation.add_page("Index", "description", "Page1", "/page1", Page1);
