import {UrlUtils} from "../../utils/url-utils";
import {CategoriesService} from "../../services/categories-service";

export class CategoriesEdit {
    constructor(openNewRoute, categories) {
        this.openNewRoute = openNewRoute;
        this.categories = categories;

        const id = UrlUtils.getUrlParam('id');
        if (!id) {
            return this.openNewRoute('/');
        }

        document.getElementById('update-button').addEventListener('click', this.updateCategory.bind(this));

        this.findElements();
        this.getCategory(id).then();
    }

    findElements() {
        this.categoryTitleInputElement = document.getElementById('category-title-input');
    }

    async getCategory(id) {
        const response = await CategoriesService.getCategory(id, this.categories);

        if (response.error) {
            alert(response.error);
            return response.redirect ? this.openNewRoute(response.redirect) : null;
        }

        this.categoryOriginalData = response.category;
        this.showCategory(response.category);
    }

    showCategory(category) {
        this.categoryTitleInputElement.value = category.title;
    }

    async updateCategory() {
            const changedData = {};

            if (this.categoryTitleInputElement.value !== this.categoryOriginalData.title) {
                changedData.title = this.categoryTitleInputElement.value;
            }

            if (Object.keys(changedData).length > 0) {
                const response = await CategoriesService.updateCategory(this.categoryOriginalData.id, changedData, this.categories);

                if (response.error) {
                    alert(response.error);
                    return response.redirect ? this.openNewRoute(response.redirect) : null;
                }

                return this.openNewRoute('/' + this.categories);
            }

    }
}
