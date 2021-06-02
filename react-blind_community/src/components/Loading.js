import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
// import * as loadingActions from '../store/modules/loading';
import pack from '../css/components/loading';
import { Spin } from 'antd';
export default function Loading() {

  const { isLoading } = useSelector(({ loading }) => ({
    isLoading: loading.isLoading
  }), shallowEqual);
  return (

    <pack.Container isLoading={isLoading}>
      <pack.SpinWrap><Spin> </Spin></pack.SpinWrap>
    </pack.Container>
  );
}
