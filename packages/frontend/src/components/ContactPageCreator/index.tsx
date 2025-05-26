import { Fragment, useEffect } from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import VCard from 'vcard-creator';
import ContactForm from '../ContactForm';
import getPhoneNumberTypeString from '../PhoneNumberInput/getPhoneNumberTypeString';
import QRCodeDisplay from '../QRCodeDisplay';
import VCardDisplay from '../VCardDisplay';
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
  const contactInformation = useStore(
    (state) => state.dynamicContactInformation
  );
  const vCardString = useStore((state) => state.dynamicVCardString);
  const vCardBoxOpen = useStore((state) => state.dynamicVCardBoxOpen);
  const elementIdToScrollTo = useStore(
    (state) => state.dynamicElementIdToScrollTo
  );
  const setFormValues = useStore((state) => state.setDynamicFormValues);
  const setContactInformation = useStore(
    (state) => state.setDynamicContactInformation
  );
  const setVCardString = useStore((state) => state.setDynamicVCardString);
  const setVCardBoxOpen = useStore((state) => state.setDynamicVCardBoxOpen);
  const setElementIdToScrollTo = useStore(
    (state) => state.setDynamicElementIdToScrollTo
  );

  useEffect(() => {
    if (contactInformation) {
      const vCardObject = new VCard();

      vCardObject.addName(
        contactInformation.lastName,
        contactInformation.firstName
      );
      contactInformation.phone.forEach((phone) => {
        if (!phone.number) {
          return;
        }
        const phoneTypeStr = getPhoneNumberTypeString(
          phone.type,
          phone.preferred
        );
        vCardObject.addPhoneNumber(phone.number, phoneTypeStr);
      });

      setVCardString(vCardObject.toString().trim());
    } else {
      setVCardString('');
    }
  }, [contactInformation]);

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
  }, [elementIdToScrollTo]);

  const handleSubmit = () => {
    setElementIdToScrollTo('vcard-display');
  };

  const handleReset = () => {
    setFormValues(defaultContactFormValues);
    setVCardBoxOpen(false);
    window.scrollTo(0, 0);
  };

  const handleVCardBoxOpen = () => {
    setElementIdToScrollTo('vcard-box');
  };

  return (
    <Fragment>
      <Grid container>
        <Grid item xs={12}>
          <Typography
            align="left"
            variant="h5"
            style={{ margin: '1rem 1rem 1rem 0' }}
          >
            Create a contact page
          </Typography>
        </Grid>
        <Grid item lg={7} xs={12} style={{ padding: '0.2rem 1rem 1rem 0' }}>
          <ContactForm
            formSelector={formSelector}
            setFormValues={setFormValues}
            setContactInformation={setContactInformation}
            handleSubmit={handleSubmit}
            handleReset={handleReset}
          />
        </Grid>
        <Grid item lg={5} xs={12} display={'flex'} alignContent={'center'}>
          <Stack spacing={2} direction={'column'} display={'flex'} flexGrow={1}>
            <QRCodeDisplay content={vCardString} />
            <VCardDisplay
              vCardString={vCardString}
              setVCardString={setVCardString}
              vCardBoxOpen={vCardBoxOpen}
              setVCardBoxOpen={setVCardBoxOpen}
              handleBoxOpen={handleVCardBoxOpen}
            />
          </Stack>
        </Grid>
      </Grid>
    </Fragment>
  );
}
