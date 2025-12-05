import { useEffect, useState } from "react";
import "./Editor.css"
import { emotionList , getFormattedDate } from "../util";
import Button from "./Button";
import { useNavigate } from "react-router";

const Editor = ({ initData, onSubmit }) => {
    const navigate = useNavigate();

    const handleGoBack = () => navigate(-1);

    const [state, setState] = useState({
        date: getFormattedDate(new Date()),
        emotionId: 3,
        content: "",
    });

    useEffect(() => {
        if(initData)
            setState({
                ...initData,
                date: getFormattedDate(new Date(initData.date)),
            });
    }, [initData]);

    // date 이벤트 핸들러
    const handleChangeDate = (e) => {
        setState({
            ...state,
            date: e.target.value,
        });
    };

    // content 이벤트 핸들러
    const handleChangeContent = (e) => {
        setState({
            ...state,
            content: e.target.value,
        });
    };

    // 작성완료 버튼 이벤트 핸들러
    const handleSubmit = () => {
        onSubmit(state);
    };

    // map을 이용해 <img>태그가 아닌 EmotionItem 컴포넌트를 반복
    const handleChangeEmotion = (emotionId) => {
        setState({...state, emotionId});
    };

    return (
        <div className="Editor">
            <div className="editor_section">
                {/* 날짜 */}
                <h4>오늘의 날짜</h4>
                <div className="input_wrapper">
                    <input type = "date" value = {state.date}
                            onChange={handleChangeDate}/>
                </div>
            </div>
            <div className="editor_section">
                {/* 감정 */}
                <h4>오늘의 감정</h4>
                   <div className="input_wrapper emotion_list_wrapper">
                        {/* {emotionList.map((it) => (
                            <img 
                                key = {it.id}
                                {...it}
                                onClick={handleChangeEmotion}
                                isSelected={state.emotionId === it.id}
                            />
                        ))} */}
                        {emotionList.map((it) => (
                          <img
                            key={it.id}
                            src={it.img}
                            alt={it.name}
                            onClick={() => handleChangeEmotion(it.id)}
                            className={state.emotionId === it.id ? "selected" : ""}
                          />
                        ))}
                </div>
            </div>
            <div className="editor_section">
                {/* 일기 */}
                <h4>오늘의 일기</h4>
                <div className="input_wrapper">
                    <textarea
                        placeholder="오늘은 어땠나요?"
                        value={state.content}
                        onChange={handleChangeContent}
                    />
                </div>
            </div>
            <div className="editor_section bottom_section">
                {/* 작성완료, 취소 */}
                <Button text = "취소하기" onClick={handleGoBack}/>
                <Button text = "작성 완료" type="positive" onClick={handleSubmit}/>
            </div>
        </div>
    );
};

export default Editor;