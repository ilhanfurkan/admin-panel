import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Box } from '@mui/material';

export default function Footer() {
    return (
        <Box
            sx={{
                backgroundColor: 'darkgray',
                p: 6,
                width: '100%'
            }}
            component="footer"
        >
            <Container maxWidth="sm">
                <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                >
                    {'Copyright © '}
                    <Link color="inherit" href="https://www.balancenetwork.io/">
                        Balance Network
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Container>
        </Box>
    );
}
