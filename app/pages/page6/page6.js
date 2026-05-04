// Vue 3 calendar example - updated for Vuetify 3
var Page6 = {
  template : `
<Page>
  <h1>A page with a calendar...</h1>

  <v-container>
    <v-row>
      <v-col>
        <v-sheet height="600">
          <v-calendar
            :now="today"
            :value="today"
            color="primary"
          >
            <template v-slot:day="{ date }">
              <template v-for="event in eventsMap[date]" :key="event.title">
                <v-menu
                  v-model="event.open"
                  location="end"
                >
                  <template v-slot:activator="{ props }">
                    <div
                      v-if="!event.time"
                      v-ripple
                      class="my-event"
                      v-bind="props"
                    >{{ event.title }}</div>
                  </template>
                  <v-card
                    color="grey-lighten-4"
                    min-width="350px"
                    variant="flat"
                  >
                    <v-toolbar
                      color="primary"
                      theme="dark"
                    >
                      <v-btn icon variant="text">
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                      <v-toolbar-title>{{ event.title }}</v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-btn icon variant="text">
                        <v-icon>mdi-heart</v-icon>
                      </v-btn>
                      <v-btn icon variant="text">
                        <v-icon>mdi-dots-vertical</v-icon>
                      </v-btn>
                    </v-toolbar>
                    <v-card-title>
                      <span>{{ event.details }}</span>
                    </v-card-title>
                    <v-card-actions>
                      <v-btn
                        variant="text"
                        color="secondary"
                      >
                        Cancel
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-menu>
              </template>
            </template>
          </v-calendar>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>

</Page>
`,
  navigation: {
    section : "Pages",
    icon    : "mdi-text-box",
    text    : "Page with a calendar",
    path    : "/page6"
  },
  computed: {
    // convert the list of events into a map of lists keyed by date
    eventsMap () {
      const map = {}
      this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e))
      return map
    }
  },
  methods: {
    open (event) {
      alert(event.title)
    }
  },
  data: function() {
    return {
      today: '2019-01-08',
      events: [
        {
          title: 'Vacation',
          details: 'Going to the beach!',
          date: '2018-12-30',
          open: false
        },
        {
          title: 'Vacation',
          details: 'Going to the beach!',
          date: '2018-12-31',
          open: false
        },
        {
          title: 'Vacation',
          details: 'Going to the beach!',
          date: '2019-01-01',
          open: false
        },
        {
          title: 'Meeting',
          details: 'Spending time on how we do not have enough time',
          date: '2019-01-07',
          open: false
        },
        {
          title: '30th Birthday',
          details: 'Celebrate responsibly',
          date: '2019-01-03',
          open: false
        },
        {
          title: 'New Year',
          details: 'Eat chocolate until you pass out',
          date: '2019-01-01',
          open: false
        },
        {
          title: 'Conference',
          details: 'Mute myself the whole time and wonder why I am on this call',
          date: '2019-01-21',
          open: false
        },
        {
          title: 'Hackathon',
          details: 'Code like there is no tommorrow',
          date: '2019-02-01',
          open: false
        }
      ]
    }
  }
}

Navigation.add(Page6)