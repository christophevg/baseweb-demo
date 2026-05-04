// Vue 3 calendar example - using external calendar library
// Note: Vuetify 3 Labs calendar requires special bundling
// For now, display a placeholder message
var Page6 = {
  template : `
<Page>
  <h1>A page with a calendar...</h1>

  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Calendar</v-card-title>
          <v-card-text>
            <p class="text-grey">
              The calendar component requires Vuetify Labs which needs special bundling.
              This page will be updated with a calendar solution in a future update.
            </p>
            <p class="mt-4">
              <strong>Events that would be shown:</strong>
            </p>
            <v-list>
              <v-list-item v-for="event in events" :key="event.title + event.date">
                <v-list-item-title>{{ event.title }}</v-list-item-title>
                <v-list-item-subtitle>{{ event.date }} - {{ event.details }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
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