import { isPresent } from '@ember/utils';
import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
    tagName: '',

    isCurrent: computed('wizardCurrentState.currentStep', function() {
        if (isPresent(this.wizardCurrentState)) {
            if (this.stepId === this.get('wizardCurrentState.currentStep')) {
                return true;
            }
        }

        return false;
    }),

    slidingOut: computed('wizardCurrentState.animating', function() {
        if (isPresent(this.wizardCurrentState)) {
            if (this.isCurrent && this.get('wizardCurrentState.animating')) {
                if (this.get('wizardCurrentState.direction') === 'next') {
                    this.set('slidingInClasses', 'exit slide-left');
                } else {
                    this.set('slidingInClasses', 'exit slide-right');
                }

                return true;
            }
        }

        return false;
    }),

    slidingIn: computed('wizardCurrentState.animating', function() {
        let wizardCurrentState = this.wizardCurrentState;
        if (isPresent(wizardCurrentState)) {
            if (wizardCurrentState.direction === 'next') {
                let nextStepId = Number(wizardCurrentState.currentStep) + 1;
                if (Number(this.stepId) === nextStepId) {
                    this.set('slidingInClasses', 'enter slide-left');
                    return true;
                }
            } else {
                let prevStepId = Number(wizardCurrentState.currentStep) - 1;
                if (Number(this.stepId) === prevStepId) {
                    this.set('slidingInClasses', 'enter slide-right');
                    return true;
                }
            }
        }

        return false;
    })
});
