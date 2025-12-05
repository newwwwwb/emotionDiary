import {useContext, useEffect, useState} from "react";
import Button from "../components/Button";
import Editor from "../components/Editor";
import Header from "../components/Header";
import { DiaryStateContext } from "../contexts/Diarycontext";
import { getMonthRangeByDate } from "../util";
import DiaryList from "../components/DiaryList";

const Home = () => {
    const data = useContext(DiaryStateContext);
    const [pivotDate, setPivotDate] = useState(new Date());
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        if(data.length >= 1) {
            const { beginTimeStamp, endTimeStamp } = getMonthRangeByDate(pivotDate);
            setFilteredData(
                data.filter(
                    (it) => beginTimeStamp <= it.date && it.date <= endTimeStamp
                )
            );
        } else {
            setFilteredData([]);
        }
    }, [data, pivotDate]);

    // 버튼 기능 구현
    const onIncreaseMonth = () =>
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1) );
    
    const onDecreaseMonth = () =>
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1) );

    const headerTitle = `${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`;

    return (
        <div>
            <Header
                title = {headerTitle}
                leftChild={
                    <Button text = {"<"} onClick={onDecreaseMonth}/>
                }
                rightChild={
                    <Button text = {">"} onClick={onIncreaseMonth} />
                }
            />
            <DiaryList data = {filteredData} />
        </div>
    );
};

export default Home;