import { later } from '@ember/runloop';
import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  tagName: '',
  currentStep: 1,

  showHeader: true,

  showWell: true,

  animate: true,

  animationDuration: 300,

  isAnimating: false,

  direction: null,

  previousBtnLabel: computed('buttonLabels.prevLabel', function () {
    return this.buttonLabels?.prevLabel ?? 'Previous';
  }),

  nextBtnLabel: computed('buttonLabels.nextLabel', function () {
    return this.buttonLabels?.nextLabel ?? 'Next';
  }),

  cancelBtnLabel: computed('buttonLabels.cancelLabel', function () {
    return this.buttonLabels?.cancelLabel ?? 'Cancel';
  }),

  finishBtnLabel: computed('buttonLabels.finishLabel', function () {
    return this.buttonLabels?.finishLabel ?? 'Finish';
  }),

  wellClass: computed('showWell', function () {
    return this.showWell ? 'well' : '';
  }),

  isLastStep: computed('currentStep', 'wizardData.length', function () {
    return this.currentStep === this.wizardData?.length;
  }),

  isFirstStep: computed.equal('currentStep', 1),

  init() {
    this._super(...arguments);
    if (!this.buttonLabels) {
      this.set('buttonLabels', {
        prevLabel: 'Previous',
        nextLabel: 'Next',
        finishLabel: 'Finish',
        cancelLabel: 'Cancel',
      });
    }
  },

  didUpdateAttrs() {
    this._super(...arguments);

    if (this.wizardShowNextStep) {
      this.changeWizardStep('next');
    }
  },

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
      currentStep = this.currentStep + 1;
    } else {
      currentStep = this.currentStep - 1;
    }
    this.set('currentStep', currentStep);
  },

  actions: {
    incrementStep() {
      if (this.isLastStep) {
        this.submitAction?.();
      } else {
        let currentStepObj = this.wizardData.find(
          (item) => item.step_id === this.currentStep
        );

        if (currentStepObj.hasAction) {
          this.set('wizardShowNextStep', false);
          this.wizardStepChangeAction?.(currentStepObj);
        } else {
          this.changeWizardStep('next');
        }
      }
    },

    decrementStep() {
      if (this.isFirstStep) {
        this.cancelAction?.();
      } else {
        this.changeWizardStep('prev');
      }
    },

    deleteAction() {
      this.deleteAction?.();
    },
  },
});
