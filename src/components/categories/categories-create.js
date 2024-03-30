import {CategoriesService} from "../../services/categories-service";
import {ValidationUtils} from "../../utils/validation-utils";

export class CategoriesCreate {
    constructor(openNewRoute, categories) {
        this.openNewRoute = openNewRoute;
        this.categories = categories;

        this.findElements();

        document.getElementById('save-button').addEventListener('click', this.saveIncome.bind(this));
    }

    findElements() {
        this.categoryTitleInputElement = document.getElementById('category-title-input');
    }

    async saveIncome() {
        const createData = {
            title: this.categoryTitleInputElement.value,
        }

        if (this.categoryTitleInputElement.value)  {
            const response = await CategoriesService.createCategory(createData, this.categories);

            if (response.error) {
                alert(response.error);
                return response.redirect ? this.openNewRoute(response.redirect) : null;
            }

            return this.openNewRoute('/' + this.categories);
        }
    }

}
