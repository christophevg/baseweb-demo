var LineChartDemo = {
  template : `
<PageWithStatus>
  <PageWithBanner>

    <h1>Line Chart</h1>

    <v-card>
      <v-card-text>
        <LineChart :chartData="chartdata" :options="options"/>
      </v-card-text>
    </v-card>     
  
    <v-card>
      <v-card-text>
        <v-layout justify-center row>
          <v-btn @click="add_random_data()">add a data point</v-btn>
          <v-btn @click="toggle_adding()">{{ toggle_label }} adding data points</v-btn>
        </v-layout>
      </v-card-text>
    </v-card>     

    <v-card>
      <v-card-text>
        <div style="margin:20px">
          <code>data</code>
          <div style="margin-top:20px" v-html="$options.filters.syntaxHighlight(data, 800)"></div>
        </div>
      </v-card-text>
    </v-card>     

  </PageWithBanner>
</PageWithStatus>
`,
  navigation: {
    section: "Components",
    icon:    "extension",
    text:    "LineChart",
    path:    "/components/LineChart"
  },
  methods: {
    add_random_data: function() {
      var num = Math.floor(Math.random() * (100 - 5 + 1) + 5);
      this.data.shift()
      this.data.push(num);
    },
    toggle_adding: function() {
      if(this.adding) {
        clearInterval(this.adding);
        this.adding = false;
        this.toggle_label = "start";
      } else {
        this.add_random_data();
        this.adding = setInterval(this.add_random_data, 1500);
        this.toggle_label = "stop";
      }
    }
  },
  computed: {
    chartdata: function() {
      return {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July"
        ],
        datasets: [
          {
            label: "My Data",
            backgroundColor: "#f87979",
            data: this.data
          }
        ]
      }
    }
  },
  data: function() {
    return {
      adding: false,
      toggle_label: "start",
      data: [40, 39, 10, 40, 39, 80, 40],
      options: {
        legend: {
          display: true
        }
      }
    }
  }
};

Navigation.add(LineChartDemo);
