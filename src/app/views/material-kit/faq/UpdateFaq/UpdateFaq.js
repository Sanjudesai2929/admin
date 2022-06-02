import { Button, Grid } from '@mui/material'
import { Span } from 'app/components/Typography'
import React, { useEffect, useState } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import { styled } from '@mui/system'
import { NavLink, useParams, useNavigate } from 'react-router-dom'
import { amber, green } from '@mui/material/colors'
import { Alert, Snackbar } from '@mui/material'

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

const UpdateFaq = () => {
    const id1 = useParams()
    const id = id1.id
    const navigate = useNavigate()

    const [update, setUpdate] = useState({
        question: '',
        answer: '',
        status: '',
    })

    const [open, setOpen] = React.useState(false)
    const [success, setSuccess] = useState()

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

        setUpdate((preValue) => {
            return {
                ...preValue,
                [name]: value,
            }
        })
    }

    const updateData = async (e) => {
        e.preventDefault()

        const { question, answer, status } = update

        const res = await fetch(`http://localhost:8000/editDetails/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question, answer, status }),
        })

        const data = await res.json()

        setSuccess(data.message)
        setTimeout(() => {
            navigate('/material/faqdata')
        }, 500)
    }

    useEffect(() => {
        const loadData = async () => {
            const result = await fetch(`http://localhost:8000/datatables/${id}`)
            const response = await result.json()

            setUpdate({
                question: response.question,
                answer: response.answer,
                status: response.status,
            })
        }
        loadData()
    }, [])

    return (
        <div className="container-fluid">
            <h1
                style={{
                    fontSize: '25px',
                    textAlign: 'center',
                    marginTop: '20px',
                }}
            >
                How can we help you?
            </h1>
            <JwtTitle>
                <ValidatorForm onSubmit={updateData}>
                    <TextField
                        type="text"
                        name="question"
                        id="question"
                        onChange={handleChange}
                        value={update.question}
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
                        value={update.answer}
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
                                className="group"
                                value={update.status}
                                onChange={handleChange}
                            >
                                <Grid>
                                    <FormControlLabel
                                        value="active"
                                        name="status"
                                        control={<Radio />}
                                        label="Active"
                                    />

                                    <FormControlLabel
                                        value="inactive"
                                        name="status"
                                        control={<Radio />}
                                        label="Inactive"
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
                        <Span
                            sx={{
                                textTransform: 'capitalize',
                            }}
                        >
                            Update
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
                                    update Successfully
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

export default UpdateFaq
