import {DetailedHTMLProps, HTMLAttributes} from "react";
import {ReviewModal} from "../../interfaces/product.interface";

export interface ReviewProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    review: ReviewModal
}