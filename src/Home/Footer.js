import './Footer.css';
import ssurveyLogo from '../ImsiLogo.svg';
import footerLogo from '../footerLogo.svg';

const Footer = () =>{
  return(
    <div className="footer-container">
      <div className='footer-top'>
        {/* <img className='footer-logo' src={ssurveyLogo} alt=''/> */}
        <img className='footer-logo' src={footerLogo} alt=''/>
        
      </div>
      <div className='ect-info'>
        <span>(주)SSURVEY ┃ 서울특별시 강서구 화곡로 149 505호 ┃ 팀장: 장성현 ┃ 팀원: 최예원, 함노명, 박성춘 ┃ 사업자등록번호 : 123-12-12345 ┃ 고객센터 : 1599-7855 ┃ 이메일 : ssurvey_cs@ssurvey.com</span>
        <span></span>
        <div>Copyright ©2023 ssurvey Inc. All Rights Reserved.</div>
      </div>
      
    </div>
  )
}

export default Footer;

