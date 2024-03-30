export class DatepickerInputUtils {
    static changeInputType() {
        document.querySelectorAll('.datepicker-input').forEach(input => {
            input.onblur = function() {
                input.value === '' ? input.type = 'text' : input.type = 'date';

                if (input.classList.contains('tab-input')) {
                    input.value === '' ? input.style.width = '63px' : input.style.width = 'max-content';
                }
            };

            input.onfocus = function() {
                input.type = 'date';
                if (input.classList.contains('tab-input')) {
                    input.style.width = 'max-content';
                }
            }
        });
    }
}
