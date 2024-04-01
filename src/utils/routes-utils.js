import {Main} from "../components/main";
import {Login} from "../components/auth/login";
import {Signup} from "../components/auth/signup";
import {Logout} from "../components/auth/logout"
import {CategoriesList} from "../components/categories/categories-list";
import {CategoriesCreate} from "../components/categories/categories-create";
import {CategoriesEdit} from "../components/categories/categories-edit";
import {CategoriesDelete} from "../components/categories/categories-delete";
import {OperationsList} from "../components/operations/operations-list";
import {OperationsCreate} from "../components/operations/operations-create";
import {OperationsEdit} from "../components/operations/operations-edit";
import {OperationsDelete} from "../components/operations/operations-delete";

export class RoutesUtils {
    static getRoutes(openNewRoute) {
        return [
            {
                route: '/',
                title: 'Главная',
                filePathTemplate: '/templates/pages/main.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new Main(openNewRoute);
                },
            },
            {
                route: '/404',
                title: 'Страница не найдена',
                filePathTemplate: '/templates/pages/404.html',
                useLayout: false,
            },
            {
                route: '/login',
                title: 'Авторизация',
                filePathTemplate: '/templates/pages/auth/login.html',
                useLayout: false,
                load: () => {
                    document.body.classList.add('vh-100');
                    new Login(openNewRoute);
                },
                unload: () => {
                    document.body.classList.remove('vh-100');
                },
            },
            {
                route: '/signup',
                title: 'Регистрация',
                filePathTemplate: '/templates/pages/auth/signup.html',
                useLayout: false,
                load: () => {
                    document.body.classList.add('vh-100');
                    new Signup(openNewRoute);
                },
                unload: () => {
                    document.body.classList.remove('vh-100');
                },
            },
            {
                route: '/logout',
                load: () => {
                    new Logout(openNewRoute);
                },
            },
            {
                route: '/income',
                title: 'Доходы',
                filePathTemplate: '/templates/pages/income/list.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new CategoriesList(openNewRoute, 'income');
                },
            },
            {
                route: '/income/create',
                title: 'Создание дохода',
                filePathTemplate: '/templates/pages/income/create.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new CategoriesCreate(openNewRoute, 'income');
                },
            },
            {
                route: '/income/edit',
                title: 'Редактирование дохода',
                filePathTemplate: '/templates/pages/income/edit.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new CategoriesEdit(openNewRoute, 'income');
                },
            },
            {
                route: '/income/delete',
                load: () => {
                    new CategoriesDelete(openNewRoute, 'income');
                },
            },
            {
                route: '/expense',
                title: 'Расходы',
                filePathTemplate: '/templates/pages/expense/list.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new CategoriesList(openNewRoute, 'expense');
                },
            },
            {
                route: '/expense/create',
                title: 'Создание расхода',
                filePathTemplate: '/templates/pages/expense/create.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new CategoriesCreate(openNewRoute, 'expense');
                },
            },
            {
                route: '/expense/edit',
                title: 'Редактирование расхода',
                filePathTemplate: '/templates/pages/expense/edit.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new CategoriesEdit(openNewRoute, 'expense');
                },
            },
            {
                route: '/expense/delete',
                load: () => {
                    new CategoriesDelete(openNewRoute, 'expense');
                },
            },
            {
                route: '/operations',
                title: 'Доходы и расходы',
                filePathTemplate: '/templates/pages/operations/list.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new OperationsList(openNewRoute);
                },
            },
            {
                route: '/operations/create',
                title: 'Создание дохода/расхода',
                filePathTemplate: '/templates/pages/operations/create.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new OperationsCreate(openNewRoute);
                },
            },
            {
                route: '/operations/edit',
                title: 'Редактирование дохода/расхода',
                filePathTemplate: '/templates/pages/operations/edit.html',
                useLayout: '/templates/layout.html',
                load: () => {
                    new OperationsEdit(openNewRoute);
                },
            },
            {
                route: '/operations/delete',
                load: () => {
                    new OperationsDelete(openNewRoute);
                },
            },
        ]
    }
}
