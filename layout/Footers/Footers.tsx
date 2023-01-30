import {FootersProps} from "./Footers.props";
import styles from './Footers.module.css'
import cn from "classnames";

export const Footers = ({className, ...props}: FootersProps): JSX.Element => {
    return (
        <footer className={cn(className, styles.footers)} {...props}>
            <div>OwlTop ©{new Date().getUTCFullYear()} Все права защищены</div>
            <a href='#' target='_blank'>Пользовательское соглашение</a>
            <a href='#' target='_blank'>Политика конфиденциальности</a>
        </footer>
    )
}