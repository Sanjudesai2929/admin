import React from 'react'

import { Breadcrumb, SimpleCard } from 'app/components'
import { Box, styled } from '@mui/system'
import { useParams } from 'react-router-dom'
import UpdatePopUp from './UpdatePopUp'

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

const AppUpdateNews = () => {
    const id1 = useParams()
    const id = id1.id

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Material', path: '/material' },
                        { name: 'News' },
                    ]}
                />
            </div>
            <SimpleCard title="Edit News">
                <UpdatePopUp />
            </SimpleCard>
            <Box py="12px" />
        </Container>
    )
}

export default AppUpdateNews
