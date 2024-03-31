import {CategoriesService} from "../services/categories-service";

export class GetCategoriesListUtils {
    static async getCategoriesList(response) {
        const categoriesList = response.categories;

        const categorySelectElement = document.getElementById('category-select');
        categorySelectElement.querySelectorAll('.choice-option').forEach(option => option.remove());


        if (categoriesList.length > 0) {
            for (let i = 0; i < categoriesList.length; i++) {
                const optionElement = document.createElement('option');

                optionElement.classList.add('choice-option');
                optionElement.setAttribute('value', categoriesList[i].id);
                optionElement.innerText = categoriesList[i].title;

                categorySelectElement.appendChild(optionElement);
            }
        }
    }
}
