import React from 'react';
import Loading from '../components/Loading';

import pack from '../css/components/layout';
import { useHistory } from "react-router-dom";
import { ArrowLeftOutlined, SearchOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';

// import FooterImage from '../assets/img/footer.png';

export default function Layout({ children, BackButton, Logo, SearchButton, MyPageButton, PostButton, Headers }) {
  const history = useHistory();

  return (
    <pack.Wrapper>
      {Headers && <pack.Header>
        <div className="left">
          <pack.BackButton show={BackButton} onClick={() => history.goBack()} >
            <ArrowLeftOutlined />
          </pack.BackButton>

          <pack.Logo show={Logo} onClick={() => history.push('/')}>Montent</pack.Logo>
        </div>
        <div className="right">
          <pack.SearchButton show={SearchButton} onClick={() => history.push('/search')}>
            <SearchOutlined />
          </pack.SearchButton>
          <pack.PostButton show={PostButton} onClick={() => history.push('/board/create')}>
            <EditOutlined />
          </pack.PostButton>
          <pack.MyPageButton show={MyPageButton} onClick={() => history.push('/mypage')}>
            <UserOutlined />
          </pack.MyPageButton>

        </div>
      </pack.Header>}
      <pack.Container>

        <main>
          {children}
        </main>


      </pack.Container>
      <pack.Footer>
        {/* <img src={FooterImage} alt="푸터 이미지" /> */}
        푸터
      </pack.Footer>



      <Loading />

    </pack.Wrapper>
  );
}
Layout.defaultProps = {
  BackButton: true,
  Logo: true,
  SearchButton: true,
  MyPageButton: true,
  PostButton: true,
  Headers: true
};
