import React, {useContext} from "react";
import styles from './Menu.module.css'
import {AppContext} from "../../context/app.context";
import {FirstLevelMenuItem, PageItem} from "../../interfaces/menu.interface";
import cn from "classnames";
import Link from "next/link";
import {useRouter} from "next/router";
import {firstLevelMenu} from "../../helpers/helpers";
import {motion} from "framer-motion";

export const Menu = (): JSX.Element => {
    const {menu, setMenu, firstCategory} = useContext(AppContext)
    const router = useRouter()

    // Варианты анимации для меню (библиотека Framer Motion)
    const variants = {
        visible:{
            marginBottom: '20px',
            transition: {
                when: 'beforeChildren',
                staggerChildren: 0.1
            }
        },
        hidden:{
            marginBottom: 0
        }
    }

    const variantsChildren = {
        visible:{
            opacity: 1,
            width: "100%",
            height: 29
        },
        hidden:{
            opacity: 0,
            height: 0
        }
    }

    const openSecondLevel = (secondCategory: string) => {
        setMenu && setMenu(menu.map(m => {
            if (m._id.secondCategory == secondCategory) {
                m.isOpened = !m.isOpened
            }
            return m
        }))
    }

    const openSecondLevelKey = (key: React.KeyboardEvent, secondCategory: string) => {
        if(key.code == 'Space' || key.code == 'Enter'){
            key.preventDefault()
            openSecondLevel(secondCategory)
        }
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
                            <div  tabIndex={0} onKeyDown={(key: React.KeyboardEvent) => openSecondLevelKey(key, m._id.secondCategory)} className={styles.secondLevel}
                                 onClick={() => openSecondLevel(m._id.secondCategory)}>{m._id.secondCategory}</div>
                            <motion.div
                                layout
                                variants={variants}
                                initial={m.isOpened ? 'visible' : 'hidden'}
                                animate={m.isOpened ? 'visible' : 'hidden'}
                                className={cn(styles.secondLevelBlock)}
                            >
                                {buildThirdLevelMenu(m.pages, menuItem.route)}
                            </motion.div>
                        </div>
                    )
                })}
            </div>
        )
    }

    const buildThirdLevelMenu = (pages: PageItem[], route: string) => {
        return (
            pages.map(p => (
                <motion.div
                    variants={variantsChildren}
                    key={p._id}
                >
                    <Link href={`/${route}/${p.alias}`} className={cn(styles.thirdLevel, {
                        [styles.thirdLevelActive]: `/${route}/${p.alias}` == router.asPath
                    })}>
                        {p.category}
                    </Link>
                </motion.div>

            ))
        )
    }

    return (
        <div className={styles.menu}>
            {buildFirstLevelMenu()}
        </div>
    )
}