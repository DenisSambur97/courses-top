import {ReviewFormProps} from "./ReviewForm.props";
import styles from "./ReviewForm.module.css"
import cn from "classnames";
import {Input} from "../Input/Input";
import {Rating} from "../Rating/Rating";
import {Textarea} from "../Textarea/Textarea";
import {Button} from "../Button/Button";
import CloseIcon from "./CloseIcon.svg"
import {useForm, Controller} from "react-hook-form";
import {IReviewForm, IReviewSentResponse} from "./ReviewForm.intarface";
import axios from "axios";
import {API} from "../../helpers/api";
import {useState} from "react";

export const ReviewForm = ({productId, className, ...props}: ReviewFormProps): JSX.Element => {
    const {register, control, handleSubmit, formState: {errors}, reset} = useForm<IReviewForm>()
    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    const [error, setIsError] = useState<string>()

    const onSubmit = async (formData: IReviewForm) => {
        try {
            const {data} = await axios.post<IReviewSentResponse>(API.review.createDemo, {...formData, productId})
            if (data.message){
                setIsSuccess(true)
                console.log(data.message)
                reset()
            } else {
                setIsError('Что-то пошло не так')
            }
        } catch (e) {
            // @ts-ignore
            setIsError(e.message)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={cn(styles.reviewForm, className)} {...props}>
                <Input
                    {...register('name', {required: {value: true, message: 'Заполните имя'}})}
                    placeholder={'Имя'}
                    error={errors.name}
                />
                <Input {...register('title', {required: {value: true, message: 'Заполните заголовок'}})}
                       className={styles.title}
                       placeholder={'Заголовок отзыва'}
                       error={errors.title}
                />
                <div className={styles.rating}>
                    <span>Оценка</span>
                    <Controller
                        name={'rating'}
                        control={control}
                        rules={{required: {value: true, message: 'Выберите оценку'}}}
                        render={({field}) => (
                            <Rating
                                rating={field.value}
                                ref={field.ref}
                                isEditable
                                setRating={field.onChange}
                                error={errors.rating}/>)}
                            />
                </div>
                <Textarea
                    {...register('description', {required: {value: true, message: 'Заполните текст комментария'}})}
                    className={styles.description}
                    placeholder={'Текст отзыва'}
                    error={errors.description}
                />
                <div className={styles.submit}>
                    <Button appearance={"primary"}>Отправить</Button>
                    <span
                        className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
                </div>
            </div>
            {/* В случае успешной отправки комментария  */}
            {isSuccess && <div className={styles.success}>
                <div className={styles.successTitle}>Ваш отзыв отправлен</div>
                <div className={styles.successBody}>
                    Ваш отзыв будет опубликован после проверки.
                </div>
                <CloseIcon className={styles.close} onClick={() => setIsSuccess(false)}/>
            </div>}
            {/* В случае ошибки при отправке */}
            {error && <div className={styles.error}>
                Что-то пошло не так, попробуйте обносить страницу
                <CloseIcon className={styles.close} onClick={() => setIsError(undefined)}/>
            </div>}
        </form>
    )
}