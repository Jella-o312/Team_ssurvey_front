import { useState, useEffect } from "react";
import axios from "axios";
import Item from "../component/Item";

const Funsurvey = () => {
  const [funsurveyData, setFunsurveyData] = useState([]);

  useEffect(() => {
    axios.get("https://raw.githubusercontent.com/sungchunp/camping.json/main/data.json")
      .then((response) => {
        const funsurveyItems = response.data.filter((item) => item.category === "funsurvey");
        setFunsurveyData(funsurveyItems);
      })
  }, []);

  const [viewProduct, setViewProduct] = useState();
  let viewCamping = funsurveyData.slice(0, viewProduct);

  return (
    <>
      <div className="container text-center">
        <div className="row row-cols-3">
          {viewCamping.map((data, i) => (
            <div className="col" key={i}>
              <Item data={data} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Funsurvey;
