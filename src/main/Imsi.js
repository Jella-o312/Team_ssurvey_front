const Imsi = () =>{
  return(
    <div className="imsiContainer" style={{backgroundColor : "yellow"}}>
      <h1>dddd</h1>
      <div className="imsiBox crfff"
        style={{
          border: "1px solid gray",
          width: "1320px",
          display: "grid",
          alignItems: "center",
          gridTemplateColumns : "repeat(3,1fr)",
          textAlign : "center"
        }}
      >
        
        <div style={{border: "1px solid red", margin: "0 5px"}}>
          박스
        </div>
        <div style={{border: "1px solid red", margin: "0 5px"}}>
          박스
        </div>
        <div style={{border: "1px solid red", margin: "0 5px"}}>
          박스
        </div>
      </div>
    </div>
  );
}

export default Imsi;