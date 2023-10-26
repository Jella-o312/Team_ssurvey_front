import { useEffect, useState } from "react";
import axios from "axios";
import Item from "../component/Item";

const MyPage = () => {
  const [mypageData, setMyPageData] = useState([]);

  useEffect(() => {
    axios.get("https://raw.githubusercontent.com/sungchunp/camping.json/main/data.json")
      .then((response) => {
        const mypageItems = response.data.filter((item) => item.category === "mypage");
        setMyPageData(mypageItems);
      })
  }, []);

  const [viewProduct, setViewProduct] = useState();
  let viewCamping = mypageData.slice(0, viewProduct);

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

export default MyPage;
