import {GetCategoriesListUtils} from "../../utils/get-categories-list-utils";
import {UrlUtils} from "../../utils/url-utils";
import {OperationsService} from "../../services/operations-service";
import {ValidationUtils} from "../../utils/validation-utils";
import {CategoriesService} from "../../services/categories-service";
import {DatepickerInputUtils} from "../../utils/datepicker-input-utils";
import {SelectOptionsUtils} from "../../utils/select-options-utils";

export class OperationsEdit {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        DatepickerInputUtils.changeInputType();

        const id = UrlUtils.getUrlParam('id');
        if (!id) {
            return this.openNewRoute('/');
        }

        this.getOperation(id).then();
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
        document.getElementById('save-button').addEventListener('click', this.updateOperation.bind(this));
    }

    async getCategoriesList(e) {
        const response = await CategoriesService.getCategories(e.target.value);
        await GetCategoriesListUtils.getCategoriesList(response);
    }

    async getOperation(id) {
        const response = await OperationsService.getOperation(id);

        if (response.error) {
            alert(response.error);
            return response.redirect ? this.openNewRoute(response.redirect) : null;
        }

        this.operationOriginalData = response.operation;

        const getCategoriesResponse = await CategoriesService.getCategories(response.operation.type);
        await GetCategoriesListUtils.getCategoriesList(getCategoriesResponse);

        this.showOperation(response.operation);
        SelectOptionsUtils.changeOptionTextColor();
    }

    showOperation(operation) {
        this.categoryTypeSelect.value = operation.type;
        this.categorySelect.value = operation.category;
        this.amountInputElement.value = operation.amount;
        this.dateInputElement.value = operation.date;
        this.commentInputElement.value = operation.comment;

        for (let i = 0; i < this.categoryTypeSelect.options.length; i++) {
            if (this.categoryTypeSelect.options[i].value === operation.type) {
                this.categoryTypeSelect.selectedIndex = i;
            }
        }

        for (let i = 0; i < this.categorySelect.options.length; i++) {
            if (this.categorySelect.options[i].innerText === operation.category) {
                this.categorySelect.selectedIndex = i;
            }
        }
    }

    async updateOperation(e) {
        e.preventDefault();

        if (ValidationUtils.validateForm(this.validations)) {
            const changedData = {
                type: this.categoryTypeSelect.value,
                amount: parseInt(this.amountInputElement.value),
                date: this.dateInputElement.value.split('.').reverse().join('-'),
                comment: this.commentInputElement.value,
                category_id: parseInt(this.categorySelect.value)
            };

            const response = await OperationsService.updateOperation(this.operationOriginalData.id, changedData);

            if (response.error) {
                alert(response.error);
                return response.redirect ? this.openNewRoute(response.redirect) : null;
            }

            return this.openNewRoute('/operations');
        }
    }
}
