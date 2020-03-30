/* eslint ember/no-observers: "off" */

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
      date: this.date || null,
      daysOfWeekDisabled: this.daysOfWeekDisabled || defaults.daysOfWeekDisabled,
      disabledDates: this.disabledDates || defaults.disabledDates,
      disabledHours: this.disabledHours || defaults.disabledHours,
      enabledDates: this.enabledDates || defaults.enabledDates,
      enabledHours: this.enabledHours || defaults.enabledHours,
      focusOnShow: this.focusOnShow || defaults.focusOnShow,
      format: this.format || defaults.format,
      ignoreReadonly: this.ignoreReadonly || defaults.ignoreReadonly,
      locale: this.locale || defaults.locale,
      maxDate: this.maxDate || defaults.maxDate,
      minDate: this.minDate || defaults.minDate,
      showClear: this.showClear || defaults.showClear,
      showClose: this.showClose || defaults.showClose,
      showTodayButton: this.showTodayButton || defaults.showTodayButton,
      sideBySide: this.sideBySide || defaults.sideBySide,
      timeZone: this.timeZone || defaults.timeZone,
      useCurrent: this.useCurrent || false,
      viewDate: this.viewDate || defaults.viewDate,
      viewMode: this.viewMode || defaults.viewMode,
      widgetPositioning: this.widgetPositioning || defaults.widgetPositioning
    }).on('dp.change', function(e) {
      let date = e.date && e.date.toDate() || null;

      if (typeof self.get('changed') === 'function') {
        self.get('changed')(date);
      }
    });

    this.addObserver('date', function() {
      $(this.element).data('DateTimePicker').date(this.date || null);
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
