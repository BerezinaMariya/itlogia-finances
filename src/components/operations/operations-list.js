import {OperationsService} from "../../services/operations-service";
import {DatepickerInputUtils} from "../../utils/datepicker-input-utils";
import {DateFilterUtils} from "../../utils/date-filter-utils";
import {ShowOperationsRecordsUtils} from "../../utils/show-operations-records-utils";
import {CategoriesService} from "../../services/categories-service";

export class OperationsList {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        DatepickerInputUtils.changeInputType();

        this.findElements();
        this.init();

        this.getOperations(DateFilterUtils.getCurrentDate()).then();
    }

    findElements() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.startDateInputElement = document.getElementById('start-date-input');
        this.endDateInputElement = document.getElementById('end-date-input');
    }

    init() {
        this.inputs = [this.startDateInputElement, this.endDateInputElement];

        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.getOperations(DateFilterUtils.toggleFilterButtonsHandler(e, this.filterButtons, this.inputs)).then();
            });
        });

        this.inputs.forEach(input => {
            input.addEventListener('change', () => {
                if (this.startDateInputElement.value && this.endDateInputElement.value
                    && parseInt(this.startDateInputElement.value[0]) !== 0 && parseInt(this.endDateInputElement.value[0]) !== 0) {
                    this.filterButtons.forEach(button => {
                        button.classList.remove('active');
                    });
                    this.getOperations({from: this.startDateInputElement.value, to: this.endDateInputElement.value}).then();
                }
            });
        });
    }

    async getOperations(filterDate) {
        const response = await OperationsService.getOperations(filterDate);

        if (response.error) {
            alert(response.error);
            return response.redirect ? this.openNewRoute(response.redirect) : null;
        }

        await ShowOperationsRecordsUtils.showRecords(response.operations);
    }
}
