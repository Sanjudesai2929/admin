import {
    Button,
    Icon,
    Radio,
    RadioGroup,
    FormControlLabel,
} from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'app/components/Typography'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { green } from '@mui/material/colors'
import { Alert, Snackbar } from '@mui/material'
import axios from 'axios'
import FormControl from '@mui/material/FormControl'

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

const JwtTitle = styled('div')(() => ({
    fontSize: '10px',
    textAlign: 'center',
    margin: '0',
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

const Testinomial = () => {
    const [state, setState] = useState({
        timage: '',
        name: '',
        review: '',
        designation: '',
        status: '',
    })

    const [open, setOpen] = useState(false)
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
        const name = event.target.name
        const value = event.target.value

        setState(() => {
            return {
                ...state,
                [name]: value,
            }
        })
    }

    const handlePhoto = (e) => {
        setState(() => {
            return { ...state, timage: e.target.files[0] }
        })
    }

    const postData = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('timage', state.timage)
        formData.append('name', state.name)
        formData.append('review', state.review)
        formData.append('designation', state.designation)
        formData.append('status', state.status)

        const result = await axios.post(
            'http://localhost:8000/testinomial',
            formData
        )

        setSuccess(result.data.message)

        setState({
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

    return (
        <div className="container-fluid">
            <h1
                style={{
                    fontSize: '25px',
                    textAlign: 'center',
                    marginTop: '20px',
                }}
            >
                New Post
            </h1>

            <JwtTitle>
                <ValidatorForm
                    encType="multipart/form-data"
                    onSubmit={postData}
                >
                    <TextField
                        accept="image/*"
                        type="file"
                        onChange={handlePhoto}
                        name="timage"
                        errorMessages={['this field is required']}
                    />
                    <TextField
                        label="Name"
                        onChange={handleChange}
                        type="text"
                        name="name"
                        value={state.name}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                    <TextField
                        label="Review"
                        onChange={handleChange}
                        type="text"
                        name="review"
                        value={state.review}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                    <TextField
                        label="Designation"
                        onChange={handleChange}
                        type="text"
                        name="designation"
                        value={state.designation}
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
                    {/* <NavLink to="/material/testinomialdata"> */}
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
                    {/* </NavLink> */}
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

export default Testinomial
