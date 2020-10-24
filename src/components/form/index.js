import React, { useState, useEffect } from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles'

import { CircularProgress, Button, FormControl, TextField, InputLabel, Select, MenuItem } from '@material-ui/core'

import { voices } from '../../constants/voices'

const useStyles = makeStyles((theme) =>
  createStyles({
    wrapper: {
      display: 'flex',
      flexDirection: 'column'
    },
    formControl: {
      margin: theme.spacing(1),
      marginBottom: theme.spacing(2),
      minWidth: 120,
    },
    buttonWrapper: {
      margin: theme.spacing(1),
      position: 'relative',
    },
    buttonProgress: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
    button: {
      width: '100%',
    },
  }),
);

const Form = ({ onSubmit, loading, fetched }) => {
  const classes = useStyles()
  const [currentLang, setCurrentLang] = useState('')
  const [currentVoice, setCurrentVoice] = useState('')
  const [text, setText] = useState('')
  const languages = [ ...new Set(voices.map(voice => voice.lang)) ]

  useEffect(() => {
    if (!currentVoice) {
      setCurrentVoice(voices[0].value)
      setCurrentLang(voices[0].lang)
    }
  }, [])

  useEffect(() => {
    if (fetched) {
      setText('')
    }
  }, [fetched])

  const filterVoicesByLanguage = (lang) => {
    return voices.filter(voice => voice.lang === lang)
  }

  const handleChangeVoice = (event) => {
    setCurrentVoice(event.target.value)
  }

  const handleChangeLang = (event) => {
    setCurrentLang(event.target.value)
    setCurrentVoice(filterVoicesByLanguage(event.target.value)[0].value)
  }

  const handleChangeText = (event) => {
    setText(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!currentVoice || !text) return
    onSubmit({ voice: currentVoice, text })
  }

  return (
    <div className={classes.wrapper}>
      <FormControl className={classes.formControl}>
        <InputLabel id="language">Language</InputLabel>
        <Select
          labelId="language"
          id="language-select"
          value={currentLang}
          onChange={handleChangeLang}
        >
          {
            languages.map(language => (
              <MenuItem value={language} key={language}>{language}</MenuItem>
            ))
          }
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <InputLabel id="voice">Voice</InputLabel>
        <Select
          labelId="voice"
          id="voice-select"
          value={currentVoice}
          onChange={handleChangeVoice}
        >
          {
            filterVoicesByLanguage(currentLang).map(voice => (
              <MenuItem value={voice.value} key={voice.value}>{voice.label}</MenuItem>
            ))
          }
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>
        <TextField
          labelId="standard-multiline-static"
          multiline
          label="Text"
          rows={10}
          value={text}
          onChange={handleChangeText}
        />
      </FormControl>

      <div className={classes.buttonWrapper}>
        <Button
          className={classes.button}
          color="primary"
          variant="contained"
          disabled={loading}
          onClick={handleSubmit}
        >
          Synthesize
        </Button>

        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
    </div>
  )
}

export default Form
