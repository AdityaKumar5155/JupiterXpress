import React, { useState } from 'react'

const ResetPassword = () => {
    const INITIAL_STATE = {
        email : '',
        otp : '',
        newPassword : '',
        confirmNewPassword : ''
    }
    const [formData, setFormData] = useState(INITIAL_STATE)

    const handleOtp = async (e) => {
        e.preventDefault();
        await fetch('/.netlify/functions/sendResetPassword', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({email : formData.email}),
        }).then(response => response.json()).then(result => alert(result.message))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmNewPassword) {
            alert('New password must match the Confirm new password')
            return;
        }
        await fetch('/.netlify/functions/verifyResetPassword', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify(formData),
        }).then(response => response.json()).then(result => alert(result.message))
        setFormData(INITIAL_STATE)
    }
    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div className="absolute bg-white  py-16 inset-0 flex flex-col items-center justify-center overflow-x-hidden overflow-y-auto">
    <div className='max-w-96 p-8 flex flex-col items-center relative'>
        <p className='absolute top-3 right-3 text-black z-50'>X</p>
    <div className='text-center text-3xl font-medium text-black mb-8'>Reset your password</div>
    <form action="" onSubmit={handleSubmit} className="w-full sm:w-auto flex px-3 flex-col mt-3 space-y-3 sm:space-y-5 text-black">
          <input type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} name="email" className="py-2 px-3 border-black rounded-xl w-full sm:w-[400px]" />
          <button onClick={handleOtp} className="py-2 px-3 rounded-xl  w-full sm:w-[400px] border border-black  hover:bg-[rgba(135,206,235,1)]">Request OTP</button>
          <input type="text" placeholder="OTP" name="otp" value={formData.otp} onChange={handleChange} className="py-2 px-3 rounded-xl border-black w-full sm:w-[400px]"/>
          <input type="password" placeholder="New Password" name="newPassword" value={formData.newPassword} onChange={handleChange} className="border-black py-2 px-3 rounded-xl  w-full sm:w-[400px]"/>
          <input type="password" placeholder="Confirm New Password" name="confirmNewPassword" value={formData.confirmNewPassword} onChange={handleChange} className="py-2 border-black px-3 rounded-xl  w-full sm:w-[400px]"/>
          <button type="submit" className="py-2 px-3 rounded-xl  w-full sm:w-[400px] border border-black  hover:bg-[rgba(135,206,235,1)]">Change password</button>
        </form>
    </div>
  </div>
  )
}

export default ResetPassword
