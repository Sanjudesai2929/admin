import { Button, Grid } from '@mui/material'
import { Span } from 'app/components/Typography'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import { styled } from '@mui/system'
import axios from 'axios'
import { useParams } from 'react-router-dom'
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
    // textAlign: 'center',
    margin: '0',
}))

const UpdateNews = () => {
    const id1 = useParams()
    const id = id1.id

    const [update, setUpdate] = useState({
        newsimage: '',
        newstitle: '',
        sdescription: '',
        status: '',
    })
    const [desc, setDesc] = useState({
        description: '',
    })
    const [data, setData] = useState([{}])
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

        setUpdate((preValue) => {
            return {
                ...update,
                [name]: value,
            }
        })
    }

    const handlePhoto = (e) => {
        setUpdate(() => {
            return { ...update, newsimage: e.target.files[0] }
        })
    }

    const updateData = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('newsimage', update.newsimage)
        formData.append('newstitle', update.newstitle)
        formData.append('sdescription', update.sdescription)
        formData.append('description', desc.description)
        formData.append('status', update.status)

        const res = await axios.patch(
            `http://localhost:8000/editNews/${id}`,
            formData
        )

        setSuccess(res.data.message)
        setTimeout(() => {
            navigate('/material/tablenews')
        }, 500)
    }

    useEffect(() => {
        const loadData = async () => {
            const result = await fetch(`http://localhost:8000/newsdata/${id}`)
            const response = await result.json()
            setData(response)
            setUpdate({
                newsimage: response.newsimage,
                newstitle: response.newstitle,
                sdescription: response.sdescription,
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
                    <div style={{ textAlign: 'center', width: '40%' }}>
                        <img
                            src={data.thumbimage}
                            name="oldimage"
                            className="float-start"
                        />
                    </div>

                    <TextField
                        accept="image/*"
                        type="file"
                        onChange={handlePhoto}
                        name="newsimage"
                        // validators={['required']}
                        errorMessages={['this field is required']}
                    />
                    <TextField
                        type="text"
                        name="newstitle"
                        id="newstitle"
                        onChange={handleChange}
                        value={update.newstitle}
                        validators={['required']}
                        label="News Title"
                        errorMessages={['this field is required']}
                    />
                    <TextField
                        label="Short Description"
                        onChange={handleChange}
                        type="text"
                        name="sdescription"
                        id="sdescription"
                        value={update.sdescription}
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

export default UpdateNews
