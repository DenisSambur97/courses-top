import {withLayout} from "../layout/Layout";
import {GetStaticProps} from "next";
import axios from "axios";
import styles from "./index.module.css"
import {MenuItem} from "../interfaces/menu.interface";
import {API} from "../helpers/api";
import {Htag} from "../components";
import Image from "next/image";

function Home({menu, firstCategory}: HomeProps): JSX.Element {
    return (
        <>
            {/*<img className={styles.img} src="/public/main-pic.jpeg" alt={'Studying'}/>*/}
            {/*<img className={styles.img} src="main-pic.jpeg" alt={'Studying'}/>*/}
            <Image
                className={styles.img}
                src="/main-pic.jpeg"
                alt={'Hello'}
                width={1080}
                height={720}
            />
            <div className={styles.title}>Вас приветствует сервис Owl Top!</div>
            <div className={styles.description}>Здесь вы можете посмотреть какие существуют курсы на интересующую вас тему. А также можете посмотреть дополнительную информацию про курс и отзывы клиентов. <span className={styles.descriptionMarker}>Выберите в меню интересующий вас раздел.</span></div>
        </>
    )
}

export default withLayout(Home)

// Получение статически для кэширования пунктов меню первого уровня.
export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    const firstCategory = 0
    const {data: menu} = await axios.post<MenuItem[]>(API.topPage.find, {
        firstCategory
    })
    return {
        props: {
            menu,
            firstCategory
        }
    }
}

interface HomeProps extends Record<string, unknown>{
    menu: MenuItem[],
    firstCategory: number
}

