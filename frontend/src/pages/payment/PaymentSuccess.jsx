import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "./PaymentSuccess.css"

const PaymentSuccess = ({user}) => {

    const navigate = useNavigate()
    const handleRedirect = () => {
        
        navigate("/");
      };

    const params = useParams();
  return (
    <div className="payment-success-container">
      <div className="payment-success-card">
        <h1 className="success-title">Payment Successful!</h1>
        <p className="success-message">
          Thank you for your payment, <span className="highlight">{user.name}</span>!
        </p>
        <div className="details-container">
          <p className="detail">
            <strong>Payment Reference:</strong> {params.id}
          </p>
        </div>
        <button className="redirect-btn" onClick={handleRedirect}>
          Go to Homepage
        </button>
      </div>
    </div>
  )
}

export default PaymentSuccess