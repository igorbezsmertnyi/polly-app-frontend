import instance from './instance'

export const retrieveItems = async () => {
  const { data } = await instance.get('/')
  return data
}

export const putItem = async (item) => {
  const { data } = await instance.post('/', { ...item })
  return data
}
