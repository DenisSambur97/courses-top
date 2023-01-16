import {withLayout} from "../../layout/Layout";
import {GetStaticPaths, GetStaticProps, GetStaticPropsContext} from "next";
import axios from "axios";
import {MenuItem} from "../../interfaces/menu.interface";
import {TopPageModal} from "../../interfaces/page.interface";
import {ParsedUrlQuery} from "querystring";
import {notFound} from "next/navigation";
import {ProductModel} from "../../interfaces/product.interface";

const firstCategory = 0

function Course({menu, page, products}: CourseProps): JSX.Element {
    return (
        <>
            {products && products.length}
        </>
    )
}

export default withLayout(Course)

// Какие пути для постраения страницы
export const getStaticPaths: GetStaticPaths = async () => {
    //Меню первого уровня
    const {data: menu} = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
        firstCategory
    })
    return {
        paths: menu.flatMap(m => m.pages.map(p => '/courses/' + p.alias)), // разложили в плоский массив URL'ов (чтобы не было массива в массиве)
        fallback: true
    }
}

// Получение статически для кэширования
export const getStaticProps: GetStaticProps<CourseProps> = async ({params}: GetStaticPropsContext<ParsedUrlQuery>) => {
    if(!params){
        return {
            notFound: true
        }
    }
    //Меню первого уровня
    const {data: menu} = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
        firstCategory
    })
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
            firstCategory,
            page,
            products
        }
    }
}

interface CourseProps extends Record<string, unknown>{
    menu: MenuItem[]
    firstCategory: number
    page: TopPageModal
    products: ProductModel[]
}

