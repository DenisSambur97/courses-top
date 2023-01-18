import {useContext} from "react";
import styles from './Menu.module.css'
import {AppContext} from "../../context/app.context";
import {FirstLevelMenuItem, PageItem} from "../../interfaces/menu.interface";
import cn from "classnames";
import Link from "next/link";
import {useRouter} from "next/router";
import {firstLevelMenu} from "../../helpers/helpers";

export const Menu = (): JSX.Element => {
    const {menu, setMenu, firstCategory} = useContext(AppContext)
    const router = useRouter()

    const openSecondLevel = (secondCategory: string) => {
        setMenu && setMenu(menu.map(m => {
            if (m._id.secondCategory == secondCategory) {
                m.isOpened = !m.isOpened
            }
            return m
        }))
    }

    // Функция которая создает пункты меню с верхнего уровня
    const buildFirstLevelMenu = () => {
        return (
            <>
                {firstLevelMenu.map(m => (
                    <div key={m.route}>
                        <Link href={`/${m.route}`}>
                            <div className={cn(styles.firstLevel, {
                                [styles.firstLevelActive]: m.id == firstCategory
                            })}>
                                {m.icon}
                                <span>{m.name}</span>
                            </div>
                        </Link>
                        {/* Если определенный пунт открыт, тогда открывается его подпункты*/}
                        {m.id == firstCategory && buildSecondLevelMenu(m)}
                    </div>
                ))}
            </>
        )
    }

    const buildSecondLevelMenu = (menuItem: FirstLevelMenuItem) => {
        return (
            <div className={styles.secondBlock}>
                {menu.map(m => {
                    // Проверка какой блок открыт
                    if (m.pages.map(al => al.alias).includes(router.asPath.split('/')[2])) {
                        m.isOpened = true
                    }
                    return (
                        <div key={m._id.secondCategory}>
                            <div className={styles.secondLevel}
                                 onClick={() => openSecondLevel(m._id.secondCategory)}>{m._id.secondCategory}</div>
                            <div className={cn(styles.secondLevelBlock, {
                                [styles.secondLevelBlockOpened]: m.isOpened
                            })}>
                                {buildThirdLevelMenu(m.pages, menuItem.route)}
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    const buildThirdLevelMenu = (pages: PageItem[], route: string) => {
        return (
            pages.map(p => (
                <Link key={p._id} href={`/${route}/${p.alias}`} className={cn(styles.thirdLevel, {
                    [styles.thirdLevelActive]: `/${route}/${p.alias}` == router.asPath
                })}>
                    {p.category}
                </Link>

            ))
        )
    }

    return (
        <div className={styles.menu}>
            {buildFirstLevelMenu()}
        </div>
    )
}