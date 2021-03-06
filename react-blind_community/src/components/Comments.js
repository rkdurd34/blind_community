import React, { useState } from 'react';
import { List, Avatar, Button, Skeleton } from 'antd';
import api from '../utils/api';
import pack from '../css/containers/postdetail';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

// const count = 3;
// const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;


const Comments = ({ list, handleMoreButton, setCommentList, canDelete, commentCount, currentComment }) => {

  // const [loading, setLoading] = useState(false);
  const { loading } = useSelector(({ loading }) => ({
    loading: loading.isLoading
  }), shallowEqual);

  const handleDeleteBtn = (no) => {
    api.customAPI(
      `delete`,
      `/board/comment/delete`,
      (data) => {
        setCommentList(list.filter((comment) => comment.no !== no));
      },
      { params: { comment_no: no } }
    );

  };
  const loadMore =
    !loading && commentCount > 4 && currentComment * 5 < commentCount ? (
      <pack.MoreWrap>
        <Button onClick={() => handleMoreButton()}>더보기</Button>
      </pack.MoreWrap>
    ) : null;

  return (
    <List
      className="demo-loadmore-list"
      loading={loading}
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={list}
      renderItem={item => {
        return (
          <List.Item
            actions={[
              (canDelete === item.user_no) ? <span key="list-loadmore-edit" onClick={() => handleDeleteBtn(item.no)} >삭제</span> : ``,
              // <a key="list-loadmore-more">more</a>
            ]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<span>{item.text}</span>}
                description={item.nickname + " | " + item.create_datetime}
              />
              {/* <div>content</div> */}
            </Skeleton>
          </List.Item>
        );
      }}
    />
  );
};

export default Comments;;
// class LoadMoreList extends React.Component {
//   state = {
//     initLoading: true,
//     loading: false,
//     data: [],
//     list: [],
//   };

//   componentDidMount() {
//     this.getData(res => {
//       this.setState({
//         initLoading: false,
//         data: res.results,
//         list: res.results,
//       });
//     });
//   }

//   getData = callback => {
//     reqwest({
//       url: fakeDataUrl,
//       type: 'json',
//       method: 'get',
//       contentType: 'application/json',
//       success: res => {
//         callback(res);
//       },
//     });
//   };

//   onLoadMore = () => {
//     this.setState({
//       loading: true,
//       list: this.state.data.concat([...new Array(count)].map(() => ({ loading: true, name: {} }))),
//     });
//     this.getData(res => {
//       const data = this.state.data.concat(res.results);
//       this.setState(
//         {
//           data,
//           list: data,
//           loading: false,
//         },
//         () => {
//           // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
//           // In real scene, you can using public method of react-virtualized:
//           // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
//           window.dispatchEvent(new Event('resize'));
//         },
//       );
//     });
//   };

//   render() {
//     const { initLoading, loading, list } = this.state;
//     const loadMore =
//       !initLoading && !loading ? (
//         <div
//           style={{
//             textAlign: 'center',
//             marginTop: 12,
//             height: 32,
//             lineHeight: '32px',
//           }}
//         >
//           <Button onClick={this.onLoadMore}>loading more</Button>
//         </div>
//       ) : null;

//     return (
//       <List
//         className="demo-loadmore-list"
//         loading={initLoading}
//         itemLayout="horizontal"
//         loadMore={loadMore}
//         dataSource={list}
//         renderItem={item => (
//           <List.Item
//             actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
//           >
//             <Skeleton avatar title={false} loading={item.loading} active>
//               <List.Item.Meta
//                 avatar={
//                   <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
//                 }
//                 title={<a href="https://ant.design">{item.name.last}</a>}
//                 description="Ant Design, a design language for background applications, is refined by Ant UED Team"
//               />
//               <div>content</div>
//             </Skeleton>
//           </List.Item>
//         )}
//       />
//     );
//   }
// }
