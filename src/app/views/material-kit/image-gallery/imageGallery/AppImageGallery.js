import React from 'react'
import ImageGallery from './ImageGallery'
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

const AppImageGallery = () => {
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
            <SimpleCard title="Add Category">
                <ImageGallery />
            </SimpleCard>
            <Box py="12px" />
        </Container>
    )
}

export default AppImageGallery
