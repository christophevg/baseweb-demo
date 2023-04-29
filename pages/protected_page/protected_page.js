var ProtectedPage = {
  template : `
<Page>
  <h1>Protected Page</h1>
  <p v-if="have_authenticated_user">
    Welkom... {{ user.name }}! <v-btn @click="logout()">log out</v-btn>
  </p>
  <p v-else>
    <v-btn @click="login()">log in using Google...</v-btn>
  </p>
</Page>
`,
  navigation: {
    section: "Pages",
    icon:    "description",
    text:    "A protected page",
    path:    "/protected_page"
  },
  mounted: function() {
    // TODO integrate better through store.state.config
    window.oatk.using_provider("https://accounts.google.com/.well-known/openid-configuration");
    window.oatk.using_client_id("53688880096-vamcdnpu4140ehulm6f9pugsp7goilu8.apps.googleusercontent.com");
    window.oatk.apply_flow("implicit");
  },
  computed: {
    have_authenticated_user: function() {
      return oatk.have_authenticated_user();
    },
    user: function() {
      return oatk.get_user_info();
    }
  },
  methods: {
    login: function() {
      oatk.login();
    },
    logout: function() {
      oatk.logout(function(){console.log("logging out")});
    }
  }
};

Navigation.add(ProtectedPage);
