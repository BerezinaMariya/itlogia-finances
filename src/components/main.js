import {DatepickerInputUtils} from "../utils/datepicker-input-utils";
import {Chart} from "chart.js/auto";

export class Main {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        DatepickerInputUtils.changeInputType();
        this.initCanvases();
    }

    initCanvases() {
        this.addCanvas('income-chart');
        this.addCanvas('expense-chart');
    }

    addCanvas(canvasId) {
        //pie
        const labelValues = ["Red", "Orange", "Yellow", "Green", "Blue"];
        const sectorValues = [55, 49, 44, 24, 50];
        const barColors = [
            "#DC3545",
            "#FD7E14",
            "#FFC107",
            "#20C997",
            "#0D6EFD"
        ];

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
            data: {
                labels: labelValues,
                datasets: [{
                    backgroundColor: barColors,
                    data: sectorValues,
                }]
            },
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

        new Chart(canvasId, chartConfig);
    }
}
