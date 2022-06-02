import {
    IconButton,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Icon,
    TablePagination,
    Grid,
    Fab,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Box, styled } from '@mui/system'
import axios from 'axios'
import { amber, green } from '@mui/material/colors'
import { Alert, Snackbar } from '@mui/material'
import { NavLink } from 'react-router-dom'

const StyledTable = styled(Table)(({ theme }) => ({
    whiteSpace: 'pre',
    '& thead': {
        '& tr': {
            '& th': {
                paddingLeft: 0,
                paddingRight: 0,
            },
        },
    },
    '& tbody': {
        '& tr': {
            '& td': {
                paddingLeft: 0,
                textTransform: 'capitalize',
            },
        },
    },
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

const AdminList = () => {
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [page, setPage] = React.useState(0)
    const [userData, setUserData] = useState([{}])
    const [open, setOpen] = React.useState(false)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value)
        setPage(0)
    }

    const getData = async () => {
        const response = await fetch('http://localhost:8000/adminlist')
        const result = await response.json()

        // localStorage.setItem('id', result[0]._id)
        setUserData(result.reverse())
    }

    useEffect(() => {
        getData()
    }, [])

    const handleChange = (e) => {
        window.location.href = `/material/updatenews/${e}`
    }

    const deleteUser = async (rowId) => {
        await axios.delete(`http://localhost:8000/adminlist/${rowId}`)
        setOpen(true)
        getData()
    }
    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }

    return (
        <Box width="100%" overflow="none" style={{ margin: '20px' }}>
            <Grid>
                <StyledTable>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            {/* <TableCell>Id</TableCell> */}
                            <TableCell>Username</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userData
                            .filter(
                                (subscriber) => subscriber.role === 'SUBADMIN'
                            )
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((subscriber, index) => (
                                <TableRow key={index}>
                                    {/* {subscriber.role.includes('SUBADMIN')
                                        ? alert('hello')
                                        : null} */}
                                    <TableCell scope="row" id="tablecell">
                                        {index + 1}
                                    </TableCell>

                                    <TableCell id="tablecell">
                                        {subscriber.username}
                                    </TableCell>
                                    <TableCell id="tablecell">
                                        {subscriber.firstname}{' '}
                                        {subscriber.lastname}
                                    </TableCell>
                                    <TableCell id="tablecell">
                                        {subscriber.email}
                                    </TableCell>
                                    <TableCell id="tablecell">
                                        {subscriber.date}
                                    </TableCell>
                                    <TableCell id="tablecell">
                                        {subscriber.status}
                                    </TableCell>
                                    {/* </ReactDeleteRow> */}
                                    <TableCell>
                                        <NavLink
                                            to={{
                                                pathname: `/material/editadminlist/${subscriber._id}`,
                                            }}
                                        >
                                            <IconButton
                                                className="button"
                                                size="small"
                                                color="primary"
                                                aria-label="Add"
                                            >
                                                <i className="fa-regular fa-pen-to-square"></i>
                                            </IconButton>
                                        </NavLink>
                                        <IconButton
                                            className="button"
                                            aria-label="Delete"
                                            id="delete"
                                            onClick={() =>
                                                deleteUser(subscriber._id)
                                            }
                                        >
                                            <Icon>delete</Icon>
                                        </IconButton>
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
                                                    Delete successfully
                                                </Alert>
                                            </Snackbar>
                                        </ContentRoot>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </StyledTable>

                <TablePagination
                    sx={{ px: 2 }}
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={userData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Grid>
        </Box>
    )
}

export default AdminList
