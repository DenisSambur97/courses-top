import {withLayout} from "../../layout/Layout";
import {GetStaticPaths, GetStaticProps, GetStaticPropsContext} from "next";
import axios from "axios";
import {MenuItem} from "../../interfaces/menu.interface";
import {TopLevelCategory, TopPageModal} from "../../interfaces/page.interface";
import {ParsedUrlQuery} from "querystring";
import {notFound} from "next/navigation";
import {ProductModel} from "../../interfaces/product.interface";
import {firstLevelMenu} from "../../helpers/helpers";
import {type} from "os";
import {router} from "next/client";
import {TopPageComponent} from "../../page-components";

function TopPage({firstCategory, page, products}: TopPageProps): JSX.Element {
    return <TopPageComponent
        firstCategory={firstCategory}
        page={page}
        products={products}/>
}

export default withLayout(TopPage)

// Какие пути для постраения страницы
export const getStaticPaths: GetStaticPaths = async () => {
    let paths: string[] = []
    for (const m of firstLevelMenu) {
        //Меню первого уровня
        const {data: menu} = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
            firstCategory: m.id
        })
        paths = paths.concat(menu.flatMap(s => s.pages.map(p => `/${m.route}/${p.alias}`))) // разложили в плоский массив URL'ов (чтобы не было массива в массиве))
    }
    return {
        paths,
        fallback: true
    }
}

// Получение статически для кэширования
export const getStaticProps: GetStaticProps<TopPageProps> = async ({params}: GetStaticPropsContext<ParsedUrlQuery>) => {
    if (!params) {
        return {
            notFound: true
        }
    }
    const firstCategoryItem = firstLevelMenu.find(m => m.route == params.type)
    if (!firstCategoryItem) {
        return {
            notFound: true
        }
    }
    try {
        //Меню первого уровня
        const {data: menu} = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
            firstCategory: firstCategoryItem.id
        })
        if (menu.length == 0) {
            return {
                notFound: true
            }
        }
        //Аллиас для основного контента
        const {data: page} = await axios.get<TopPageModal>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/byAlias/' + params.alias)
        //Получение продуктов для основного контента
        const {data: products} = await axios.post<ProductModel[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/product/find', {
            category: page.category,
            limit: 10
        })

        return {
            props: {
                menu,
                firstCategory: firstCategoryItem.id,
                page,
                products
            }
        }
    } catch {
        return {
            notFound: true
        }
    }
}

interface TopPageProps extends Record<string, unknown> {
    menu: MenuItem[]
    firstCategory: TopLevelCategory
    page: TopPageModal
    products: ProductModel[]
}

