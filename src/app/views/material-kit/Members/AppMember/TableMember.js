import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TablePagination,
    Grid,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Box, styled } from '@mui/system'
import { green } from '@mui/material/colors'
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

const TableMember = () => {
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
        const response = await fetch('http://localhost:8000/member')
        const result = await response.json()
        setUserData(result.reverse())
    }

    useEffect(() => {
        getData()
    }, [userData])

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
                            <TableCell>Username</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userData
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((subscriber, index) => (
                                <TableRow key={index}>
                                    <TableCell scope="row" id="tablecell">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell id="tablecell">
                                        <NavLink
                                            to={{
                                                pathname: `/material/member/${subscriber._id}`,
                                            }}
                                        >
                                            {subscriber.username}
                                        </NavLink>
                                    </TableCell>
                                    <TableCell id="tablecell">
                                        {subscriber.fullname}
                                    </TableCell>
                                    <TableCell id="tablecell">
                                        {subscriber.phone}
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

export default TableMember
