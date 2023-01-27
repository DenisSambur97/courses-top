import {withLayout} from "../../layout/Layout";
import {GetStaticPaths, GetStaticProps, GetStaticPropsContext} from "next";
import axios from "axios";
import {MenuItem} from "../../interfaces/menu.interface";
import {TopLevelCategory, TopPageModal} from "../../interfaces/page.interface";
import {ParsedUrlQuery} from "querystring";
import {notFound} from "next/navigation";
import {ProductModel} from "../../interfaces/product.interface";
import {firstLevelMenu} from "../../helpers/helpers";
import Head from "next/head";
import {type} from "os";
import {router} from "next/client";
import {TopPageComponent} from "../../page-components";
import {API} from "../../helpers/api";

function TopPage({firstCategory, page, products}: TopPageProps): JSX.Element {
    return <>
        {page && products && <>
            <Head>
                <title>{page.metaTitle}</title>
                <meta name="description" content={page.metaDescription}/>
                <meta property={'og:title'} content={page.metaTitle}/>
                <meta property={'og:description'} content={page.metaDescription}/>
                <link rel="icon" href="../../components/favicon.ico"/>
            </Head>
            <TopPageComponent
                firstCategory={firstCategory}
                page={page}
                products={products}
            />
        </>}
    </>
}

export default withLayout(TopPage)

// Какие пути для постраения страницы
export const getStaticPaths: GetStaticPaths = async () => {
    let paths: string[] = []
    for (const m of firstLevelMenu) {
        //Меню первого уровня
        const {data: menu} = await axios.post<MenuItem[]>(API.topPage.find, {
            firstCategory: m.id
        })
        paths = paths.concat(menu.flatMap(s => s.pages.map(p => `/${m.route}/${p.alias}`))) // разложили в плоский массив URL'ов (чтобы не было массива в массиве))
    }
    return {
        paths,
        // Ставить true при разработке
        fallback: false
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
        const {data: menu} = await axios.post<MenuItem[]>(API.topPage.find, {
            firstCategory: firstCategoryItem.id
        })
        if (menu.length == 0) {
            return {
                notFound: true
            }
        }
        //Аллиас для основного контента
        const {data: page} = await axios.get<TopPageModal>(API.topPage.byAllias + params.alias)
        //Получение продуктов для основного контента
        const {data: products} = await axios.post<ProductModel[]>(API.product.find, {
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

