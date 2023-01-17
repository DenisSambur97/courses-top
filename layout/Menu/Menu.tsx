import {useContext} from "react";
import styles from './Menu.module.css'
import {AppContext} from "../../context/app.context";
import {FirstLevelMenuItem, PageItem} from "../../interfaces/menu.interface";
import CoursesIcon from "./icons/Courses.svg"
import ServicesIcon from "./icons/Services.svg"
import BooksIcon from "./icons/Books.svg"
import ProductsIcon from "./icons/Products.svg"
import {TopLevelCategory} from "../../interfaces/page.interface";
import cn from "classnames";

const firstLevelMenu: FirstLevelMenuItem[] = [
    {route: 'courses', name: 'Курсы', icon: <CoursesIcon/>, id: TopLevelCategory.Courses},
    {route: 'services', name: 'Сервисы', icon: <ServicesIcon/>, id: TopLevelCategory.Services},
    {route: 'books', name: 'Книги', icon: <BooksIcon/>, id: TopLevelCategory.Books},
    {route: 'products', name: 'Продукты', icon: <ProductsIcon/>, id: TopLevelCategory.Products}
]

export const Menu = (): JSX.Element => {
    const {menu, setMenu, firstCategory} = useContext(AppContext)

    // Функция которая создает пункты меню с верхнего уровня
    const buildFirstLevelMenu = () => {
        return(
            <>
                {firstLevelMenu.map(menu => (
                    <div key={menu.route}>
                        <a href={`/${menu.route}`}>
                            <div className={cn(styles.firstLevel, {
                                [styles.firstLevelActive] : menu.id == firstCategory
                            })}>
                                {menu.icon}
                                <span>{menu.name}</span>
                            </div>
                        </a>
                        {/* Если определенный пунт открыт, тогда открывается его подпункты*/}
                        {menu.id == firstCategory && buildSecondLevelMenu(menu)}
                    </div>
                ))}
            </>
        )
    }

    const buildSecondLevelMenu = (menuItem: FirstLevelMenuItem) => {
        return(
            <div className={styles.secondBlock}>
                {menu.map(m => (
                    <div key={m._id.secondCategory}>
                        <div className={styles.secondLevel}>{m._id.secondCategory}</div>
                        <div className={cn(styles.secondLevelBlock, {
                            [styles.secondLevelBlockOpened]: m.isOpened
                        })}>
                            {buildThirdLevelMenu(m.pages, menuItem.route)}
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    const buildThirdLevelMenu = (pages: PageItem[], route: string) => {
        return (
            pages.map(p => (
                <a key={p._id} href={`/${route}/${p.alias}`} className={cn(styles.thirdLevel, {
                    [styles.thirdLevelActive]: false
                })}>
                    {p.category}
                </a>
            ))
        )
    }

    return (
        <div className={styles.menu}>
            {buildFirstLevelMenu()}
        </div>
    )
}