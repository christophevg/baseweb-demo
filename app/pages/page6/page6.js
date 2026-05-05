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
            <v-calendar
              ref="calendar"
              v-model="focus"
              :events="events"
              event-overlap-mode="column"
              event-overlap-threshold="30"
            >
              <template v-slot:event="{ event }">
                <div class="pa-1" @click="showEvent(event)">
                  <strong>{{ event.title }}</strong>
                  <div v-if="event.details" style="font-size: 12px">{{ event.details }}</div>
                </div>
              </template>
            </v-calendar>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="selectedOpen" max-width="400">
    <v-card>
      <v-card-title>{{ selectedEvent.title }}</v-card-title>
      <v-card-text>
        <div><strong>Date:</strong> {{ selectedEvent.start }}</div>
        <div v-if="selectedEvent.end"><strong>End:</strong> {{ selectedEvent.end }}</div>
        <div v-if="selectedEvent.details">{{ selectedEvent.details }}</div>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="selectedOpen = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</Page>
`,
  navigation: {
    section : "Pages",
    icon    : "mdi-text-box",
    text    : "Page with a calendar",
    path    : "/page6"
  },
  methods: {
    showEvent: function(event) {
      this.selectedEvent = event;
      this.selectedOpen = true;
    }
  },
  data: function() {
    return {
      focus: '2019-01-08',
      selectedEvent: {},
      selectedOpen: false,
      events: [
        {
          title: 'Vacation',
          details: 'Going to the beach!',
          start: '2018-12-30',
          end: '2019-01-01',
          color: 'blue'
        },
        {
          title: 'Meeting',
          details: 'Spending time on how we do not have enough time',
          start: '2019-01-07',
          color: 'red'
        },
        {
          title: '30th Birthday',
          details: 'Celebrate responsibly',
          start: '2019-01-03',
          color: 'green'
        },
        {
          title: 'New Year',
          details: 'Eat chocolate until you pass out',
          start: '2019-01-01',
          color: 'purple'
        },
        {
          title: 'Conference',
          details: 'Mute myself the whole time and wonder why I am on this call',
          start: '2019-01-21',
          color: 'orange'
        },
        {
          title: 'Hackathon',
          details: 'Code like there is no tomorrow',
          start: '2019-02-01',
          color: 'pink'
        }
      ]
    }
  }
}

Navigation.add(Page6)