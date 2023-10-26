import { useEffect, useState } from "react";
import axios from "axios";
import Item from "../component/Item";

const FAQ = () => {
  const [faqData, setFAQData] = useState([]);

  useEffect(() => {
    axios.get("https://raw.githubusercontent.com/sungchunp/camping.json/main/data.json")
      .then((response) => {
        const faqItems = response.data.filter((item) => item.category === "faq");
        setFAQData(faqItems);
      })
  }, []);

  const [viewProduct, setViewProduct] = useState();
  let viewCamping = faqData.slice(0, viewProduct);

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

export default FAQ;
