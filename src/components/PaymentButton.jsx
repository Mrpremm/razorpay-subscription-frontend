import axios from 'axios';
const PaymentButton=()=>{

  const courseId="course-101";
  const amount=500;
   const handlePayment=async()=>{
    const{data}=await axios.post(
      "http://localhost:4000/api/payment/create-order",
      {amount,courseId}
    );

    const options={
      key:"rzp_test_Rxph1ISYSI9DKK",
      amount:data.order.amount,
      currency:"INR",
      name:"Online Course",
      description:"Course Subscription",
      order_id:data.order.id,
      handler:async function (response) {
        await axios.post(
          "http://localhost:4000/api/payment/verify-payment",
          response
        );
        alert("Payment Successful");
      }
    }
    const razor=new window.Razorpay(options);
    razor.open();
   };
   return(
    <div>
      <h2>Course ID:{courseId}</h2>
      <h3>Amount:${amount}</h3>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
   );
};

export default PaymentButton;
