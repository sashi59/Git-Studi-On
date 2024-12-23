import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserData } from '../../context/UserContext';

const Verify = () => {
  const [otp, setOtp] = useState("");
  const {btnLoading ,verifyOtp} =  UserData();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await verifyOtp(otp, navigate);
  }


  return (
    <div className="min-h-96 pb-5" onSubmit={handleSubmit}>
    <form className="form signup-form text-black">
      <h2 className="text-4xl font-bold text-center">Verification</h2>
      {/* <p className='text-green-600'>Otp succesfully send to your gmail !</p> */}
      <label className="input input-bordered flex items-center gap-2">
        Otp
        <input type="number" className="grow" value={otp} onChange={e=> setOtp(e.target.value)} placeholder="XXXXXX" />
      </label>
      <button className="btn btn-neutral text-white mt-2" disabled={btnLoading} type="submit">
        {btnLoading?"Please wait...": "Verify Otp"}
      </button>

    </form>
  </div>
  )
}

export default Verify