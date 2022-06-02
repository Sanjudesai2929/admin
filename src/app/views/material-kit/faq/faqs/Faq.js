import { Button, Icon, Grid } from '@mui/material'
import { Span } from 'app/components/Typography'
import React, { useEffect, useState } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import { amber, green } from '@mui/material/colors'
import { styled } from '@mui/system'
import { Alert, Snackbar } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const TextField = styled(TextValidator)(() => ({
    width: '40%',
    marginBottom: '15px',
}))

const ContentRoot = styled('div')(({ theme }) => ({
    '& .success': {
        backgroundColor: green[600],
    },
    '& .icon': {
        fontSize: 20,
    },
    '& .iconVariant': {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    '& .message': {
        display: 'flex',
        alignItems: 'center',
    },
    '& .margin': {
        margin: theme.spacing(1),
    },
}))

const RadioRoot = styled('div')(({ theme }) => ({
    // display: 'flex',
    '& .formControl': {
        marginRight: theme.spacing(3),
        marginLeft: theme.spacing(3),
    },
    '& .group': {
        margin: theme.spacing(1, 0),
    },
}))

const JwtTitle = styled('p')(() => ({
    fontSize: '10px',
    textAlign: 'center',
    margin: '0',
}))

const Faq = () => {
    const [state, setState] = useState({
        question: '',
        answer: '',
        status: '',
    })
    const [open, setOpen] = React.useState(false)
    const [success, setSuccess] = useState()
    const navigate = useNavigate()

    function handleClick() {
        setOpen(true)
    }
    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }

    const handleChange = (event) => {
        const value = event.target.value
        const name = event.target.name

        setState((preValue) => {
            return {
                ...preValue,
                [name]: value,
            }
        })
    }

    const PostData = async (e) => {
        // e.preventDefault()

        const { question, answer, status } = state

        const res = await fetch('http://localhost:8000/faq', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question, answer, status }),
        })

        const result = await res.json()

        setSuccess(result.message)
        setState({ question: '', answer: '', status: '' })
        // window.location.href = '/material/faqdata'

        setTimeout(() => {
            navigate('/material/faqdata')
        }, 500)
    }

    return (
        <div className="container-fluid">
            <h1
                style={{
                    fontSize: '25px',
                    textAlign: 'center',
                    marginTop: '20px',
                    // margin: '10px',
                }}
            >
                How can we help you?
            </h1>
            <JwtTitle>
                <ValidatorForm onSubmit={PostData}>
                    <TextField
                        type="text"
                        name="question"
                        id="question"
                        onChange={handleChange}
                        value={state.question}
                        validators={['required']}
                        label="Please Ask your question"
                        errorMessages={['this field is required']}
                    />
                    <TextField
                        label="Answer"
                        onChange={handleChange}
                        type="text"
                        name="answer"
                        id="answer"
                        value={state.answer}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />

                    <RadioRoot>
                        <FormControl
                            component="fieldset"
                            className="formControl"
                        >
                            <RadioGroup
                                aria-label="Gender"
                                name="gender1"
                                className="group"
                                onChange={handleChange}
                            >
                                <Grid>
                                    <FormControlLabel
                                        value="active"
                                        name="status"
                                        control={<Radio />}
                                        label="Active"
                                        // onChange={handleChange}
                                    />

                                    <FormControlLabel
                                        value="inactive"
                                        name="status"
                                        control={<Radio />}
                                        label="Inactive"
                                        // onChange={handleChange}
                                    />
                                </Grid>
                            </RadioGroup>
                        </FormControl>
                    </RadioRoot>

                    <br />

                    <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                        onClick={handleClick}
                    >
                        <Icon>send</Icon>
                        <Span
                            sx={{
                                pl: 1,
                                textTransform: 'capitalize',
                            }}
                        >
                            Submit
                        </Span>
                    </Button>

                    {success ? (
                        <ContentRoot>
                            <Snackbar
                                open={open}
                                autoHideDuration={6000}
                                onClose={handleClose}
                            >
                                <Alert
                                    onClose={handleClose}
                                    severity="success"
                                    sx={{ width: '100%' }}
                                    variant="filled"
                                >
                                    Your response was successfully
                                </Alert>
                            </Snackbar>
                        </ContentRoot>
                    ) : (
                        <ContentRoot>
                            <Snackbar
                                open={open}
                                autoHideDuration={6000}
                                onClose={handleClose}
                            >
                                <Alert
                                    onClose={handleClose}
                                    severity="error"
                                    sx={{ width: '100%' }}
                                    variant="filled"
                                >
                                    Failed your request!
                                </Alert>
                            </Snackbar>
                        </ContentRoot>
                    )}
                </ValidatorForm>
            </JwtTitle>
        </div>
    )
}

export default Faq
