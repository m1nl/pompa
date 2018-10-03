import { scheduleOnce } from '@ember/runloop';
import { observer } from '@ember/object';
import { isBlank } from '@ember/utils';
import Component from '@ember/component';
import Moment from 'moment';
import Chart from 'chart-js';
import Palette from 'palette';

const defaultOptions = {
  type: 'line',
  options: {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: true,
      position: 'bottom',
    },
    tooltips: {
      enabled: false,
    },
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          bounds: 'ticks',
          unit: 'hour',
          round: 'hour',
          min: Moment(0),
          max: Moment(),
          displayFormats: {
            day: 'YYYY-MM-DD',
            hour: 'HH:mm',
            minute: 'HH:mm',
          }
        },
        scaleLabel: {
          display: false,
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
        },
        scaleLabel: {
          display: false,
        }
      }]
    }
  }
};

export default Component.extend({
  tagName: 'canvas',
  timeUnit: 'hour',
  xMin: Moment(0),
  xMax: Moment(),
  xLabel: '',
  yLabel: '',
  legendPosition: 'bottom',
  setup: function() {
    let context = this.element.getContext('2d');
    this.set('chart', new Chart(context, defaultOptions));
  },
  updateChart: function() {
    this.chart.update(0);
  },
  didInsertElement: function() {
    this._super(...arguments);
    this.setup();
  },
  updateOptions: function() {
    let options = this.chart.options;

    options.legend.position = this.legendPosition;

    options.scales.xAxes[0].time.unit = this.timeUnit;
    options.scales.xAxes[0].time.round = this.timeUnit;
    options.scales.xAxes[0].time.min = this.xMin;
    options.scales.xAxes[0].time.max = this.xMax;

    options.scales.xAxes[0].scaleLabel.display = !isBlank(this.xLabel);
    options.scales.xAxes[0].scaleLabel.labelString = this.xLabel;

    options.scales.yAxes[0].scaleLabel.display = !isBlank(this.yLabel);
    options.scales.yAxes[0].scaleLabel.labelString = this.yLabel;
  },
  updateData: function() {
    let series = this.series;
    let data = this.data;

    let datasets = [];

    if (series && data) {
      let palette = Palette('tol', series.length).map(function(hex) {
        return '#' + hex;
      });

      for (let i = 0; i < series.length; i++) {
        datasets.push({
          label: series[i],
          fill: true,
          borderColor: palette[i],
          data: data[i],
        });
      }
    }

    this.chart.data = { labels: [], datasets: datasets };
  },
  optionsObserver: observer('timeUnit', 'xLabel', 'yLabel', 'xMin', 'xMax', function() {
    this.updateOptions();
    scheduleOnce('afterRender', this, 'updateChart');
  }),
  dataObserver: observer('series', 'data', function() {
    this.updateData();
    scheduleOnce('afterRender', this, 'updateChart');
  }),
});
