import {CategoriesButtonUtils} from "./utils/categories-button-utils";
import {SidebarUtils} from "./utils/sidebar-utils";
import {PopoverUtils} from "./utils/popover-utils";
import {AuthUtils} from "./utils/auth-utils";
import {GetBalanceUtils} from "./utils/get-balance-utils";
import {RoutesUtils} from "./utils/routes-utils";

export class Router {
    constructor() {
        this.titlePageElement = document.getElementById('title');
        this.contentPageElement = document.getElementById('content');
        this.userName = null;
        this.routes = RoutesUtils.getRoutes(this.openNewRoute.bind(this));

        this.initEvents();
    }

    initEvents() {
        window.addEventListener('DOMContentLoaded', this.activateRoute.bind(this)); // при первом открытии страницы
        window.addEventListener('popstate', this.activateRoute.bind(this)); // при переходе со страницы на страницу
        document.addEventListener('click', this.clickHandler.bind(this));
    }

    async openNewRoute(url) {
        const currentRoute = window.location.pathname;
        history.pushState({}, '', url);
        await this.activateRoute(currentRoute);
    }

    async clickHandler(e) {
        let element = null;

        if (e.target.nodeName === 'a') {
            element = e.target;
        } else if (e.target.parentNode.nodeName === 'a') {
            element = e.target.parentNode;
        }

        if (element) {
            e.preventDefault();

            const currentRoute = window.location.pathname;

            const url = element.href.replace(window.location.origin, '');
            if (!url || (currentRoute === url.replace('#', '')) || url.startsWith('javascript:void(0)')) {
                return;
            }
            await this.openNewRoute(url);
        }
    }

    async activateRoute(e, oldRoute = null) {
        if (oldRoute) {
            const currentRoute = this.routes.find(item => item.route === oldRoute);

            if (currentRoute.unload && typeof currentRoute.unload === 'function') {
                currentRoute.unload();
            }
        }

        const urlRoute = window.location.pathname;
        const newRoute = this.routes.find(item => item.route === urlRoute);


        if (newRoute) {
            if (newRoute.title) {
                this.titlePageElement.innerText = newRoute.title + ' | Lumincoin';
            }

            if (newRoute.filePathTemplate) {
                let contentBlock = this.contentPageElement;

                if (newRoute.useLayout) {
                    this.contentPageElement.innerHTML = await fetch(newRoute.useLayout).then(response => response.text());
                    contentBlock = document.getElementById('content-layout');

                    this.profileNameElement = document.getElementById('profile-name');
                    if (!this.userName) {
                        let userInfo = AuthUtils.getAuthInfo(AuthUtils.userInfoKey);
                        if (userInfo) {
                            userInfo = JSON.parse(userInfo);
                            if (userInfo.name || userInfo.lastName) {
                                this.userName = userInfo.name + " " + userInfo.lastName;
                            }
                        }
                    }
                    this.profileNameElement.innerText = this.userName;

                    this.activateMenuItem(newRoute);

                    GetBalanceUtils.getBalance(this.openNewRoute.bind(this)).then();
                    PopoverUtils.initPopover();

                    SidebarUtils.openMenuHandler();
                    SidebarUtils.closeMenuHandler();
                }

                contentBlock.innerHTML = await fetch(newRoute.filePathTemplate).then(response => response.text());
            }

            if (newRoute.load && typeof newRoute.load === 'function') {
                newRoute.load();
            }
        } else {
            history.pushState({}, '', '/404');
            await this.activateRoute();
        }
    }

    activateMenuItem(route) {
        document.querySelectorAll('.sidebar .nav-link').forEach(item => {
            const href = item.getAttribute('href');

            if ((route.route.includes(href) && href !== '/' || (route.route === '/' && href === '/'))) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }

            CategoriesButtonUtils.toggleCategoriesButton(route);
        });
    }
}
