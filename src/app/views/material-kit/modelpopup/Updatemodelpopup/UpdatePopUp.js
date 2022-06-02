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
import { useParams, useNavigate } from 'react-router-dom'
import { green } from '@mui/material/colors'
import { Alert, Snackbar } from '@mui/material'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

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
    textAlign: 'left',
    margin: '0',
}))

const UpdatePopUp = () => {
    const id1 = useParams()
    const id = id1.id

    const [update, setUpdate] = useState({
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
        const value = event.target.value
        const name = event.target.name

        setUpdate(() => {
            return {
                ...update,
                [name]: value,
            }
        })
    }

    const updateData = async (e) => {
        e.preventDefault()

        const { title, status } = update
        const { description } = desc

        const res = await fetch(`http://localhost:8000/home-popup/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description, status }),
        })

        const result = await res.json()
        setSuccess(result.message)
        setUpdate({ title: '', status: '' })
        setDesc({ description: '' })
        setTimeout(() => {
            navigate('/material/modelpopupdata')
        }, 500)
    }

    useEffect(() => {
        const loadData = async () => {
            const result = await fetch(`http://localhost:8000/home-popup/${id}`)
            const response = await result.json()

            setUpdate({
                title: response.title,
                status: response.status,
            })
            setDesc({ description: response.description })
        }
        loadData()
    }, [])

    return (
        <div className="container-fluid">
            <h1
                style={{
                    fontSize: '25px',
                    // textAlign: 'center',
                    marginTop: '20px',
                }}
            >
                Edit Post
            </h1>
            <JwtTitle>
                <ValidatorForm onSubmit={updateData}>
                    <TextField
                        label="Title"
                        type="text"
                        name="title"
                        id="title"
                        onChange={handleChange}
                        value={update.title}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                    {/* <TextField
                        label="Description"
                        onChange={handleChange}
                        type="text"
                        name="description"
                        id="description"
                        value={update.description}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    /> */}
                    {/* <TextField
                        label="Description"
                        onChange={handleChange}
                        type="text"
                        name="description"
                        id="description"
                        value={update.description}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    /> */}
                    <div style={{ width: '40%' }}>
                        <CKEditor
                            editor={ClassicEditor}
                            name="description"
                            data={desc.description}
                            onChange={(event, editor) => {
                                const data = editor.getData()
                                setDesc({ description: data })
                            }}
                        />
                    </div>
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
                                        label="Active"
                                        value="active"
                                        name="status"
                                        control={<Radio />}
                                    />

                                    <FormControlLabel
                                        label="Inactive"
                                        value="inactive"
                                        name="status"
                                        control={<Radio />}
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

export default UpdatePopUp
