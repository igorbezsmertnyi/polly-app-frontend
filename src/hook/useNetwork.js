import { useState, useEffect } from 'react'

const useLambda = (callback) => {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const fetch = async (data=null) => {
    setLoading(true)
    const result = await callback(data)
    setResult(result)
  }

  useEffect(() => {
    setLoading(false)
  }, [result])

  return [
    fetch,
    result,
    loading,
  ]
}

export default useLambda
