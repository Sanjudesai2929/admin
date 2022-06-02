import {
    Button,
    Icon,
    Radio,
    RadioGroup,
    FormControlLabel,
} from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'app/components/Typography'
import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { green } from '@mui/material/colors'
import { Alert, Snackbar, Autocomplete } from '@mui/material'
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

const AutoComplete = styled(Autocomplete)(() => ({
    // width: 300,
    // marginBottom: '16px',
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

const ImageGallery = () => {
    const [state, setState] = useState({
        gimage: '',
        title: '',
        category: '',
        status: '',
    })

    const [userData, setUserData] = useState([{}])
    const [open, setOpen] = React.useState(false)
    const [success, setSuccess] = useState()
    const [selectedOptions, setSelectedOptions] = useState([])
    const navigate = useNavigate()

    const handleChange1 = (event, value) => {
        setSelectedOptions(value)
    }

    function handleClick() {
        setOpen(true)
    }

    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }

    const getData = async () => {
        const response = await fetch('http://localhost:8000/imagecategory')
        const result = await response.json()
        setUserData(result.reverse())
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
            return { ...state, gimage: e.target.files[0] }
        })
    }

    const postData = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('gimage', state.gimage)
        formData.append('title', state.title)
        formData.append('category', selectedOptions.label)
        formData.append('status', state.status)

        const result = await axios.post(
            'http://localhost:8000/newimagegallery',
            formData
        )

        setSuccess(result.data.message)
        setState({
            gimage: '',
            title: '',
            status: '',
        })
        setSelectedOptions([])
        setTimeout(() => {
            navigate('/material/imagegallerydata')
        }, 500)
    }

    const suggestions = userData.map((data, index) => {
        return { label: data.category }
    })

    useEffect(() => {
        getData()
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
                New Post
            </h1>
            <JwtTitle>
                <ValidatorForm
                    encType="multipart/form-data"
                    onSubmit={postData}
                >
                    <Fragment>
                        <AutoComplete
                            options={suggestions}
                            getOptionLabel={(option) => option.label}
                            onChange={handleChange1}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Category"
                                    name="category"
                                    variant="outlined"
                                    fullWidth
                                />
                            )}
                        />
                    </Fragment>
                    <TextField
                        label="Title"
                        onChange={handleChange}
                        type="text"
                        name="title"
                        value={state.title}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                    <TextField
                        accept="image/*"
                        type="file"
                        onChange={handlePhoto}
                        name="gimage"
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

export default ImageGallery
