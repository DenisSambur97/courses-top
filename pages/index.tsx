import {Button, Htag, Input, Parag, Rating, Search, Tag, Textarea} from "../components";
import {useEffect, useState} from "react";
import {withLayout} from "../layout/Layout";
import {GetStaticProps} from "next";
import axios from "axios";
import {MenuItem} from "../interfaces/menu.interface";

function Home({menu, firstCategory}: HomeProps): JSX.Element {
    const [rating, setRating] = useState<number>(4)

    return (
        <>
            <Htag tag='h1'>Title</Htag>
            <Parag textSize='s'>Test text</Parag>
            <Button appearance='primary' arrow='right'>Кнопка</Button>
            <Button appearance='ghost' arrow='down'>Кнопка</Button>
            <Parag textSize='l'>Text text text 1</Parag>
            <Parag textSize='m'>Text text text 2</Parag>
            <Parag textSize='s'>Text text text 3</Parag>
            <Parag>Text text text 3</Parag>
            <Parag>Text text text 3</Parag>
            <Tag size='m'>маленький</Tag>
            <Tag size='l'>большой</Tag>
            <Tag size='l' color='ghost'>большой</Tag>
            <Tag size='l' color='green'>большой</Tag>
            <Tag size='l' color='gray'>большой</Tag>
            <Tag size='l' color='red'>большой</Tag>
            <Tag size='l' color='primary'>большой</Tag>
            <Tag size='l' color='primary' href='#'>большой</Tag>
            <Rating rating={rating} isEditable setRating={setRating}/>
            <Input placeholder='тест'/>
            <Textarea placeholder='Текст отзыва'/>
        </>
    )
}

export default withLayout(Home)

// Получение статически для кэширования пунктов меню первого уровня.
export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    const firstCategory = 0
    const {data: menu} = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
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

