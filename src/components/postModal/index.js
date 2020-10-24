import React, { useState, useEffect } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import { Card, Typography, Modal } from '@material-ui/core'

const rand = () => Math.round(Math.random() * 20) - 10
const getModalStyle = () => {
  const top = 50 + rand()
  const left = 50 + rand()

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    maxHeight: 540,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  headline: {
    marginBottom: theme.spacing(2),
  },
  audio: {
    width: '100%',
  },
  textSection: {
    height: 400,
    overflow: 'scroll',
  },
}))

const PostModal = ({ item, onClose }) => {
  const classes = useStyles()
  const [modalStyle] = useState(getModalStyle)
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    setOpened(Boolean(item))
  }, [item])

  const handleClose = () => {
    setOpened(false)
    onClose()
  }

  return (
    <div>
      <Modal
        open={opened}
        onClose={handleClose}
      >
        {
          item && (
            <Card style={modalStyle} className={classes.paper}>
              <div className={classes.headline}>
                <audio controls className={classes.audio}>
                  <source src={item.url} type="audio/mpeg" />
                </audio>
              </div>

              <div className={classes.textSection}>
                <Typography>
                  {item.text}
                </Typography>
              </div>
            </Card>
          )
        }
      </Modal>
    </div>
  )
}

export default PostModal
