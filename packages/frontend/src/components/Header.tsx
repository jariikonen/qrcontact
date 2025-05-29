import { Fragment, useState } from 'react';
import {
  Box,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import DatasetLinkedIcon from '@mui/icons-material/DatasetLinked';

export interface HeaderProps {
  /** Currently selected menu option. */
  menuOption: number;

  /** Function for setting the menu option state variable. */
  setMenuOption: React.Dispatch<React.SetStateAction<number>>;
}

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

const MENU_TEXT_STATIC = 'Create a QR code from your contact information';
const MENU_TEXT_DYNAMIC = 'Create a contact page and link to it with a QR code';

/**
 * Page header component for the application.
 *
 * @param {HeaderProps} props - The props for the Header component.
 * @returns {JSX.Element} The rendered Header component.
 */
export default function Header({ menuOption, setMenuOption }: HeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleMenuSelection = (newValue: number) => () => {
    setDrawerOpen(false);
    setMenuOption(newValue);
  };

  const handleTabSelection = (
    _event: React.SyntheticEvent,
    newValue: number
  ) => {
    setMenuOption(newValue);
  };

  const DrawerList = (
    <Box sx={{ width: 300 }} role="presentation">
      <List>
        <ListItem
          key={'static'}
          disablePadding
          onClick={handleMenuSelection(0)}
        >
          <ListItemButton>
            <ListItemIcon>
              <QrCode2Icon />
            </ListItemIcon>
            <ListItemText primary={MENU_TEXT_STATIC} />
          </ListItemButton>
        </ListItem>
        <ListItem
          key={'dynamic'}
          disablePadding
          onClick={handleMenuSelection(1)}
        >
          <ListItemButton>
            <ListItemIcon>
              <DatasetLinkedIcon />
            </ListItemIcon>
            <ListItemText primary={MENU_TEXT_DYNAMIC} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Fragment>
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {DrawerList}
      </Drawer>
      <Grid item xs={12} sx={{ display: { xs: 'block', md: 'none' } }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h1" component="div" sx={{ flexGrow: 1 }}>
            QRContact
          </Typography>
        </Toolbar>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{ display: { xs: 'none', md: 'flex' } }}
        justifyContent="center"
      >
        <Typography variant="h1" mt="2rem">
          QRContact
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{ display: { xs: 'none', md: 'flex' } }}
        justifyContent="center"
        mt="2rem"
        mb="2rem"
      >
        <Tabs
          value={menuOption}
          onChange={handleTabSelection}
          aria-label="main function selection"
        >
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Tab label={MENU_TEXT_STATIC} {...a11yProps(0)} />{' '}
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Tab label={MENU_TEXT_DYNAMIC} {...a11yProps(1)} />{' '}
        </Tabs>
      </Grid>
    </Fragment>
  );
}
