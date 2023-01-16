import {ParagProps} from "./Parag.props";
import styles from './Parag.module.css'
import cn from "classnames";

export const Parag = ({textSize = 'm', children, className, ...props}: ParagProps): JSX.Element => {
    return (
        <p
            className={cn(styles.p, {
                [styles.s]: textSize == "s",
                [styles.m]: textSize == "m",
                [styles.l]: textSize == "l",
            })}
            {...props}
        >
            {children}
        </p>
    )
}