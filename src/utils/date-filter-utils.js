export class DateFilterUtils {
    static getCurrentDate() {
        const today = new Date();
        this.dateFrom = today.toISOString().slice(0, 10);
        this.dateTo = today.toISOString().slice(0, 10);

        return {
            from: this.dateFrom,
            to: this.dateTo
        }
    }

    static toggleFilterButtonsHandler(e, filterButtons, inputs) {
        inputs.forEach(input => {
            input.value = '';
            input.type = 'text';
            input.style.width = '63px';
        });

        filterButtons.forEach(button => {
            button.classList.remove('active');
            e.currentTarget.classList.add('active');

            if (button.id === "week-operations" && button.classList.contains('active')) {
                const weekAgo = new Date().setDate(new Date().getDate() - 7);
                this.dateFrom = new Date(weekAgo).toISOString().slice(0, 10);
            } else if (button.id === "month-operations" && button.classList.contains('active')) {
                const monthAgo = new Date().setMonth(new Date().getMonth() - 1);
                this.dateFrom = new Date(monthAgo).toISOString().slice(0, 10);
            } else if (button.id === "year-operations" && button.classList.contains('active')) {
                const yearAgo = new Date().setFullYear(new Date().getFullYear() - 1);
                this.dateFrom = new Date(yearAgo).toISOString().slice(0, 10);
            } else if (button.id === "all-operations" && button.classList.contains('active')) {
                this.dateFrom = new Date('January 01, 1000').toISOString().slice(0, 10);
            }
        });

        return {
            from: this.dateFrom,
            to: this.dateTo
        }
    }
}
