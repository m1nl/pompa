import Component from '@ember/component';
import $ from 'jquery';

const {
  defaults
} = $.fn.datetimepicker;

export default Component.extend({
  placeholder: '',
  openOnFocus: false,
  didInsertElement: function() {
    this._super(...arguments);

    let self = this;

    $(this.element).datetimepicker({
      date: this.getWithDefault('date', null),
      daysOfWeekDisabled: this.getWithDefault('daysOfWeekDisabled', defaults.daysOfWeekDisabled),
      disabledDates: this.getWithDefault('disabledDates', defaults.disabledDates),
      disabledHours: this.getWithDefault('disabledHours', defaults.disabledHours),
      enabledDates: this.getWithDefault('enabledDates', defaults.enabledDates),
      enabledHours: this.getWithDefault('enabledHours', defaults.enabledHours),
      focusOnShow: this.getWithDefault('focusOnShow', defaults.focusOnShow),
      format: this.getWithDefault('format', defaults.format),
      ignoreReadonly: this.getWithDefault('ignoreReadonly', defaults.ignoreReadonly),
      locale: this.getWithDefault('locale', defaults.locale),
      maxDate: this.getWithDefault('maxDate', defaults.maxDate),
      minDate: this.getWithDefault('minDate', defaults.minDate),
      showClear: this.getWithDefault('showClear', defaults.showClear),
      showClose: this.getWithDefault('showClose', defaults.showClose),
      showTodayButton: this.getWithDefault('showTodayButton', defaults.showTodayButton),
      sideBySide: this.getWithDefault('sideBySide', defaults.sideBySide),
      timeZone: this.getWithDefault('timeZone', defaults.timeZone),
      useCurrent: this.getWithDefault('useCurrent', false),
      viewDate: this.getWithDefault('viewDate', defaults.viewDate),
      viewMode: this.getWithDefault('viewMode', defaults.viewMode),
      widgetPositioning: this.getWithDefault('widgetPositioning', defaults.widgetPositioning)
    }).on('dp.change', function(e) {
      let date = e.date && e.date.toDate() || null;

      if (typeof self.get('changed') === 'function') {
        self.get('changed')(date);
      }
    });

    this.addObserver('date', function() {
      $(this.element).data('DateTimePicker').date(this.getWithDefault('date', null));
    });

    this.addObserver('maxDate', function() {
      $(this.element).data('DateTimePicker').maxDate(this.maxDate);
    });

    this.addObserver('minDate', function() {
      $(this.element).data('DateTimePicker').minDate(this.minDate);
    });

    this.addObserver('locale', function() {
      $(this.element).data('DateTimePicker').locale(this.locale);
    });

    this.addObserver('format', function() {
      $(this.element).data('DateTimePicker').format(this.format);
    });

    this.addObserver('viewMode', function() {
      $(this.element).data('DateTimePicker').viewMode(this.viewMode);
    });

    this.addObserver('timeZone', function() {
      $(this.element).data('DateTimePicker').timeZone(this.timeZone);
    });
  },
  willDestroyElement: function() {
    this._super(...arguments);

    this.removeObserver('date');
    this.removeObserver('maxDate');
    this.removeObserver('minDate');
    this.removeObserver('locale');
    this.removeObserver('format');
    this.removeObserver('viewMode');
    this.removeObserver('timeZone');

    // Running the `ember` application embedded might cause the DOM to be cleaned before
    let dateTimePicker = $(this.element).data('DateTimePicker');
    if (dateTimePicker) {
      dateTimePicker.destroy();
    }
  },
  actions: {
    focus: function() {
      if (this.openOnFocus) {
        $(this.element).data('DateTimePicker').show();
      }
    },
  },
});
