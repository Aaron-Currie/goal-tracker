import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import style from "./scrollable-selector.module.css";
import Link from "next/link";

type Props = {
    year: number;
    period: "yearly" | "quarterly" | "monthly";
    date: string;
}

export default function ScrollableLinks({ year, period, date }: Props) {
    const types = ["yearly", "quarterly", "monthly"];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const linkBuilder = (direction: number, scrollType: "period" | "yearly" | "quarterly" | "monthly"): string => {
        if(scrollType === "period") {
            const currentIndex = types.indexOf(period);
            if(currentIndex + direction < 0 ) {
                return `/goals/${types[types.length - 1]}/${year}`;
            }
            if(currentIndex + direction >= types.length) {
                return `/goals/${types[0]}/${year}`;
            }
            return `/goals/${types[currentIndex + direction]}/${year}`;
        }
        if(scrollType === "yearly") {
            return `/goals/${scrollType}/${year + direction}`;
        }
        if(scrollType === "quarterly") {
            return `/goals/${scrollType}/${year}/${date + (direction * 3)}`;
        }
        if(scrollType === "monthly") {
            return `/goals/${scrollType}/${year}/${date + direction}`;
        }
        return "/goals";
    }

    return (
        <div className={style.selectorBlock}>
            <div className={style.scrollSelector}>
                <Link href={linkBuilder(-1, "period")}><FontAwesomeIcon size={'2x'} icon={faCaretLeft} /></Link>
                    <span>{period.toUpperCase()}</span>
                <Link href={linkBuilder(1, "period")}><FontAwesomeIcon size={'2x'} icon={faCaretRight} /></Link>
            </div>
            <div className={`${style.dateSelector} ${period === 'yearly' ? style.singleLine : style.doubleLine}`}>
                {period !== 'yearly' && 
                (<div className={style.scrollSelector}>
                    <Link href={linkBuilder(-1, period)}><FontAwesomeIcon size={'2x'} icon={faCaretLeft} /></Link>
                        <span>{year}</span>
                    <Link href={linkBuilder(1, period)}><FontAwesomeIcon size={'2x'} icon={faCaretRight} /></Link>
                </div>
                )}
                <div className={style.scrollSelector}>
                    <Link href={linkBuilder(-1, 'year')}><FontAwesomeIcon size={'2x'} icon={faCaretLeft} /></Link>
                        <span>{year}</span>
                    <Link href={linkBuilder(1, 'year')}><FontAwesomeIcon size={'2x'} icon={faCaretRight} /></Link>
                </div>
            </div>
        </div>
    )
}