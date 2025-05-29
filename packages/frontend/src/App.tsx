import { useState } from 'react';
import { Container, CssBaseline, Grid, Box } from '@mui/material';
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';
import Header from './components/Header';
import ContactQRCreator from './components/ContactQRCreator';
import ContactPageCreator from './components/ContactPageCreator';

interface TabPanelProps {
  children: React.ReactNode;

  /** Index of the current panel. */
  index: number;

  /** Index of the currently active TabPanel. */
  value: number;
}

/**
 * Component for displaying the two main parts of the application in separate
 * panels that can be switched by clicking on tabs.
 *
 * Parts are:
 * 1) Create a QR code from contact information (static) and
 * 2) Create a contact page and link to it with a QR code (dynamic).
 *
 * The first part can be called static because it just creates a QR code from
 * the contact information and does not require any server-side processing.
 * The second part is dynamic because it creates a contact page that is linked
 * to with a QR code. The page is created dynamically and can be updated after
 * the QR code is created.
 */
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other} // eslint-disable-line react/jsx-props-no-spreading
    >
      {value === index && <Box sx={{ p: '1rem' }}>{children}</Box>}
    </div>
  );
}

// Setup a MUI theme.
let theme = createTheme({
  palette: {
    background: {
      default: '#e0f7fa',
    },
  },
});
theme = responsiveFontSizes(theme, { factor: 7, breakpoints: ['md'] });

/**
 * Main application component.
 */
function App() {
  const [menuOption, setMenuOption] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="lg"
        sx={{
          bgcolor: '#e0f7fa',
          pb: { xs: 0, md: '6rem' },
          px: { xs: 0, md: '2rem' },
        }}
      >
        <CssBaseline />
        <Grid container spacing={0} direction="column">
          <Header menuOption={menuOption} setMenuOption={setMenuOption} />
          <Grid item xs={12}>
            <Box
              sx={{
                width: '100%',
                bgcolor: 'white',
                borderRadius: { xs: 0, md: '1rem' },
              }}
            >
              <TabPanel value={menuOption} index={0}>
                <Box minHeight={{ xs: '100vh', md: 300 }} p={'1rem 1.5rem'}>
                  <ContactQRCreator />
                </Box>
              </TabPanel>
              <TabPanel value={menuOption} index={1}>
                <Box minHeight={{ xs: '100vh', md: 300 }} p={'1rem 1.5rem'}>
                  <ContactPageCreator />
                </Box>
              </TabPanel>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
