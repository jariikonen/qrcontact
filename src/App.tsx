import { Fragment, useState } from 'react';
import { Container, CssBaseline, Typography, Grid, Box } from '@mui/material';
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';
import EngineeringIcon from '@mui/icons-material/Engineering';
import SimpleQRCreator from './components/SimpleQRCreator';
import Header from './components/Header';

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
                <CustomTabPanel value={menuOption} index={0}>
                  <Box minHeight={{ xs: '100vh', md: 300 }}>
                    <SimpleQRCreator />
                  </Box>
                </CustomTabPanel>
                <CustomTabPanel value={menuOption} index={1}>
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
                </CustomTabPanel>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </Fragment>
  );
}

export default App;
