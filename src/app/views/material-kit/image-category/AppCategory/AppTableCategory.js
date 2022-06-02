import React from 'react'
import TableCategory from './TableCategory'
import { Breadcrumb, SimpleCard } from 'app/components'
import { Box, styled } from '@mui/system'
import { Icon, Button, IconButton, Fab } from '@mui/material'
import { NavLink } from 'react-router-dom'

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
}))

const AppTableCategory = () => {
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Material', path: '/material' },
                        { name: 'Gallery' },
                    ]}
                />
            </div>
            <SimpleCard title="Category Details">
                <NavLink to="/material/imagecategory">
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
                <TableCategory />
            </SimpleCard>
            <Box py="12px" />
        </Container>
    )
}

export default AppTableCategory
