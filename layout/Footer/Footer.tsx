import {FooterProps} from "./Footer.props";
import styles from './Footer.module.css'
import cn from "classnames";
import {Parag} from "../../components";

export const Footer = ({className, ...props}: FooterProps): JSX.Element => {
    return (
        <footer className={cn(className, styles.footer)} {...props}>
            <Parag className={cn(className,styles.roots)}>OwlTop ©{new Date().getUTCFullYear()} Все права защищены</Parag>
            <a href='#' target='_blank' className={cn(className,styles.agrees)}>Пользовательское соглашение</a>
            <a href='#' target='_blank' className={cn(className,styles.conf)}>Политика конфиденциальности</a>
        </footer>
    )
}