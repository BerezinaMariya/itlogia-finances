export class SidebarUtils {
    static openMenuHandler() {
        const menuOpenButtonElement = document.getElementById('menu-icon');
        const menuElement = document.getElementById('menu');

        menuOpenButtonElement.addEventListener('click', function () {
            menuElement.classList.remove('d-none');
            menuElement.classList.add('d-flex');
        });
    }

    static closeMenuHandler() {
        const menuCloseButtonElement = document.getElementById('menu-close');
        const menuElement = document.getElementById('menu');
        const overlayElement = document.getElementById('content-layout');

        menuCloseButtonElement.addEventListener('click', function (e) {
            menuElement.classList.remove('d-flex');
            menuElement.classList.add('d-none');
        });

        overlayElement.addEventListener('click', function (e) {
            if (menuElement.classList.contains('d-flex')) {
                menuElement.classList.remove('d-flex');
                menuElement.classList.add('d-none');
            }
        });
    }

}
