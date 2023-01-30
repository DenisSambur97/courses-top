import {SidebarProps} from "./Sidebar.props";
import styles from './Sidebar.module.css'
import cn from "classnames";
import {Menu} from "../Menu/Menu";
import Logo from "../Logo.svg"
import {Search} from "../../components";
import {useRouter} from "next/router";

export const Sidebar = ({className, ...props}: SidebarProps): JSX.Element => {
    const router = useRouter()

    return (
        <div {...props} className={cn(className, styles.sidebar)}>
            <Logo className={styles.logo} onClick={() => router.push('/')}/>
            <Search/>
            <Menu/>
        </div>
    )
}