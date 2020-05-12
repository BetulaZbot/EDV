import { db } from 'core-dbjs'

class InitState extends db {
    text = 'hello'

    constructor(name, updateView) {
        super(name, updateView);
    }

}

export default InitState