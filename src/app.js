import 'bootstrap/dist/css/bootstrap.min.css';

import {Router} from "./router";
import "./styles/styles.scss";

class App {
    constructor() {
        new Router();
    }
}

(new App());
