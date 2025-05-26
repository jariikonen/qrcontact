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
  const contactInformation = useStore(
    (state) => state.staticContactInformation
  );
  const vCardString = useStore((state) => state.staticVCardString);
  const vCardBoxOpen = useStore((state) => state.staticVCardBoxOpen);
  const elementIdToScrollTo = useStore(
    (state) => state.staticElementIdToScrollTo
  );
  const setFormValues = useStore((state) => state.setStaticFormValues);
  const setContactInformation = useStore(
    (state) => state.setStaticContactInformation
  );
  const setVCardString = useStore((state) => state.setStaticVCardString);
  const setVCardBoxOpen = useStore((state) => state.setStaticVCardBoxOpen);
  const setElementIdToScrollTo = useStore(
    (state) => state.setStaticElementIdToScrollTo
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
            Create a vCard QR code
          </Typography>
        </Grid>
        <Grid item lg={7} xs={12} style={{ padding: '0.2rem 1rem 1rem 0' }}>
          <ContactForm
            formSelector={formSelector}
            setFormValues={setFormValues}
            setContactInformation={setContactInformation}
            elementIdToScrollTo={elementIdToScrollTo}
            setElementIdToScrollTo={setElementIdToScrollTo}
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
