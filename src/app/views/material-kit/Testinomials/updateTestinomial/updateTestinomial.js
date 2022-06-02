import { Button, Grid } from '@mui/material'
import { Span } from 'app/components/Typography'
import React, { useEffect, useState } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import { styled } from '@mui/system'
import axios from 'axios'
import { useParams, useLocation, useNavigate, Navigate } from 'react-router-dom'
import { green } from '@mui/material/colors'
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

const JwtTitle = styled('div')(() => ({
    fontSize: '10px',
    textAlign: 'center',
    margin: '0',
}))

const UpdateTestinomial = () => {
    const id1 = useParams()
    const id = id1.id
    const navigate = useNavigate()

    const [update, setUpdate] = useState({
        timage: '',
        name: '',
        review: '',
        designation: '',
        status: '',
    })
    const [data, setData] = useState([{}])

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

        setUpdate(() => {
            return {
                ...update,
                [name]: value,
            }
        })
    }

    const handlePhoto = (e) => {
        setUpdate(() => {
            return { ...update, timage: e.target.files[0] }
        })
    }

    const updateData = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('timage', update.timage)
        formData.append('name', update.name)
        formData.append('review', update.review)
        formData.append('designation', update.designation)
        formData.append('status', update.status)

        const res = await axios.patch(
            `http://localhost:8000/updatetestinomial/${id}`,
            formData
        )

        setSuccess(res.data.message)
        setUpdate({
            timage: '',
            name: '',
            review: '',
            designation: '',
            status: '',
        })
        setTimeout(() => {
            navigate('/material/testinomialdata')
        }, 500)
    }

    useEffect(() => {
        const loadData = async () => {
            const result = await fetch(
                `http://localhost:8000/testinomialdata/${id}`
            )
            const response = await result.json()
            setData(response)
            setUpdate({
                timage: response.timage,
                name: response.name,
                review: response.review,
                designation: response.designation,
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
                Edit Post
            </h1>
            <JwtTitle>
                <ValidatorForm onSubmit={updateData}>
                    <img
                        src={data.thumbimage}
                        name="oldimage"
                        className="float-start"
                    />
                    <TextField
                        accept="image/*"
                        type="file"
                        onChange={handlePhoto}
                        name="newsimage"
                        errorMessages={['this field is required']}
                    />
                    <TextField
                        label="Name"
                        onChange={handleChange}
                        type="text"
                        name="name"
                        id="name"
                        value={update.name}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                    <TextField
                        label="Review"
                        onChange={handleChange}
                        type="text"
                        name="review"
                        id="review"
                        value={update.review}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                    <TextField
                        label="Designation"
                        onChange={handleChange}
                        type="text"
                        name="designation"
                        id="designation"
                        value={update.designation}
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

export default UpdateTestinomial
