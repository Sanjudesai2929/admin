import React from 'react'
import Testinomial from './Testinomial'
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

const AppTestinomial = () => {
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
            <SimpleCard title="Testinomial Details">
                <Testinomial />
            </SimpleCard>
            <Box py="12px" />
        </Container>
    )
}

export default AppTestinomial
