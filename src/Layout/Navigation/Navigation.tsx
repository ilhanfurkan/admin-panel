import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SvgIcon from '@mui/material/SvgIcon';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './navigation.module.css';

export default function Navigation() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    );
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    );

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const pages = [
        { id: '1', name: 'Home', path: '/' },
        { id: '2', name: 'Create Blog', path: '/create' }
    ];
    const settings = [
        { id: '1', name: 'Home', path: '/' },
        { id: '2', name: 'Logout', path: '/login' }
    ];

    const handleLogout = (name: string) => {
        handleCloseUserMenu();
        if (name === 'Logout') {
            localStorage.removeItem('token');
        }
    };

    return (
        <AppBar position="fixed" sx={{ bgcolor: 'white', boxShadow: 'none' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ padding: '16px' }}>
                    <Typography sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Link to={'/'}>
                            <Box
                                component="img"
                                sx={{
                                    height: 60,
                                    width: 280,
                                    mr: 3
                                }}
                                alt="The house from the offer."
                                src="./academy.svg"
                            />
                        </Link>
                    </Typography>
                    <Box
                        sx={{
                            display: { xs: 'flex', md: 'none' }
                        }}
                        className={styles.mobile_menu}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left'
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left'
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                                marginBlockStart: '0px'
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page.id}
                                    onClick={() => {
                                        handleCloseNavMenu();
                                    }}
                                    className={styles.mobile_pages_handle}
                                >
                                    <Link
                                        to={page.path}
                                        className={styles.mobile_pages}
                                    >
                                        {page.name}
                                    </Link>{' '}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        sx={{
                            display: { xs: 'flex', md: 'none' }
                        }}
                        className={styles.mobile_logo}
                    >
                        <Link to={'/'}>
                            <Box
                                component="img"
                                sx={{
                                    height: 60,
                                    width: 210,
                                    mr: 3
                                }}
                                alt="The house from the offer."
                                src="./academy.svg"
                            />
                        </Link>
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' }
                        }}
                    >
                        {pages.map((page) => (
                            <Link
                                to={page.path}
                                key={page.id}
                                style={{ textDecoration: 'none' }}
                            >
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 2,
                                        color: 'black',
                                        display: 'flex',
                                        fontWeight: 500
                                    }}
                                >
                                    {page.name}
                                </Button>
                            </Link>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0, display: 'flex', gap: '20px' }}>
                        <Tooltip title="Click">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{
                                    display: 'flex'
                                }}
                            >
                                <SvgIcon
                                    sx={{
                                        width: '32px',
                                        height: '32px'
                                    }}
                                >
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M5.5 19.5C5.5 19.5 9 18 10 17C11 16 8 16 8 11C8 6 12 6 12 6C12 6 16 6 16 11C16 16 13 16 14 17C15 18 18.5 19.5 18.5 19.5"
                                            stroke="black"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                            stroke="black"
                                        />
                                    </svg>
                                </SvgIcon>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '52px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem
                                    key={setting.id}
                                    onClick={() => handleLogout(setting.name)}
                                    sx={{
                                        width: '160px',
                                        display: 'flex',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Typography
                                        textAlign="center"
                                        component="a"
                                        href={setting.path}
                                        sx={{
                                            textDecoration: 'none',
                                            color: 'black',
                                            border: '1px solid #e3e3e3',
                                            width: '100%',
                                            padding: '5px',
                                            borderRadius: '5px'
                                        }}
                                    >
                                        {setting.name}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
