import {CategoriesService} from "../../services/categories-service";
import {ValidationUtils} from "../../utils/validation-utils";
import {OperationsService} from "../../services/operations-service";
import {GetCategoriesListUtils} from "../../utils/get-categories-list-utils";

export class OperationsCreate {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

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
        this.categoryTypeSelect.addEventListener('change', this.getCategoriesList);
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
