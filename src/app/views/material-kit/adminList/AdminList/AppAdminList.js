import React from 'react'
import AdminList from './AdminList'
import { Breadcrumb, SimpleCard } from 'app/components'
import { Box, styled } from '@mui/system'

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

const AppAdminList = () => {
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Material', path: '/material' },
                        { name: 'Admin' },
                    ]}
                />
            </div>
            <SimpleCard title="Add User">
                <AdminList />
            </SimpleCard>
            <Box py="12px" />
        </Container>
    )
}

export default AppAdminList
