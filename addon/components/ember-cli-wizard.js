import { later } from '@ember/runloop';
import { isPresent } from '@ember/utils';
import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  tagName: '',
  currentStep: '1',

  showHeader: true,

  showWell: true,

  previousBtnLabel: computed('buttonLabels.prevLabel', function () {
    if (isPresent(this.get('buttonLabels.prevLabel'))) {
      return this.get('buttonLabels.prevLabel');
    }

    return 'Previous';
  }),

  nextBtnLabel: computed('buttonLabels.nextLabel', function () {
    if (isPresent(this.get('buttonLabels.nextLabel'))) {
      return this.get('buttonLabels.nextLabel');
    }

    return 'Next';
  }),

  cancelBtnLabel: computed('buttonLabels.cancelLabel', function () {
    if (isPresent(this.get('buttonLabels.cancelLabel'))) {
      return this.get('buttonLabels.cancelLabel');
    }

    return 'Cancel';
  }),

  finishBtnLabel: computed('buttonLabels.finishLabel', function () {
    if (isPresent(this.get('buttonLabels.finishLabel'))) {
      return this.get('buttonLabels.finishLabel');
    }

    return 'Finish';
  }),

  buttonLabels: {
    prevLabel: 'Previous',
    nextLabel: 'Next',
    finishLabel: 'Finish',
    cancelLabel: 'Cancel',
  },

  wellClass: computed('showWell', function () {
    if (this.showWell === true) {
      return 'well';
    }

    return '';
  }),

  animate: true,

  animationDuration: 300,

  isAnimating: false,

  direction: null,

  didUpdateAttrs() {
    this._super(...arguments);

    if (this.wizardShowNextStep === true) {
      this.changeWizardStep('next');
    }
  },

  isLastStep: computed('currentStep', 'wizardData.length', function () {
    if (Number(this.currentStep) === this.get('wizardData.length')) {
      return true;
    }

    return false;
  }),

  isFirstStep: computed('currentStep', function () {
    if (Number(this.currentStep) === 1) {
      return true;
    }

    return false;
  }),

  changeWizardStep(direction) {
    if (this.animate) {
      if (this.isAnimating) {
        return false;
      }
      this.set('isAnimating', true);
    }

    this.set('direction', direction);

    if (this.animate) {
      // Stop the animation after a while
      later(
        this,
        function () {
          this._updateCurrentStep(direction);
          this.set('isAnimating', false);
        },
        this.animationDuration
      );
    } else {
      this._updateCurrentStep(direction);
    }
  },

  _updateCurrentStep(direction) {
    let currentStep;
    if (direction === 'next') {
      currentStep = Number(this.currentStep) + 1 + '';
    } else {
      currentStep = Number(this.currentStep) - 1 + '';
    }
    this.set('currentStep', currentStep);
  },

  actions: {
    incrementStep() {
      if (this.isLastStep) {
        // perform submit action
        this.sendAction('submitAction');
      } else {
        let currentStepObj = this.wizardData.find((item) => {
          if (item['step_id'] === this.currentStep) {
            return true;
          }
        });

        if (
          isPresent(currentStepObj['hasAction']) &&
          currentStepObj['hasAction'] === true
        ) {
          this.set('wizardShowNextStep', false);
          this.sendAction('wizardStepChangeAction', currentStepObj);
        } else {
          this.changeWizardStep('next');
        }
      }
    },

    decrementStep() {
      if (this.isFirstStep) {
        this.sendAction('cancelAction');
      } else {
        this.changeWizardStep('prev');
      }
    },

    deleteAction() {
      this.sendAction('deleteAction');
    },
  },
});
