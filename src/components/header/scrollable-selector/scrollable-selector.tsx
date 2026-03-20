import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import style from "./scrollable-selector.module.css";
import Link from "next/link";

type Props = {
    year: number;
    period: "yearly" | "quarterly" | "monthly";
    date?: string;
}

export default function ScrollableLinks({ year, period, date }: Props) {
    const types = ["yearly", "quarterly", "monthly"];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const linkBuilder = (direction: number, scrollType: "period" | "yearly" | "quarterly" | "monthly" | "year"): string => {
        if(scrollType === "period") {
            const currentIndex = types.indexOf(period);
            if(currentIndex + direction < 0 ) {
                return `/goals/${types[types.length - 1]}/${year}-0${new Date().getMonth() + 1}-01`;
            }
            if(currentIndex + direction >= types.length) {
                return `/goals/${types[0]}/${year}-0${new Date().getMonth() + 1}-01`;
            }
            return `/goals/${types[currentIndex + direction]}/${year}-0${new Date().getMonth() + 1}-01`;
        }
        if(scrollType === "year") {
            return `/goals/${period}/${year + direction}-${date}-01`;
        }
        if(scrollType === "yearly") {
            return `/goals/${scrollType}/${year + direction}`;
        }
        if (scrollType === "quarterly") {
        const currentMonth = Number(date);
        const nextMonthRaw = currentMonth + direction * 3;
        const monthIndex = nextMonthRaw - 1;
        const normalizedMonth = ((monthIndex % 12) + 12) % 12;

        const finalMonth = String(normalizedMonth + 1).padStart(2, "0");

        return `/goals/${scrollType}/${year}-${finalMonth}-01`;
        }
        if (scrollType === "monthly") {
            const d = new Date(year, Number(date) - 1, 1);
            d.setMonth(d.getMonth() + direction);

            const newMonth = String(d.getMonth() + 1).padStart(2, "0");

            return `/goals/${scrollType}/${year}-${newMonth}-01`;
        }
        return "/";
    }

    const dateDisplay = () =>{
        if( period === "quarterly") {
            const month = Number(date?.split("-")[0]);
            const quarter = Math.ceil(month / 3);
            return `Q${quarter}`;
        }
        if( period === "monthly") {
            const month = Number(date?.split("-")[0]);
            return months[month - 1];
        }
        return "";
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
                        <span>{dateDisplay()}</span>
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