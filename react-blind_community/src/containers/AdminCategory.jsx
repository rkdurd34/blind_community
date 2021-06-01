
import Layout from '../components/AdminLayout'

import pack from '../css/containers/admincategory'
import React, { useState } from 'react';
import { Table,Button } from 'antd';

import AddModal from '../components/Modal'
import EditModal from '../components/Modal'



const data= [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
  },
];



const AdminCategory = ({ history, auth, title }) => {
    const [openEditModal,setOpenEditModal] = useState(false)
    const [openAddModal,setOpenAddModal] = useState(false)

    const [selectedRowKeys, setSelectedRowKeys] = useState(data)
    
    const rowSelection = {
        // selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
          // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          
        },
        getCheckboxProps: (record) => {
          return {
              disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name}
        },
    };

      const columns = [
        {
          title: '번호',
          dataIndex: 'no',
          render: (text) => <a>{text}번</a>,
        },
        {
          title: '카테고리명',
          dataIndex: 'name',
        },
        {
          title: '아이콘',
          dataIndex: 'icon',
        },
        {
          title: '최초생성일',
          dataIndex: 'icon',
        },
        {
          title: '최종변경일',
          dataIndex: 'icon',
        },
        {
          title: '위치',
          dataIndex: 'sort',
        },
        {
          title: '',
          dataIndex: 'edit',
          render: (text) => <Button onClick = {()=>setOpenEditModal(true)}>수정</Button>,
        },
      ];
    return (
        <Layout history={history} auth={auth} title={title}>
            <pack.Container>
            <pack.ButtonSection>
                <div className="title">
                    카테고리 목록
                </div>
                <div className="button-tab">
                <Button onClick = {()=>setOpenAddModal(true)} type="primary">추가</Button>
                <Button type="primary">삭제</Button>
                </div>
                
            </pack.ButtonSection>
            <Table
            bordered
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />


            </pack.Container>
            <EditModal
            title ={"카테고리 수정"}
            open = {openEditModal}
            onClose = {()=>setOpenEditModal(false)}
            >
                <div>얍얍</div>
            </EditModal>
            <AddModal
            title ={"카테고리 추가"}
            open = {openAddModal}
            onClose = {()=>setOpenAddModal(false)}
            >
                <div>얍얍</div>
            </AddModal>
        </Layout>
    )
}

export default AdminCategory