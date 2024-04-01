export class DateFilterUtils {
    static toggleFilterButtonsHandler(e, filterButtons, inputs) {
        inputs.forEach(input => {
            input.value = '';
            input.type = 'text';
            input.style.width = '63px';
        });

        filterButtons.forEach(button => {
            button.classList.remove('active');
            e.currentTarget.classList.add('active');

            if (button.id === "today-operations" && button.classList.contains('active')) {
                this.period = '';
            } else if (button.id === "week-operations" && button.classList.contains('active')) {
                this.period = 'week';
            } else if (button.id === "month-operations" && button.classList.contains('active')) {
                this.period = 'month';
            } else if (button.id === "year-operations" && button.classList.contains('active')) {
                this.period = 'year';
            } else if (button.id === "all-operations" && button.classList.contains('active')) {
                this.period = 'all';
            }
        });

        return {period: this.period};
    }
}
