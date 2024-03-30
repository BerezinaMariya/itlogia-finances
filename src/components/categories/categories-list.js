import {CategoriesService} from "../../services/categories-service";
import {ShowCategoriesRecordsUtils} from "../../utils/show-categories-records-utils";

export class CategoriesList {
    constructor(openNewRoute, categories) {
        this.openNewRoute = openNewRoute;
        this.categories = categories;
        this.getCategories().then();
    }

    async getCategories() {
        const response = await CategoriesService.getCategories(this.categories);

        if (response.error) {
            alert(response.error);
            return response.redirect ? this.openNewRoute(response.redirect) : null;
        }

        ShowCategoriesRecordsUtils.showRecords(response.categories, this.categories);
    }
}
