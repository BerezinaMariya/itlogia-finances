export class ShowCategoriesRecordsUtils {
    static showRecords(categories, category) {
        const recordsElement = document.getElementById('records');

        if (categories.length > 0) {
            for (let i = 0; i < categories.length; i++) {
                const itemElement = document.createElement('div');
                const itemContentElement = document.createElement('div');
                const titleElement = document.createElement('h2');
                const toolbarElement = document.createElement('div');
                const buttonGroupFirstElement = document.createElement('div');
                const buttonFirstElement = document.createElement('a');
                const buttonGroupSecondElement = document.createElement('div');
                const buttonSecondElement = document.createElement('button');

                titleElement.innerText = categories[i].title;
                buttonFirstElement.innerText = 'Редактировать';
                buttonSecondElement.innerText = 'Удалить';

                itemElement.classList.add('col-xl-4');
                itemElement.classList.add('col-lg-6');
                itemElement.classList.add('col-md-9');
                itemElement.classList.add('col-sm-12');
                itemElement.classList.add('p-2');

                itemContentElement.classList.add('p-3');
                itemContentElement.classList.add('border');
                itemContentElement.classList.add('rounded-4');

                titleElement.classList.add('fs-3');

                toolbarElement.classList.add('btn-toolbar');
                toolbarElement.setAttribute('role', 'toolbar');
                toolbarElement.setAttribute('aria-label', 'Toolbar with button groups');

                buttonGroupFirstElement.classList.add('btn-group');
                buttonGroupFirstElement.classList.add('me-2');
                buttonGroupFirstElement.setAttribute('role', 'group');
                buttonGroupFirstElement.setAttribute('aria-label', 'First group');

                buttonFirstElement.classList.add('btn');
                buttonFirstElement.classList.add('btn-primary');
                buttonFirstElement.classList.add(category + '-btn');
                buttonFirstElement.setAttribute('href', '/' + category + '/edit?id=' + categories[i].id);

                buttonGroupSecondElement.classList.add('btn-group');
                buttonGroupSecondElement.classList.add('me-2');
                buttonGroupSecondElement.setAttribute('role', 'group');
                buttonGroupSecondElement.setAttribute('aria-label', 'Second group');

                buttonSecondElement.classList.add('btn');
                buttonSecondElement.classList.add('btn-danger');
                buttonSecondElement.classList.add(category + '-btn');
                buttonSecondElement.setAttribute('type', 'button');
                buttonSecondElement.setAttribute('data-bs-toggle', 'modal');
                buttonSecondElement.setAttribute('data-bs-target', '#modal');
                buttonSecondElement.addEventListener('click', () => {
                    const deleteLinkElement = document.getElementById('delete-link');
                    deleteLinkElement.setAttribute('href', '/' + category + '/delete?id=' + categories[i].id);
                });

                buttonGroupFirstElement.appendChild(buttonFirstElement);
                buttonGroupSecondElement.appendChild(buttonSecondElement);

                toolbarElement.appendChild(buttonGroupFirstElement);
                toolbarElement.appendChild(buttonGroupSecondElement);

                itemContentElement.appendChild(titleElement);
                itemContentElement.appendChild(toolbarElement);

                itemElement.appendChild(itemContentElement);

                recordsElement.appendChild(itemElement);
            }
        }

        const itemElement = document.createElement('div');
        const itemContentElement = document.createElement('a');
        const addItemElement = document.createElement('span');

        addItemElement.innerText = '+';

        itemElement.classList.add('col-xl-4');
        itemElement.classList.add('col-lg-6');
        itemElement.classList.add('col-md-9');
        itemElement.classList.add('col-sm-12');
        itemElement.classList.add('p-2');
        itemElement.classList.add('category-item');

        itemContentElement.classList.add('btn');
        itemContentElement.classList.add('p-3');
        itemContentElement.classList.add('border');
        itemContentElement.classList.add('rounded-4');
        itemContentElement.classList.add('h-100');
        itemContentElement.classList.add('d-flex');
        itemContentElement.classList.add('justify-content-center');
        itemContentElement.setAttribute('href', '/' + category + '/create');
        itemContentElement.setAttribute('id', 'add-' + category + '-button');

        addItemElement.classList.add('btn');
        addItemElement.classList.add('fs-4');
        addItemElement.classList.add('text-body-tertiary');
        addItemElement.classList.add('d-flex');
        addItemElement.classList.add('align-items-center');

        itemContentElement.appendChild(addItemElement);
        itemElement.appendChild(itemContentElement);

        recordsElement.appendChild(itemElement);
    }
}
