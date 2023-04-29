var ProtectedPage = {
  template : `
<Page>
  <h1>A Protected Page</h1>
  <p>

    This page is protected using Google's OAuth provider and has two parts: a
    public, non-protected part and a protected part. When accessing the page
    without being authenticated, it will show only the public part and any
    calls made to protected API's will fail.<br> Just login with a Google
    account and your name will show up and API calls can be made succesfully.

  </p>
  
  <p>

    The setup requires two environment variables: <code>OAUTH_PROVIDER</code>,
    containing the discovery URL and <code>OAUTH_CLIENT_ID</code> containing
    the client_id for your <a
    href="https://console.cloud.google.com">registered application</a>. Make
    sure to registere <code>http://localhost:8000</code> as authorized
    javascript origin and <code>http://localhost:8000/protected_page</code> as
    authorized redirect URL.

  </p>

  <p v-if="have_authenticated_user">
    Welcome... {{ user.name }}! You are now authenticated.
    <v-btn @click="try_hello()">access protected API</v-btn>
    <v-btn @click="logout()">log out</v-btn>
  </p>
  <p v-else>
    <v-btn @click="try_hello()">access protected API</v-btn>
    <v-btn @click="login()">log in using Google...</v-btn>
    <div id="output"></div>
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
    window.oatk.using_provider(store.state.config.oauth.provider);
    window.oatk.using_client_id(store.state.config.oauth.client_id);
    window.oatk.apply_flow("implicit");
  },
  computed: {
    have_authenticated_user: function() {
      this.refresh;
      return oatk.have_authenticated_user();
    },
    user: function() {
      this.refresh;
      return oatk.get_user_info();
    }
  },
  methods: {
    login: function() {
      oatk.login();
    },
    logout: function() {
      var self = this;
      oatk.logout(function(){
        self.refresh++; // force recompute
        $("#output").text("");
      });
    },
    try_hello: function() {
      var base_url = window.location.href.split("?")[0].split("#")[0].replace(/\/$/, "");
      oatk.http.getJSON("/api/protected/hello", function(result) {
        $("#output").text(JSON.stringify(result));
      }, function(result) {
        console.log(result);
        if(result.status == 403) {
          $("#output").text("You were authenticated by Google, yet you don't have the correct claims.");
        } else if(result.status == 401) {
          $("#output").text("You are not authenticated by Google.");
        }
      });
    }
  },
  data() {
    return {
      refresh: 0
    }
  }
};

Navigation.add(ProtectedPage);
