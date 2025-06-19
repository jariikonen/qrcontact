import { Fragment, useState } from 'react';
import {
  Box,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

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
  const theme = useTheme();

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
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton onClick={() => setDrawerOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        <ListItem
          key={'static'}
          disablePadding
          onClick={handleMenuSelection(0)}
        >
          <ListItemButton data-testid="menu-button-static">
            <ListItemText primary={MENU_TEXT_STATIC} />
          </ListItemButton>
        </ListItem>
        <ListItem
          key={'dynamic'}
          disablePadding
          onClick={handleMenuSelection(1)}
        >
          <ListItemButton data-testid="menu-button-dynamic">
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
      {useMediaQuery(theme.breakpoints.down('md')) && (
        <Grid size={{ xs: 12 }}>
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
            <Typography variant="h1" sx={{ flexGrow: 1 }}>
              QRContact
            </Typography>
          </Toolbar>
        </Grid>
      )}
      {useMediaQuery(theme.breakpoints.up('md')) && (
        <Fragment>
          <Grid size={{ xs: 12 }} display="flex" justifyContent="center">
            <Typography variant="h1" mt="2rem">
              QRContact
            </Typography>
          </Grid>
          <Grid
            size={{ xs: 12 }}
            display="flex"
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
      )}
    </Fragment>
  );
}
