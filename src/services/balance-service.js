import {HttpUtils} from "../utils/http-utils";

export class BalanceService {
    static async getBalance() {
        const returnObject = {
            error: false,
            redirect: null,
            balance: null
        };

        const result = await HttpUtils.request('/balance');

        if (result.redirect || result.error || !result.response) {
            returnObject.error = 'Возникла ошибка при запросе заказов. Обратитесь в поддержку';
            result.redirect ? returnObject.redirect = result.redirect : null;
            return returnObject;
        }

        returnObject.balance = result.response.balance;
        return returnObject;
    }
}
