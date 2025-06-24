import { useEffect } from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import VCard from 'vcard-creator';
import ContactForm from '../ContactForm';
import getPhoneNumberTypeString from '../PhoneNumberInput/getPhoneNumberTypeString';
import QRCodeDisplay from '../QRCodeDisplay';
import VCardDisplay from '../VCardDisplay';
import { Store, useStore } from '../../store';
import {
  ContactFormValues,
  defaultContactFormValues,
} from '../ContactForm/types';

/**
 * Component for creating a vCard QR code.
 *
 * @returns {JSX.Element} Rendered ContactQRCreator component.
 */
export default function ContactQRCreator() {
  const formSelector = (state: Store) => ({
    firstName: state.staticFormValues.firstName,
    lastName: state.staticFormValues.lastName,
    phone: state.staticFormValues.phone,
  });

  const contactFormSubmitLabel = useStore(
    (state) => state.staticContactFormSubmitLabel
  );
  const vCardString = useStore((state) => state.staticVCardString);
  const formVCardString = useStore((state) => state.staticFormVCardString);
  const elementIdToScrollTo = useStore(
    (state) => state.staticElementIdToScrollTo
  );
  const setFormValues = useStore((state) => state.setStaticFormValues);
  const setContactInformation = useStore(
    (state) => state.setStaticContactInformation
  );
  const setContactFormSubmitLabel = useStore(
    (state) => state.setStaticContactFormSubmitLabel
  );
  const setVCardString = useStore((state) => state.setStaticVCardString);
  const setFormVCardString = useStore(
    (state) => state.setStaticFormVCardString
  );
  const setElementIdToScrollTo = useStore(
    (state) => state.setStaticElementIdToScrollTo
  );

  function createVCardString(formValues: ContactFormValues) {
    const vCardObject = new VCard();

    vCardObject.addName(formValues.lastName, formValues.firstName);
    formValues.phone.forEach((phone) => {
      if (!phone.number) {
        return;
      }
      const phoneTypeStr = getPhoneNumberTypeString(
        phone.type,
        phone.preferred
      );
      vCardObject.addPhoneNumber(phone.number, phoneTypeStr);
    });

    return vCardObject.toString().trim();
  }

  useEffect(() => {
    setTimeout(() => {
      if (elementIdToScrollTo) {
        const el = document.getElementById(elementIdToScrollTo);
        el?.scrollIntoView();
        setElementIdToScrollTo(null);
      }
    }, 100);
  }, [elementIdToScrollTo, setElementIdToScrollTo]);

  const handleSubmit = (formValues: ContactFormValues) => {
    setContactInformation(formValues);
    const newVCardString = createVCardString(formValues);
    setVCardString(newVCardString);
    setFormVCardString(newVCardString);
    setElementIdToScrollTo('vcard-display');
    setContactFormSubmitLabel('Update');
  };

  const handleReset = () => {
    setFormValues(defaultContactFormValues);
    setContactInformation(null);
    setVCardString('');
    setFormVCardString('');
    setContactFormSubmitLabel('Create');
    window.scrollTo(0, 0);
  };

  const doConfirmation = () => {
    return !!vCardString;
  };

  return (
    <Grid container>
      <Grid size={{ xs: 12 }}>
        <Typography
          align="left"
          variant="h5"
          style={{ margin: '1rem 1rem 1rem 0' }}
        >
          Create a vCard QR code
        </Typography>
      </Grid>
      <Grid size={{ xs: 12, lg: 7 }} style={{ padding: '0.2rem 1rem 1rem 0' }}>
        <ContactForm
          formSelector={formSelector}
          setFormValues={setFormValues}
          handleSubmit={handleSubmit}
          handleReset={handleReset}
          resetConfirmationProps={{
            dialogTitle: 'Are you sure you want to clear the form?',
            dialogContent:
              'Clearing the form will also clear the vCard and the QR code.',
            doConfirmation,
          }}
          submitLabel={contactFormSubmitLabel}
          data-testid="contact-form"
        />
      </Grid>
      <Grid size={{ xs: 12, lg: 5 }} display={'flex'} alignContent={'center'}>
        <Stack spacing={2} direction={'column'} display={'flex'} flexGrow={1}>
          <QRCodeDisplay
            vCardString={vCardString}
            formVCardString={formVCardString}
          />
          <VCardDisplay
            vCardString={vCardString}
            setVCardString={setVCardString}
            data-testid="vcard-display"
          />
        </Stack>
      </Grid>
    </Grid>
  );
}
