import {BalanceService} from "../services/balance-service";

export class GetBalanceUtils {
    static async getBalance(openNewRoute) {
        const response = await BalanceService.getBalance();

        if (response.error) {
            alert(response.error);
            return response.redirect ? openNewRoute(response.redirect) : null;
        }

        document.getElementById('user-balance').innerText = response.balance  + '$';
    }
}
