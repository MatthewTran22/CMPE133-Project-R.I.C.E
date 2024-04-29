import { useState } from 'react'
import { useParams } from 'react-router-dom'

function ResetPwd() {
  const { token } = useParams();
  const [password, setPassword] = useState("");


  return (
    <div>

    </div>
  )
}

export default ResetPwd