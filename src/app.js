import 'bootstrap/dist/css/bootstrap.min.css';

import {Router} from "./router";
import './styles/adaptive.css'

class App {
    constructor() {
        new Router();
    }
}

(new App());
