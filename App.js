import React, { useState, useEffect } from 'react';
import './App.css';
import { Button, Modal } from 'antd';
import axios from "axios";

function App() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [order, setOrder] = useState({});

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // useEffects

  useEffect(() => {
    const fetchOrder = async () => {
      try { 
        const response = await axios.get(
          `https://eb863a74-7a4e-4daf-9540-d2db8470c18e.mock.pstmn.io/marketplace/orders/${123}`
        );
        setOrder(response.data); 
      } catch (error) {
        console.log(error); 
      }
    };
    fetchOrder();
  }, []);

  const acceptOrder = async () => {
    try {
      const response = await axios.post(
        `https://eb863a74-7a4e-4daf-9540-d2db8470c18e.mock.pstmn.io/marketplace/orders/${123}/accept`
      );
      console.log(response);
      handleCancel();
    } catch (error) {
      console.log(error);
    }
  };

  const declineOrder = async () => {
    try {
      const response = await axios.post(
        `https://eb863a74-7a4e-4daf-9540-d2db8470c18e.mock.pstmn.io/marketplace/orders/${123}/decline`
      );
      console.log(response);
      handleCancel();
    } catch (error) {
      console.log(error);
    }
  };

  // if (!isModalOpen) return null;
  console.log(order)
  // console.log(order.listing.model.displayName)
  // console.log(order.listing.images[0].image.url)

  return (
    <div className="App">
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal title="CONGRATS!"   open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p className="thickk">"Your watch is sold!"</p>
        {isModalOpen ? <>
        
        <p className="thick">{order.listing.model.brand.name} {order.listing.model.displayName} {order.listing.model.referenceNumber}
        <br/> {order.listing.condition} / {order.listing.manufactureYear} </p>
        <img src={order.listing.images[0].image.url} alt="image"></img>
        <hr></hr>
        <p className='rounded-3'>Selling Price   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  &#36;{order.salePriceCents}<br/>Level 1 Comission (6.5%)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &#36;{order.commissionRateBips} <br/>
        Seller fee  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   &#36;{order.sellerFeeCents}<br/>Insured Shipping &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Free<br/> Bezel authentication  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Free</p>
        <hr></hr>
        <p className="thick">Earnings &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &#36;{order.payoutAmountCents}</p>
        <hr></hr>
        <p className="style">You have 1 business day to accept the sale. If you do not accept, it will be automatically

rejected.</p>
        <Button onClick={() => acceptOrder()}>Accept Order</Button><br/>
        <Button onClick={() => declineOrder()}>Decline Order</Button>
        </> : <></>}
      </Modal>
    </div>
  );
}

export default App;
