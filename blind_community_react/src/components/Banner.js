import React from 'react';
import pack from '../css/components/banner';
import banner from '../assets/img/banner_cass.jpeg';
import banner2 from '../assets/img/banner_soju.jpeg';
export default function Banner() {
  return (
    <pack.Container>
      <img src={banner2} />
    </pack.Container>
  );
}
