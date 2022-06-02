import {
    Button,
    Icon,
    Radio,
    RadioGroup,
    FormControlLabel,
} from '@mui/material'
import { styled } from '@mui/system'
import { Span } from 'app/components/Typography'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { green } from '@mui/material/colors'
import { Alert, Snackbar } from '@mui/material'
import axios from 'axios'
import FormControl from '@mui/material/FormControl'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

const TextField = styled(TextValidator)(() => ({
    width: '100%',
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

const ModelPopUp = () => {
    const [state, setState] = useState({
        title: '',
        status: '',
    })
    const [desc, setDesc] = useState({
        description: '',
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
        const name = event.target.name
        const value = event.target.value

        setState(() => {
            return {
                ...state,
                [name]: value,
            }
        })
    }

    const postData = async (e) => {
        e.preventDefault()

        const { title, status } = state
        const { description } = desc

        const res = await fetch(`http://localhost:8000/home-popup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description, status }),
        })

        const result = await res.json()

        // const formData = new FormData()
        // formData.append('title', state.title)
        // formData.append('description', desc.description)
        // formData.append('status', state.status)

        // const result = await axios.post(
        //     'http://localhost:8000/home-popup',
        //     formData
        // )

        setSuccess(result.message)
        setState({
            title: '',
            status: '',
        })
        setDesc({ description: '' })
        setTimeout(() => {
            navigate('/material/modelpopupdata')
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
                        label="Title"
                        onChange={handleChange}
                        type="text"
                        name="title"
                        value={state.title}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />

                    <CKEditor
                        editor={ClassicEditor}
                        name="description"
                        data={desc.description}
                        onChange={(event, editor) => {
                            const data = editor.getData()
                            setDesc({ description: data })
                        }}
                    />

                    <RadioRoot>
                        <FormControl
                            component="fieldset"
                            className="formControl"
                        >
                            <RadioGroup
                                sx={{ mb: 2 }}
                                name="status"
                                value={state.status}
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

export default ModelPopUp
