import {
    IconButton,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Checkbox,
    Icon,
    TablePagination,
    Grid,
    Card,
} from '@mui/material'
import { useEffect, useState, useRef } from 'react'
import { Box, styled } from '@mui/system'
import axios from 'axios'
import { amber, green } from '@mui/material/colors'
import { Alert, Snackbar, Button, Fab } from '@mui/material'
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

const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
}))

const UserData = (...rest) => {
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [page, setPage] = useState(0)
    const [userData, setUserData] = useState([{}])
    const [open, setOpen] = useState(false)
    const [selectedCustomerIds, setSelectedCustomerIds] = useState([])
    const [show, setShow] = useState(false)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const handleSelectAll = (event) => {
        let newSelectedCustomerIds

        if (event.target.checked) {
            newSelectedCustomerIds = userData.map((customer) => customer._id)
        } else {
            newSelectedCustomerIds = []
        }

        setSelectedCustomerIds(newSelectedCustomerIds)
        setShow(true)
    }

    const handleSelectOne = (event, id) => {
        const selectedIndex = selectedCustomerIds.indexOf(id)
        let newSelectedCustomerIds = []

        if (selectedIndex === -1) {
            newSelectedCustomerIds = newSelectedCustomerIds.concat(
                selectedCustomerIds,
                id
            )
        } else if (selectedIndex === 0) {
            newSelectedCustomerIds = newSelectedCustomerIds.concat(
                selectedCustomerIds.slice(1)
            )
        } else if (selectedIndex === selectedCustomerIds.length - 1) {
            newSelectedCustomerIds = newSelectedCustomerIds.concat(
                selectedCustomerIds.slice(0, -1)
            )
        } else if (selectedIndex > 0) {
            newSelectedCustomerIds = newSelectedCustomerIds.concat(
                selectedCustomerIds.slice(0, selectedIndex),
                selectedCustomerIds.slice(selectedIndex + 1)
            )
        }
        setSelectedCustomerIds(newSelectedCustomerIds)
        setShow(true)
    }

    const getData = async () => {
        const response = await fetch('http://localhost:8000/datatable')
        const result = await response.json()
        setUserData(result.reverse())
    }

    useEffect(() => {
        getData()
    }, [])

    const deleteUser = async (rowId) => {
        await axios.post(`http://localhost:8000/rowDelete`, rowId)
        getData()
        setOpen(true)
    }
    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }

    const handleDelete = () => {
        deleteUser(selectedCustomerIds)
        setSelectedCustomerIds([])
    }

    return (
        <Box width="100%" overflow="none" style={{ margin: '20px' }}>
            <Grid>
                <NavLink to="/material/faq">
                    <StyledButton
                        variant="contained"
                        style={{
                            float: 'right',
                            marginRight: '60px',
                            marginTop: '0',
                            // borderRadius :"50%"
                        }}
                    >
                        ADD
                    </StyledButton>
                </NavLink>
                {show ? (
                    <Fab
                        color="danger"
                        aria-label="Delete"
                        className="button"
                        style={{
                            float: 'right',
                            bottom: '9px',
                        }}
                        onClick={handleDelete}
                    >
                        <Icon>delete</Icon>
                    </Fab>
                ) : null}

                <StyledTable>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={
                                        selectedCustomerIds.length ===
                                        userData.length
                                    }
                                    color="primary"
                                    indeterminate={
                                        selectedCustomerIds.length > 0 &&
                                        selectedCustomerIds.length <
                                            userData.length
                                    }
                                    onChange={handleSelectAll}
                                />
                            </TableCell>
                            <TableCell>#</TableCell>
                            <TableCell>Question</TableCell>
                            <TableCell>Answer</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userData
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((subscriber, index) => (
                                <TableRow
                                    hover
                                    key={index}
                                    selected={
                                        selectedCustomerIds.indexOf(
                                            subscriber._id
                                        ) !== -1
                                    }
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={
                                                selectedCustomerIds.indexOf(
                                                    subscriber._id
                                                ) !== -1
                                            }
                                            onChange={(event) =>
                                                handleSelectOne(
                                                    event,
                                                    subscriber._id
                                                )
                                            }
                                            value="true"
                                        />
                                    </TableCell>
                                    <TableCell scope="row" id="tablecell">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell id="tablecell">
                                        {subscriber.question}
                                    </TableCell>
                                    <TableCell id="tablecell">
                                        {subscriber.answer}
                                    </TableCell>
                                    <TableCell id="tablecell">
                                        {subscriber.date}
                                    </TableCell>
                                    <TableCell id="tablecell">
                                        {subscriber.status}
                                    </TableCell>
                                    <TableCell>
                                        <NavLink
                                            to={`/material/faq/faqdetails/${subscriber._id}`}
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
                                        {/* <IconButton
                                            className="button"
                                            aria-label="Delete"
                                            id="delete"
                                            onClick={() =>
                                                deleteUser(subscriber._id)
                                            }
                                        >
                                            <Icon>delete</Icon>
                                        </IconButton> */}
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

export default UserData
