var Page7 = {
  template : `
<Page>
  <h1>Page 7</h1>
  
  <p v-if="id">
    provided id: {{ id }}
  </p>
  <p v-else>
    No id provided. Try <router-link to="/page7/some-id">/page/some-id</router-link>.
  </p>
</Page>
`,
  computed: {
    id: function() {
      return this.$route.params.id;
    }
  },
  navigation: {
    section: "Pages",
    icon:    "description",
    text:    "Page with a parameter",
    path:    "/page7"
  }
};

Navigation.add(Page7);
router.addRoutes([ { path: "/page7/:id", component: Page7 } ]);
