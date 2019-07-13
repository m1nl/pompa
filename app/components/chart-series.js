import { scheduleOnce } from '@ember/runloop';
import { observer } from '@ember/object';
import { isBlank, isEqual } from '@ember/utils';
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
  updateComponent: function() {
    let context = this.element.getContext('2d');
    this.set('chart', new Chart(context, defaultOptions));
  },
  updateChart: function() {
    this.chart.update(0);
  },
  didInsertElement: function() {
    this._super(...arguments);
    scheduleOnce('afterRender', this, 'updateComponent');
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

    scheduleOnce('afterRender', this, 'updateChart');
  },
  updateData: function() {
    let datasets = this.chart.data.datasets || [];
    let data = this.data || [];

    for (let i = 0; i < datasets.length; i++) {
      let seriesData = [];

      if (i < data.length) {
        seriesData = data[i];
      }

      datasets[i].data = seriesData;
    }

    scheduleOnce('afterRender', this, 'updateChart');
  },
  updateSeries: function() {
    let datasets = this.chart.data.datasets || [];
    let series = this.series || [];

    if (datasets.length === series.length) {
      let seriesDiffer = false;

      for (let i = 0; i < series.length; i++) {
        if (!isEqual(datasets[i].label, series[i])) {
          seriesDiffer = true;
          break;
        }
      }

      if (!seriesDiffer) {
        return;
      }
    }

    datasets = []

    let palette = Palette('tol', series.length).map(function(hex) {
      return '#' + hex;
    });

    for (let i = 0; i < series.length; i++) {
      datasets.push({
        label: series[i],
        fill: true,
        borderColor: palette[i],
        data: [],
      });
    }

    this.chart.data = { labels: [], datasets: datasets };

    scheduleOnce('render', this, 'updateData');
    scheduleOnce('afterRender', this, 'updateChart');
  },
  optionsObserver: observer('timeUnit', 'xLabel', 'yLabel', 'xMin', 'xMax', function() {
    scheduleOnce('render', this, 'updateOptions');
  }),
  dataObserver: observer('data', function() {
    scheduleOnce('render', this, 'updateData');
  }),
  seriesObserver: observer('series', function() {
    scheduleOnce('render', this, 'updateSeries');
  }),
});
