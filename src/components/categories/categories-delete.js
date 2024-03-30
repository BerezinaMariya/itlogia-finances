import {CategoriesService} from "../../services/categories-service";
import {UrlUtils} from "../../utils/url-utils";

export class CategoriesDelete {
    constructor(openNewRoute, categories) {
        this.openNewRoute = openNewRoute;
        this.categories = categories;

        const id = UrlUtils.getUrlParam('id');
        if (!id) {
            return this.openNewRoute('/');
        }

         this.deleteCategory(id).then();
    }

    async deleteCategory(id) {
        const response = await CategoriesService.deleteCategory(id, this.categories);

        if (response.error) {
            alert(response.error);
            return response.redirect ? this.openNewRoute(response.redirect) : null;
        }

        return this.openNewRoute('/' + this.categories);
    }
}
