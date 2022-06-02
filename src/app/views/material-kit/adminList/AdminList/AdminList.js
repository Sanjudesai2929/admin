import {
    Button,
    Icon,
    Radio,
    RadioGroup,
    FormControlLabel,
} from '@mui/material'
import { styled } from '@mui/system'
import { Breadcrumb, SimpleCard } from 'app/components'
import { Span } from 'app/components/Typography'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { green } from '@mui/material/colors'
import { Alert, Snackbar } from '@mui/material'
import axios from 'axios'
import FormControl from '@mui/material/FormControl'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import { Box } from '@mui/system'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const TextField = styled(TextValidator)(() => ({
    width: '50%',
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

const JwtTitle = styled('div')(() => ({
    fontSize: '10px',
    textAlign: 'center',
    margin: '0',
}))
const JwtCheckBox = styled('div')(() => ({
    width: '50%',
    marginLeft: '390px',
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

const AdminList = () => {
    const [state, setState] = useState({
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        status: '',
        adminrole: [],
    })

    const position1 = [
        'FAQ',
        'NEWS',
        'Testinomial',
        'Image Category',
        'Image Gallery',
        'Model Popup',
    ]

    const [check, changecheck] = useState({
        FAQ: false,
        NEWS: false,
        Testinomial: false,
        'Image Category': false,
        'Image Gallery': false,
        'Model Popup': false,
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
        const { name, value } = event.target

        setState(() => {
            return {
                ...state,
                [name]: value,
            }
        })
    }

    const handleChanges = (event) => {
        const { value, checked } = event.target
        check[value] = checked
        changecheck(check)

        var p = Object.keys(check).filter((x) => {
            return check[x]
        })

        setState(() => {
            return {
                ...state,
                adminrole: p,
            }
        })
    }
    const postData = async (e) => {
        e.preventDefault()

        const {
            username,
            firstname,
            lastname,
            email,
            password,
            adminrole,
            status,
        } = state

        const res = await fetch('http://localhost:8000/adminlist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username,
                firstname,
                lastname,
                email,
                password,
                adminrole,
                status,
            }),
        })

        const result = await res.json()

        // localStorage.setItem('adminrole1', result.result.adminrole)
        // localStorage.setItem('_id', result.result._id)

        setSuccess(result.message)
        setState({
            username: '',
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            adminrole: '',
            status: '',
        })
        setTimeout(() => {
            navigate('/material/admindata')
        }, 500)
    }

    return (
        <div className="container-fluid">
            <h1
                style={{
                    fontSize: '25px',
                    textAlign: 'center',
                    marginTop: '20px',
                }}
            >
                New User
            </h1>
            <JwtTitle>
                <ValidatorForm
                    encType="multipart/form-data"
                    onSubmit={postData}
                >
                    <TextField
                        label="Username"
                        onChange={handleChange}
                        type="text"
                        name="username"
                        value={state.username}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                    <TextField
                        label="Firstname"
                        onChange={handleChange}
                        type="text"
                        name="firstname"
                        value={state.firstname}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                    <TextField
                        label="Lastname"
                        onChange={handleChange}
                        type="text"
                        name="lastname"
                        value={state.lastname}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                    <TextField
                        label="Email"
                        onChange={handleChange}
                        type="text"
                        name="email"
                        value={state.email}
                        validators={['required', 'isEmail']}
                        errorMessages={['this field is required']}
                    />
                    <TextField
                        label="Password"
                        onChange={handleChange}
                        type="password"
                        name="password"
                        value={state.password}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                    <RadioRoot>
                        <FormControl
                            component="fieldset"
                            className="formControl"
                        >
                            <RadioGroup
                                sx={{ mb: 2 }}
                                name="status"
                                onChange={handleChange}
                                row
                            >
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
                            </RadioGroup>
                        </FormControl>
                    </RadioRoot>
                    <JwtCheckBox>
                        <SimpleCard title="Admin Role">
                            <FormGroup row>
                                {position1.map((position) => {
                                    return (
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={state.position}
                                                    name="adminrole"
                                                    onChange={handleChanges}
                                                    value={position}
                                                />
                                            }
                                            label={position}
                                        />
                                    )
                                })}
                            </FormGroup>
                        </SimpleCard>
                    </JwtCheckBox>
                    <Box py="12px" />

                    <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                        onClick={handleClick}
                    >
                        <Icon>send</Icon>
                        <Span sx={{ pl: 1, textTransform: 'capitalize' }}>
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

export default AdminList
