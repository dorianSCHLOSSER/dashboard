import React from "react";
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {withRouter} from "react-router-dom"
import HomeIcon from '@mui/icons-material/Home';
import {Code} from '@mui/icons-material'
import Home from "../Pages/Home";
import {List, ListItemIcon, ListItemText} from "@material-ui/core";
import ListItem from '@mui/material/ListItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const drawerWidth = 240;

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
})

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
})

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
)

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),

    ...theme.mixins.toolbar,
}))

const buttonRoot = (router, handleLogout, connect, token) => {
    return [
        {
            label: "Home",
            icon: <HomeIcon/>,
            onClick: () => {
                router.push("/")
            }
        },
        {
            label: "About.JSON",
            icon: <Code/>,
            onClick: () => {
                router.push("/about")
            }
        },
        {
            label: "Sign in",
            icon: <AccountCircleIcon/>,
            onClick: () => {
                router.push("/login")
            }
        },
        {
            label: "Sign out",
            icon: <AccountCircleIcon/>,
            onClick: () => {
                handleLogout()
                router.push("/")
            }
        },
        {
            label: "Connect to Google",
            icon: <AccountCircleIcon/>,
            onClick: () => {
                connect(token)
            }
        }
    ]
}

const Header = (props) => {
    const history = props.history
    const theme = useTheme()
    const [open, setOpen] = React.useState(false)

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {buttonRoot(history, props.handleLogout, props.connect, props.token).map(({label, icon, onClick}) => {
                        if ((props.isLoggedin && label==="Sign out") || (!props.isLoggedin && label==="Sign in") || (label ==="Connect to Google" && props.access === false) || label === "Home" || label === "About.JSON") {
                            return (
                                <ListItem button key={label} onClick={onClick}>
                                    <ListItemIcon>
                                        {icon}
                                    </ListItemIcon>
                                    <ListItemText primary={label}/>
                                </ListItem>)
                        }
                    })}
                </List>
            </Drawer>
            <Box component={"main"} sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <main className={"main"}>
                    {props.children}
                </main>
            </Box>
        </Box>
    )
}

export default withRouter(Header);