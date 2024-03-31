import {DatepickerInputUtils} from "../utils/datepicker-input-utils";
import {Chart} from "chart.js/auto";
import {DateFilterUtils} from "../utils/date-filter-utils";
import {OperationsService} from "../services/operations-service";

export class Main {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        DatepickerInputUtils.changeInputType();

        this.findElements();
        this.init();

        this.getOperations(DateFilterUtils.getCurrentDate()).then();
        this.initCanvases();
    }

    init() {
        const inputs = [this.startDateInputElement, this.endDateInputElement];

        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.getOperations(DateFilterUtils.toggleFilterButtonsHandler(e, this.filterButtons, inputs)).then();
            });
        });

        inputs.forEach(input => {
            input.addEventListener('change', () => {
                if (this.startDateInputElement.value && this.endDateInputElement.value
                    && parseInt(this.startDateInputElement.value[0]) !== 0 && parseInt(this.endDateInputElement.value[0]) !== 0) {
                    this.filterButtons.forEach(button => {
                        button.classList.remove('active');
                    });
                    this.getOperations({
                        from: this.startDateInputElement.value,
                        to: this.endDateInputElement.value
                    }).then();
                }
            });
        });
    }

    findElements() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.startDateInputElement = document.getElementById('start-date-input');
        this.endDateInputElement = document.getElementById('end-date-input');
    }

    initCanvases() {
        this.incomeChart = this.addCanvas('income-chart');
        this.expenseChart = this.addCanvas('expense-chart');
    }

    async getOperations(filterDate) {
        const response = await OperationsService.getOperations(filterDate);

        if (response.error) {
            alert(response.error);
            return response.redirect ? this.openNewRoute(response.redirect) : null;
        }

        this.setChartData(response.operations);
    }

    setChartData(operations) {
        this.incomeSectorValues = [];
        this.expenseSectorValues = [];
        this.incomeLabelValues = [];
        this.expenseLabelValues = [];

        const barColors = ["#DC3545", "#FD7E14", "#FFC107", "#20C997", "#0D6EFD", "#dc35a7", "#fda014", "#deff07", "#4ac920", "#0db5fd"];

        operations.forEach(operation => {
            if (operation.type === 'income') {
                this.incomeSectorValues.push(operation.amount);
                this.incomeLabelValues.push(operation.category);
            } else {
                this.expenseSectorValues.push(operation.amount);
                this.expenseLabelValues.push(operation.category);
            }
        });

        const chartData = (chartId) => {
            return {
                labels: chartId === 'income-chart' ? this.incomeLabelValues : this.expenseLabelValues,
                datasets: [{
                    backgroundColor: barColors,
                    data: chartId === 'income-chart' ? this.incomeSectorValues : this.expenseSectorValues,
                }]
            };
        }

        const updateChartConfig = (chart) => {
            chart.data = chartData(chart.canvas.id);
            chart.update();
        }

        updateChartConfig(this.incomeChart);
        updateChartConfig(this.expenseChart);
    }

    addCanvas(canvasId) {
        //pie
        const paddingBelowLegends = {
            id: 'paddingBelowLegends',
            beforeInit(chart) {
                // Get a reference to the original fit function
                const originalFit = chart.legend.fit;

                // Override the fit function
                chart.legend.fit = function fit() {
                    // Call the original function and bind scope in order to use `this` correctly inside it
                    originalFit.bind(chart.legend)();
                    // Change the height as suggested in other answers
                    this.height += 40;
                }
            }
        }

        const chartConfig = {
            type: "pie",
            options: {
                responsive: true,
                plugins: {
                    paddingBelowLegends: 40,
                    legend: {
                        display: true,
                        afterFit: 40,
                        labels: {
                            boxWidth: 35,
                            font: {
                                size: 14,
                                family: 'Roboto, sans-serif',
                                weight: 500,
                            },
                            color: '#000000',
                            padding: 12,
                            textAlign: 'left'
                        },
                    },
                    title: {
                        display: true,
                        font: {
                            size: 28,
                            family: 'Roboto, sans-serif',
                            weight: 500,
                        },
                        color: '#052C65',
                        text: canvasId === 'income-chart' ? 'Доходы' : 'Расходы'
                    },
                }
            },
            plugins: [paddingBelowLegends]
        };

        return new Chart(canvasId, chartConfig);
    }
}
