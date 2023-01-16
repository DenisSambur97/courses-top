import {DetailedHTMLProps, HTMLAttributes, ReactNode} from "react";

export interface ParagProps extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>{
    textSize?: 's' | 'm' | 'l',
    children: ReactNode
}