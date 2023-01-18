import {TopPageComponentProps} from "./TopPageComponent.props";
import styles from './TopPageComponent.module.css'
import {HhData, Htag, Tag} from "../../components";
import {TopLevelCategory} from "../../interfaces/page.interface";

export const TopPageComponent = ({firstCategory, page, products, ...props}: TopPageComponentProps): JSX.Element => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <Htag tag={"h1"}>{page.title}</Htag>
                {products && <Tag color={"gray"} size={"l"}>{products.length}</Tag>}
                <span>Сортировка</span>
            </div>
            <div>
                {products && products.map(p => (
                    <div key={p._id}>{p.title}</div>
                ))}
            </div>
            <div className={styles.hhTitle}>
                <Htag tag={"h2"}>Вакансии - {page.category}</Htag>
                {products && <Tag color={"red"} size={"l"}>hh.ru</Tag>}
            </div>
            {firstCategory == TopLevelCategory.Courses && <HhData {...page.hh}/>}
        </div>
    )
}