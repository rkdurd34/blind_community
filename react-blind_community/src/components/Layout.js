import React from 'react';
import Loading from '../components/Loading';

import pack from '../css/components/layout';
import { useHistory } from "react-router-dom";
import { ArrowLeftOutlined, SearchOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';

import FooterImage from '../assets/img/footer.png';

export default function Layout({ children, BackButton, Logo, SearchButton, MyPageButton, PostButton, Headers }) {
  const history = useHistory();

  return (
    <pack.Wrapper>
      <pack.Container>
        {Headers && <pack.Header>
          <div className="left">
            <pack.BackButton display={BackButton} onClick={() => history.goBack()} >
              <ArrowLeftOutlined />
            </pack.BackButton>

            <pack.Logo display={Logo} onClick={() => history.push('/')}>Montent</pack.Logo>
          </div>
          <div className="right">
            <pack.SearchButton display={SearchButton} onClick={() => history.push('/search')}>
              <SearchOutlined />
            </pack.SearchButton>
            <pack.PostButton display={PostButton} onClick={() => history.push('/board/create')}>
              <EditOutlined />
            </pack.PostButton>
            <pack.MyPageButton display={MyPageButton} onClick={() => history.push('/mypage')}>
              <UserOutlined />
            </pack.MyPageButton>

          </div>
        </pack.Header>}
        <main>
          {children}
        </main>


      </pack.Container>
      <pack.Footer>
        <img src={FooterImage} alt="푸터 이미지"/>
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