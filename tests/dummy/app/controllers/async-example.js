import { later } from '@ember/runloop';
import Controller from '@ember/controller';

export default Controller.extend({
  wizardShowNextStep: true,

  loading: false,

  init() {
    this._super(...arguments);
    this.set('wizardData', [
      { step_id: 1, header_label: '1. First Step', hasAction: true },
      { step_id: 2, header_label: '2. Second Step' },
      { step_id: 3, header_label: '3. Third Step' },
    ]);
  },

  actions: {
    cancelAction() {},

    submitAction() {},

    wizardStepChanged(wizardStep) {
      this.set('loading', true);
      if (wizardStep.step_id === '1') {
        later(() => {
          this.set('wizardShowNextStep', true);
          this.set('loading', false);
        }, 2000);
      }
    },
  },
});
