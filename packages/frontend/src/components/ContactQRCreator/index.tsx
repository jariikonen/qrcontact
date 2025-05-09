import { Fragment, useEffect, useState } from 'react';
import { Grid, Stack, Typography } from '@mui/material';
import VCard from 'vcard-creator';
import { ContactFormValues } from './ContactForm/types';
import ContactForm from './ContactForm';
import getPhoneNumberTypeString from '../PhoneNumberInput/getPhoneNumberTypeString';
import QRCodeDisplay from '../QRCodeDisplay';
import VCardDisplay from '../VCardDisplay';

/**
 * Component for creating a VCard QR code.
 *
 * @returns {JSX.Element} Rendered ContactQRCreator component.
 */
export default function ContactQRCreator() {
  const [contactInformation, setContactInformation] =
    useState<ContactFormValues | null>(null);
  const [vCardString, setVCardString] = useState('');
  const [vCardBoxOpen, setVCardBoxOpen] = useState(false);
  const [elementIdToScrollTo, setElementIdToScrollTo] = useState<string | null>(
    null
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
    setContactInformation(null);
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
            Create a VCard QR-code
          </Typography>
        </Grid>
        <Grid item lg={7} xs={12} style={{ padding: '0.2rem 1rem 1rem 0' }}>
          <ContactForm
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
