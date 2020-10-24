import useNetwork from './useNetwork'
import { retrieveItems, putItem } from '../api'

const useLambda = () => {
  const [fetchRequest, listData, listLoading] = useNetwork(retrieveItems)
  const [putRequest, itemData, itemLoading] = useNetwork(putItem)

  return {
    fetchList: { request: fetchRequest, data: listData, loading: listLoading },
    putItem: { request: putRequest, data: itemData, loading: itemLoading },
  }
}

export default useLambda
