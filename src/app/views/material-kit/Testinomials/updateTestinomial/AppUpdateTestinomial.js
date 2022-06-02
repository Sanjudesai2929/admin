import React from 'react'
import UpdateTestinomial from './updateTestinomial'
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

const AppUpdateTestinomial = () => {
    const id1 = useParams()
    const id = id1.id

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Material', path: '/material' },
                        { name: 'Testinomial' },
                    ]}
                />
            </div>
            <SimpleCard title="Edit Testinomial ">
                <UpdateTestinomial />
            </SimpleCard>
            <Box py="12px" />
        </Container>
    )
}

export default AppUpdateTestinomial
