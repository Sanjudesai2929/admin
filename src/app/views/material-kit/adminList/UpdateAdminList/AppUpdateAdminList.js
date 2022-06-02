import React from 'react'
import UpdateAdminList from './UpdateAdminList'
import { Breadcrumb, SimpleCard } from 'app/components'
import { Box, styled } from '@mui/system'
import { useParams } from 'react-router-dom'

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

const AppUpdateAdminList = () => {
    const id1 = useParams()
    const id = id1.id

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
            <SimpleCard title="Edit User">
                <UpdateAdminList />
            </SimpleCard>
            <Box py="12px" />
        </Container>
    )
}

export default AppUpdateAdminList
