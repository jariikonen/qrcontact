import { Fragment, useState } from 'react';
import { Container, CssBaseline, Typography, Grid, Box } from '@mui/material';
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';
import EngineeringIcon from '@mui/icons-material/Engineering';
import ContactQRCreator from './components/ContactQRCreator';
import Header from './components/Header';

interface TabPanelProps {
  children?: React.ReactNode;

  /** Index of the current panel. */
  index: number;

  /** Index of the currently active TabPanel. */
  value: number;
}

/**
 * Component for displaying the two main functionalities of the app in separate
 * panels activated by clicking on tabs.
 */
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: '1rem' }}>{children}</Box>}
    </div>
  );
}

let theme = createTheme({
  palette: {
    background: {
      default: '#e0f7fa',
    },
  },
});

theme = responsiveFontSizes(theme, { factor: 7, breakpoints: ['md'] });

function App() {
  const [menuOption, setMenuOption] = useState(0);

  return (
    <Fragment>
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
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight={{ xs: '100vh', md: 300 }}
                  >
                    <EngineeringIcon
                      style={{
                        color: 'black',
                        marginRight: '1rem',
                        fontSize: 100,
                      }}
                    />
                    <Typography variant="h5">Work in progress ...</Typography>
                  </Box>
                </TabPanel>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </Fragment>
  );
}

export default App;
