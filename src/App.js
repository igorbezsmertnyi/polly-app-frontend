import React, { useEffect } from 'react'
import { Container, CircularProgress } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'

import List from './components/postsList'
import Form from './components/form/index'

import useLambda from './hook/useLambda'

const useStyles = makeStyles((theme) =>
  createStyles({
    loader: {
      display: 'flex',
      justifyContent: 'center',
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
  }),
)

const App = () => {
  const classes = useStyles()
  const { fetchList, putItem } = useLambda()

  useEffect(() => {
    fetchList.request()
  }, [])

  const onSubmit = (data) => {
    putItem.request(data)
  }

  return (
    <Container maxWidth="sm">
      {
        fetchList.data ? <List items={fetchList.data} /> : (
          <div className={classes.loader}>
            <CircularProgress />
          </div>
        )
      }

      <Form
        fetched={Boolean(putItem.data)}
        onSubmit={onSubmit}
        loading={putItem.loading}
      />
    </Container>
  );
}

export default App
