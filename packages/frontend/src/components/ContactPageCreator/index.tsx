import { useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import ContactForm from '../ContactForm';
import { Store, useStore } from '../../store';
import { defaultContactFormValues } from '../ContactForm/types';

/**
 * Component for creating a contact page that is linked to with a QR code.
 *
 * @returns {JSX.Element} Rendered ContactPageCreator component.
 */
export default function ContactPageCreator() {
  const formSelector = (state: Store) => ({
    firstName: state.dynamicFormValues.firstName,
    lastName: state.dynamicFormValues.lastName,
    phone: state.dynamicFormValues.phone,
  });
  const elementIdToScrollTo = useStore(
    (state) => state.dynamicElementIdToScrollTo
  );
  const setFormValues = useStore((state) => state.setDynamicFormValues);
  const setElementIdToScrollTo = useStore(
    (state) => state.setDynamicElementIdToScrollTo
  );

  useEffect(() => {
    setTimeout(() => {
      if (elementIdToScrollTo) {
        const el = document.getElementById(elementIdToScrollTo);
        el?.scrollIntoView();
        if (elementIdToScrollTo == 'vcard-box') {
          el?.focus();
        }
        setElementIdToScrollTo(null);
      }
    }, 100);
  }, [elementIdToScrollTo, setElementIdToScrollTo]);

  const handleSubmit = () => {
    console.log('ContactPageCreator: submitted');
  };

  const handleReset = () => {
    setFormValues(defaultContactFormValues);
    window.scrollTo(0, 0);
  };

  return (
    <Grid container>
      <Grid size={{ xs: 12 }}>
        <Typography
          align="left"
          variant="h5"
          style={{ margin: '1rem 1rem 1rem 0' }}
        >
          Create a contact page
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, lg: 7 }} style={{ padding: '0.2rem 1rem 1rem 0' }}>
        <ContactForm
          formSelector={formSelector}
          setFormValues={setFormValues}
          handleSubmit={handleSubmit}
          handleReset={handleReset}
          submitLabel={'Create'}
        />
      </Grid>
    </Grid>
  );
}
