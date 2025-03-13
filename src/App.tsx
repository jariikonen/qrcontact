import React from 'react';
import {
  Container,
  CssBaseline,
  Grid2 as Grid,
  Typography,
  Tabs,
  Box,
  Tab,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const themeLight = createTheme({
  palette: {
    background: {
      default: '#e0f7fa',
    },
  },
});

function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <ThemeProvider theme={themeLight}>
        <Container maxWidth="lg" sx={{ bgcolor: '#e0f7fa' }}>
          <CssBaseline />
          <Grid container spacing={0} direction="column">
            <Grid size={12} display="flex" justifyContent="center">
              <Typography variant="h1" mt="2rem">
                QRContact
              </Typography>
            </Grid>
            <Grid size={12} display="flex" justifyContent="center" mt="2rem">
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab
                  label="Enter your contact information and create a QR code from it"
                  {...a11yProps(0)}
                />
                <Tab
                  label="Create a contact page and link to it with a QR code"
                  {...a11yProps(1)}
                />
              </Tabs>
            </Grid>
            <Grid size={12}>
              <Box
                mt="2rem"
                sx={{
                  width: '100%',
                  bgcolor: 'white',
                  borderRadius: '0.5rem',
                }}
              >
                <CustomTabPanel value={value} index={0}>
                  Item One
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                  Item Two
                </CustomTabPanel>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
