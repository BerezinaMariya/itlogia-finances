import {CategoriesService} from "../../services/categories-service";
import {ValidationUtils} from "../../utils/validation-utils";
import {OperationsService} from "../../services/operations-service";
import {GetCategoriesListUtils} from "../../utils/get-categories-list-utils";
import {DatepickerInputUtils} from "../../utils/datepicker-input-utils";
import {SelectOptionsUtils} from "../../utils/select-options-utils";

export class OperationsCreate {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        DatepickerInputUtils.changeInputType();
        SelectOptionsUtils.changeOptionTextColor();

        this.findElements();

        this.validations = [
            {element: this.categoryTypeSelect},
            {element: this.categorySelect},
            {element: this.amountInputElement},
            {element: this.dateInputElement}
        ];

        this.init();
    }

    findElements() {
        this.categoryTypeSelect = document.getElementById('category-type-select');
        this.categorySelect = document.getElementById('category-select');
        this.amountInputElement = document.getElementById('amount-input');
        this.dateInputElement = document.getElementById('date-input');
        this.commentInputElement = document.getElementById('comment-input');
    }

    init() {
        this.categoryTypeSelect.addEventListener('change', (e) => {
            this.getCategoriesList(e).then();
            SelectOptionsUtils.changeOptionTextColor();
        });
        this.categorySelect.addEventListener('change', SelectOptionsUtils.changeOptionTextColor);
        document.getElementById('save-button').addEventListener('click', this.saveOperation.bind(this));
    }

    async getCategoriesList(e) {
        const response = await CategoriesService.getCategories(e.target.value);
        await GetCategoriesListUtils.getCategoriesList(response);
    }

    async saveOperation(e) {
        e.preventDefault();

        if (ValidationUtils.validateForm(this.validations)) {
            const createData = {
                type: this.categoryTypeSelect.value,
                amount: parseInt(this.amountInputElement.value),
                date: this.dateInputElement.value.split('.').reverse().join('-'),
                comment: this.commentInputElement.value,
                category_id: parseInt(this.categorySelect.value)
            }

            const response = await OperationsService.createOperation(createData);

            if (response.error) {
                alert(response.error);
                return response.redirect ? this.openNewRoute(response.redirect) : null;
            }

            return this.openNewRoute('/operations');
        }
    }

}
