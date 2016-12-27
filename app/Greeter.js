/**
 * Created by tjj on 2016/12/13.
 */
import React, {Component} from 'react';
import config from './config.json';
import styles from './css/Greeter.css';//导入
import  stylesScss from './css/test.scss' //scss

class Greeter extends Component {
    render() {
        return (
            <div className={styles.root}>
                {config.greetText}
            </div>
        );
    }
}

export default Greeter