import { Carousel } from 'flowbite-react';
export default function Slideshow({i}) {
  if (i==0){
    return (
      <Carousel>
      <img
        alt="..."
        src="https://i.ytimg.com/vi/zD3_fi_mMIA/maxresdefault.jpg"
      />
      <img
        alt="..."
        src="https://i.ytimg.com/vi/kh2pJzzYKk4/maxresdefault.jpg"
      />
      <img
        alt="..."
        src="https://i.ytimg.com/vi/-xgzI2Cl0dI/maxresdefault.jpg"
      />
    </Carousel> 
    )
  }
  return (
    <Carousel>
      <img
        alt="..."
        src="https://www.axisbank.com/images/default-source/revamp_new/my-offers/axis-bank-home-loan-banner-360x321-v4.jpg"
      />
      <img
        alt="..."
        src="https://www.axisbank.com/images/default-source/revamp_new/my-offers/axis-bank-fixed-deposits-on-whatsapp-banking-360x321-v1.jpg"
      />
      <img
        alt="..."
        src="https://s7ap1.scene7.com/is/image/Targetaxisbank/Whatsapp%20banking%20_%20MyOffer%20_banner_Size_360%20x%20321"
      />
    </Carousel>
  )
}


