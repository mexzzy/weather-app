import { styled } from "styled-components";
export default function Footer() {
  return (
    <div>
      <FooterWrapper>
        <div>
          <div>MeTech</div>|<div>Weather Update &copy; 2023 copyright</div>
        </div>
      </FooterWrapper>
    </div>
  );
}
const FooterWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 15px 0;
  justify-content: center;
  font-size: 14px;
  @media (max-width: 768px) {
    font-size: 10px;
  }
  div {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #fff;
  }
`;
