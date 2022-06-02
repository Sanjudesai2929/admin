import { Button, Icon, Grid } from '@mui/material'
import { Span } from 'app/components/Typography'
import React, { Fragment, useEffect, useState } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import { styled } from '@mui/system'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { green } from '@mui/material/colors'
import { Alert, Snackbar, Autocomplete } from '@mui/material'

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

const UpdateGallery = () => {
    const id1 = useParams()
    const id = id1.id

    const [update, setUpdate] = useState({
        gimage: '',
        title: '',
        category: '',
        status: '',
    })
    const [data, setData] = useState([{}])
    const [userData, setUserData] = useState([{}])
    const [selectedOptions, setSelectedOptions] = useState([])
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

        setUpdate(() => {
            return {
                ...update,
                [name]: value,
            }
        })
    }

    const getData = async () => {
        const response = await fetch('http://localhost:8000/imagecategory')
        const result = await response.json()
        setUserData(result)
    }

    const handlePhoto = (e) => {
        setUpdate(() => {
            return { ...update, gimage: e.target.files[0] }
        })
    }

    const handleChange1 = (event, value) => {
        setSelectedOptions(value)
    }

    const updateData = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('gimage', update.gimage)
        formData.append('title', update.title)
        formData.append('category', selectedOptions.label)
        formData.append('status', update.status)

        const res = await axios.patch(
            `http://localhost:8000/updategallery/${id}`,
            formData
        )

        setSuccess(res.data.message)
        setUpdate({ gimage: '', title: '', category: '', status: '' })
        setTimeout(() => {
            navigate('/material/imagegallerydata')
        }, 500)
    }

    useEffect(() => {
        const loadData = async () => {
            const result = await fetch(
                `http://localhost:8000/imagegallery/${id}`
            )
            const response = await result.json()

            setData(response)
            setUpdate({
                gimage: response.gimage,
                title: response.title,
                category: response.category,
                status: response.status,
            })
        }
        loadData()
        getData()
    }, [])

    const suggestions = userData.map((data, index) => {
        return { label: data.category }
    })

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
                <ValidatorForm
                    encType="multipart/form-data"
                    onSubmit={updateData}
                >
                    <img
                        src={data.thumbimage}
                        name="oldimage"
                        className="float-start"
                    />
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
                        value={update.title}
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
                                value={update.status}
                                onChange={handleChange}
                                row
                            >
                                <FormControlLabel
                                    value="active"
                                    control={<Radio />}
                                    label="Active"
                                />

                                <FormControlLabel
                                    value="inactive"
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

export default UpdateGallery
