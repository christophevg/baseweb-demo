var Index = {
  template : `
<div>
  <h1>Hello World</h1>
  <div>
    <vue-form-generator ref="vfg" :schema="schema" :model="model" :options="formOptions" @validated="handleValidation"></vue-form-generator>
    <v-btn :loading="working" @click="send_get()" class="primary" :disabled="isInvalid">GET</v-btn>
    <v-btn :loading="working" @click="send_post()" class="primary" :disabled="isInvalid">POST</v-btn>
    <v-btn :loading="working" @click="send_socketio()" class="primary" :disabled="isInvalid">SocketIO</v-btn>
  </div>

  <hr style="margin-bottom:20px;margin-top:20px;">

  <h2>Messages from the server side</h2>
  <v-expansion-panels>
    <v-expansion-panel v-for="(message, i) in messages" :key="i">
      <v-expansion-panel-title>
        <div>
          <span class="text-grey">{{ $filters.formatDate(message.when) }}</span>
          <br>
          <span>{{ message.body }}</span>
        </div>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <div>{{ message.body }}</div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>

</div>
`,
  navigation: {
    section: null,
    icon:    "mdi-home",
    text:    "Welcome",
    path:    "/",
    index:   1
  },
  computed: {
    isInvalid: function() {
      if( ! this.isValid ) { return true; }
      return this.model["name"] == "";
    },
    messages : function() {
      return store.getters.logs;
    }
  },
  methods: {
    handleValidation:function(isValid, errors){
      this.isValid = isValid;
    },
    send_get: function() {
      var self = this;
      $.ajax({
        url: "/api/hello",
        type: "get",
        data: {
          name: this.model["name"],
        },
        success: function(response) {
          self.working = false;
          notify({
            title: "Response...",
            text:  response,
            type:  "success"
          });
        },
        error: function(response) {
          notify({
            title: "Could not process...",
            text:  response.responseText,
            type:  "warning"
          });
          self.working = false;
        }
      });
    },
    send_post: function() {
      this.working = true;
      var self = this;
      $.ajax( {
        url: "/api/hello",
        type: "post",
        data: JSON.stringify( {"name": this.model["name"]} ),
        dataType: "json",
        contentType: "application/json",
        success: function(response) {
          self.working = false;
          notify({
            title: "Response...",
            text:  response.message,
            type:  "success"
          });
        },
        error: function(response) {
          notify({
            title: "Could not process...",
            text:  response.responseText,
            type:  "warning"
          });
          self.working = false;
        }
      });
    },
    send_socketio: function() {
      this.working = true;
      var self = this;
      socket.emit("hello", this.model["name"], function(response) {
        self.working = false;
        notify({
          title: "Response...",
          text:  response,
          type:  "success"
        });
      });
    }
  },
  data: function() {
    return {
      working: false,
      isValid : true,
      model: {
        "name": ""
      },
      schema: {
        fields: [
          {
            type: "input",
            inputType: "text",
            label: "Name",
            model: "name",
            readonly: false,
            required: true,
            placeholder: "Your name"
          }
        ]
      },
      formOptions: {
        validateAfterLoad: false,
        validateAfterChanged: true
      }
    }
  }
};

Navigation.add(Index);

// set up page specific part in the store

store.registerModule("Index", {
  state: {
    log: []
  },
  mutations: {
    log: function(state, msg) {
      state.log.unshift({
        when: new Date(),
        body: msg
      });
    }
  },
  getters: {
    logs: function(state) {
      return state.log;
    }
  }
});

socket.on("log", function(msg){
  store.commit("log", msg);
});
