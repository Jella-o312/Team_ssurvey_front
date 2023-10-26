import { useNavigate } from "react-router-dom";


const Item = ({ data }) => {
  const navigate = useNavigate();
  

  return (
    <div className="cam-3" onClick={() => {
      navigate('/detail/' + data.id);
      }}>
      <img src={`https://raw.githubusercontent.com/sungchunp/image/main/${data.title}.jpg`}
      style={{ width: '50%' }} alt="product" />
      <h4>{data.title}</h4>
      <p>{data.time + '분'}</p>
      <p>{data.surveyCount + '명'}</p>
    </div>
  );
}

export default Item;