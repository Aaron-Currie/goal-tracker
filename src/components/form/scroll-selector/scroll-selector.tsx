import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight, faCircleArrowLeft, faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import style from "./scroll-selector.module.css";
import { useEffect, useState } from "react";

type Props = {
    setTypeState: React.Dispatch<React.SetStateAction<"Yearly" | "Quarterly" | "Monthly">>;
    typeValue: "Yearly" | "Quarterly" | "Monthly";
    setDateState: React.Dispatch<React.SetStateAction<string>>;
}

export default function ScrollSelector({ setTypeState, typeValue, setDateState }: Props) {
    const types = ["Yearly", "Quarterly", "Monthly"];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const [currentType, setCurrentType] = useState<"Yearly" | "Quarterly" | "Monthly">(typeValue);
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [date, setDate] = useState<string>('');
    
    const getYear = (int: number) => {
        setYear(prev => prev + int);
    }

    const getMonth = (int: number) => {
        const currentMonthIndex = months.indexOf(date);
        const nextMonthIndex = (currentMonthIndex + int + 12) % 12;
        setDate(months[nextMonthIndex]);
    }

    const getQuarter = (int: number) => {
        const quarter = date.split("-");
        const currentQuarter = Number(quarter[0].substring(1));
        const nextQuarter = (currentQuarter + int - 1 + 4) % 4 + 1;
        setDate(`Q${nextQuarter}`);
    }

    const buildDate = ({year, date}: {year: number, date: string}) => {
        console.log(currentType, 'building date for type');
        console.log(year, date, 'building date');
        if(currentType === "Yearly") {
            setDateState(`${year}-01-01`);
        }
        if(currentType === "Monthly") {
            const monthIndex = months.indexOf(date) + 1;
            setDateState(`${year}-${monthIndex.toString().padStart(2, '0')}-01`);
        }
        if(currentType === "Quarterly") {
            const quarter = date.substring(1);
            const startMonth = (Number(quarter) - 1) * 3 + 1;
            setDateState(`${year}-${startMonth.toString().padStart(2, '0')}-01`);
        }
    }

    const dateReset = () => {
        if(currentType === "Yearly") {
            setDate(new Date().getFullYear().toString());
        }
        if(currentType === "Monthly") {
            setDate(months[new Date().getMonth()]);
        }
        if(currentType === "Quarterly") {
            const quarter = Math.ceil((new Date().getMonth() + 1) / 3);
            setDate(`Q${quarter}`);
        }
    }

    const scrollTypeLeft = () => {
        const currentIndex = types.indexOf(currentType);
        const nextIndex = currentIndex === 0 ? types.length - 1 : currentIndex - 1;
        setCurrentType(types[nextIndex] as "Yearly" | "Quarterly" | "Monthly");
        setTypeState(types[nextIndex] as "Yearly" | "Quarterly" | "Monthly");
    };

    const scrollTypeRight = () => {
        const currentIndex = types.indexOf(currentType);
        const nextIndex = currentIndex === types.length - 1 ? 0 : currentIndex + 1;
        setCurrentType(types[nextIndex] as "Yearly" | "Quarterly" | "Monthly");
        setTypeState(types[nextIndex] as "Yearly" | "Quarterly" | "Monthly");
    }

    const scrollYearLeft = () => {
        getYear(-1);
    }

    const scrollYearRight = () => {
        getYear(1);
    }

    const scrollDateLeft = () => {
        if(currentType === "Monthly") {
            getMonth(-1);
        }
        if(currentType === "Quarterly") {
            getQuarter(-1);
        }
    }

    const scrollDateRight = () => {
        if(currentType === "Monthly") {
            getMonth(1);
        }
        if(currentType === "Quarterly") {
            getQuarter(1);
        }
    }

    useEffect(() => {
        dateReset();
    }, [currentType]);

    useEffect(() => {
        buildDate({year, date});
    }, [year, date]);

    return (
        <div className={style.selectorBlock}>
            <div className={style.scrollSelector}>
                <button type='button' onClick={scrollTypeLeft}><FontAwesomeIcon size={'2x'} icon={faCaretLeft} /></button>
                    <span>{currentType}</span>
                <button type='button' onClick={scrollTypeRight}><FontAwesomeIcon size={'2x'} icon={faCaretRight} /></button>
            </div>
            <div className={`${style.dateSelector} ${currentType === 'Yearly' ? style.singleLine : style.doubleLine}`}>
                {currentType !== 'Yearly' && 
                (<div className={style.scrollSelector} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <button type='button' onClick={scrollDateLeft}><FontAwesomeIcon size={'2x'} icon={faCaretLeft} /></button>
                        <span>{date}</span>
                    <button type='button' onClick={scrollDateRight}><FontAwesomeIcon size={'2x'} icon={faCaretRight} /></button>
                </div>
                )}
                <div className={style.scrollSelector} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <button type='button' onClick={scrollYearLeft}><FontAwesomeIcon size={'2x'} icon={faCaretLeft} /></button>
                        <span>{year}</span>
                    <button type='button' onClick={scrollYearRight}><FontAwesomeIcon size={'2x'} icon={faCaretRight} /></button>
                </div>
            </div>
        </div>
    )
}