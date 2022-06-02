import { Button, Grid } from '@mui/material'
import { Span } from 'app/components/Typography'
import React, { useEffect, useState, Fragment } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import { styled } from '@mui/system'
import axios from 'axios'
import { useParams, useLocation } from 'react-router-dom'
import { green } from '@mui/material/colors'
import { Alert, Snackbar, Autocomplete } from '@mui/material'

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
    // textAlign: 'center',
    margin: '0',
}))

const Member = (disabled) => {
    const id1 = useParams()
    const id = id1.id

    const [update, setUpdate] = useState({
        username: '',
        fullname: '',
        email: '',
        country: '',
        phone: '',
        status: '',
        date: '',
    })

    const [open, setOpen] = React.useState(false)
    const [success, setSuccess] = useState()
    const [userData, setUserData] = useState([{}])
    const [selectedOptions, setSelectedOptions] = useState()

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
        const response = await fetch('http://localhost:8000/coutrycode')
        const result = await response.json()
        setUserData(result)
    }

    const updateData = async (e) => {
        e.preventDefault()

        const { fullname, email, phone, status } = update
        const country = selectedOptions.label

        const res = await fetch(`http://localhost:8000/editmember/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fullname, email, country, phone, status }),
        })

        const result = await res.json()

        setSuccess(result.message)
    }

    useEffect(() => {
        const loadData = async () => {
            const result = await fetch(`http://localhost:8000/member/${id}`)
            const response = await result.json()

            setUpdate({
                username: response.username,
                fullname: response.fullname,
                email: response.email,
                // country: response.country,
                phone: response.phone,
                status: response.status,
                date: response.date,
            })
            setSelectedOptions({ country: response.country })
        }
        loadData()
        getData()
    }, [])

    const suggestions = userData.map((data, index) => {
        return { label: data.name }
    })

    return (
        // <div className="container-fluid">
        <JwtTitle>
            <ValidatorForm onSubmit={updateData}>
                <Grid container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Full Name"
                            onChange={handleChange}
                            type="text"
                            name="fullname"
                            value={update.fullname}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />

                        <TextField
                            label="Email"
                            onChange={handleChange}
                            type="text"
                            name="email"
                            value={update.email}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextField
                            label="Mobile Nubmer"
                            onChange={handleChange}
                            type="number"
                            name="phone"
                            value={update.phone}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <TextField
                            type="text"
                            name="username"
                            id="username"
                            value={update.username}
                            label="Username"
                            disabled={disabled}
                            errorMessages={['this field is required']}
                        />

                        {/* <TextField
                            label="Country"
                            onChange={handleChange}
                            name="country"
                            type="text"
                            value={update.country}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        /> */}

                        <Fragment>
                            <AutoComplete
                                options={suggestions}
                                getOptionLabel={(options) => options.label}
                                onChange={handleChange1}
                                // value={update.country}
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
                            label="Join Date"
                            onChange={handleChange}
                            name="date"
                            type="text"
                            disabled={disabled}
                            value={update.date}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                    </Grid>
                </Grid>
                <RadioRoot>
                    <FormControl component="fieldset" className="formControl">
                        <RadioGroup
                            aria-label="Gender"
                            className="group"
                            value={update.status}
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
        // </div>
    )
}

export default Member
