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
// import { CKEditor } from 'ckeditor4-react'
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

const News = () => {
    const [state, setState] = useState({
        newsimage: '',
        newstitle: '',
        sdescription: '',
        status: '',
    })
    const [desc, setDesc] = useState({
        description: '',
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
            return { ...state, newsimage: e.target.files[0] }
        })
    }

    const postData = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('newsimage', state.newsimage)
        formData.append('newstitle', state.newstitle)
        formData.append('sdescription', state.sdescription)
        formData.append('description', desc.description)
        formData.append('status', state.status)

        const result = await axios.post('http://localhost:8000/news', formData)

        setSuccess(result.data.message)
        setState({
            newsimage: '',
            newstitle: '',
            sdescription: '',
            status: '',
        })
        setDesc({ description: '' })
        setTimeout(() => {
            navigate('/material/tablenews')
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
                        // value={state.newsimage}
                        name="newsimage"
                        // validators={['required',]}
                        errorMessages={['this field is required']}
                    />
                    <TextField
                        label="News Title"
                        onChange={handleChange}
                        type="text"
                        name="newstitle"
                        value={state.newstitle}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                    <TextField
                        label="Short Description"
                        onChange={handleChange}
                        type="text"
                        name="sdescription"
                        value={state.sdescription}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    />
                    {/* <TextField
                        label="Description"
                        onChange={handleChange}
                        type="text"
                        name="description"
                        value={state.description}
                        validators={['required']}
                        errorMessages={['this field is required']}
                    /> */}
                    {/* <CKEditor
                        // initData={desc.description}
                        // editor={ClassicEditor}
                        name="description"
                        data={desc.description}
                        onChange={(event, editor) => {
                            const data = editor.getData()
                            setDesc({ description: data })
                        }}
                        config={{
                            toolbar: [['Bold']],
                        }}
                    /> */}

                    <CKEditor
                        editor={ClassicEditor}
                        name="description"
                        // style={{ width: '50%' }}
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

export default News
