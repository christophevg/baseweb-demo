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

Navigation.add_page("Pages", "description", "Page with nothing", "/page1", Page1);
