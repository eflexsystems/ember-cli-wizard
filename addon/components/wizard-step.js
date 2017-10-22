import { isPresent } from '@ember/utils';
import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
    tagName: '',

    isCurrent: computed('wizardCurrentState.currentStep', function() {
        if (isPresent(this.get('wizardCurrentState'))) {
            if (this.get('stepId') === this.get('wizardCurrentState.currentStep')) {
                return true;
            }
        }

        return false;
    }),

    slidingOut: computed('wizardCurrentState.animating', function() {
        if (isPresent(this.get('wizardCurrentState'))) {
            if (this.get('isCurrent') && this.get('wizardCurrentState.animating')) {
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
        let wizardCurrentState = this.get('wizardCurrentState');
        if (isPresent(wizardCurrentState)) {
            if (wizardCurrentState.direction === 'next') {
                let nextStepId = Number(wizardCurrentState.currentStep) + 1;
                if (Number(this.get('stepId')) === nextStepId) {
                    this.set('slidingInClasses', 'enter slide-left');
                    return true;
                }
            } else {
                let prevStepId = Number(wizardCurrentState.currentStep) - 1;
                if (Number(this.get('stepId')) === prevStepId) {
                    this.set('slidingInClasses', 'enter slide-right');
                    return true;
                }
            }
        }

        return false;
    })
});
