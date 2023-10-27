import { useState, useEffect } from "react";
import axios from "axios";
import Item from "../component/Item";

//카테고리 8개의 코드 -> 한개의 코드로 수정하기

const Survey = () => {
  const [surveyData, setSurveyData] = useState([]);
  const [sqQuestion] = useState();

  useEffect(() => {
    axios.get("https://raw.githubusercontent.com/sungchunp/camping.json/main/data.json")
      .then((response) => {
        const surveyItems = response.data.filter((item) => item.category === "survey");
        setSurveyData(surveyItems);
      })
  }, []);

  let viewSurvey = surveyData.slice(0, sqQuestion);

  return (
    <>
      <div className="container text-center">
        <div className="row row-cols-3">
          {viewSurvey.map((data, i) => (
            <div className="col" key={i}>
              <Item data={data} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Survey;
