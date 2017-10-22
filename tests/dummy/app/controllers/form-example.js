import Controller from '@ember/controller';

export default Controller.extend({

    wizardData: [
        {'step_id': '1', 'header_label': '1. Account'},
        {'step_id': '2', 'header_label': '2. Profile'},
        {'step_id': '3', 'header_label': '3. Address'}
    ],

    actions: {

        cancelAction() {
        },

        submitAction() {
        }

    }
});
