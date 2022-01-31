import { useState, useEffect } from "react";

export default function useFetch(url) {

    // 더미데이터 삭제
    // 처음엔 빈 배열로 만들고 API에서 리스트를 가져와서 바꿔주는 방식
    
    const [data, setData] = useState([]); // 여기까지하면 youtuber가 안뜸, useEffect써야됨

    // useEffect는 어떤 상태 값이 바뀌었을 때 동작하는 함수를 작성할 수 있음
    useEffect(() => {
        fetch(url, {
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(res => {
            // return console.log(res);
            return res.json();
        })
        .then(data => {
            setData(data);
        });
    },[url]);

    return data;
}