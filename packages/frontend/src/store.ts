import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ContactFormValues } from './components/ContactForm/types';
import { defaultContactFormValues } from './components/ContactForm/types';

// The store contains a shared state that can be used by all components of the
// application.
//
// ContactQRCreator creates a QR code that contains static contact information
// and is therefore referred to below with the prefix static.
// ContactPageCreator, however, creates a web page that is dynamically created
// each time the user visits its URL, and it is therefore referred to with the
// prefix dynamic.
export interface Store {
  /** The current contact form values of the ContactQRCreator. */
  staticFormValues: ContactFormValues;

  /** The submitted contact form values of the ContactQRCreator. */
  staticContactInformation: ContactFormValues | null;

  /** The submit button label of the ContactForm of the ContactQRCreator. */
  staticContactFormSubmitLabel: string;

  /** The vCard string used in the ContactQRCreator. */
  staticVCardString: string;

  /**
   * Boolean indicating wether the vCard string has been manually edited after
   * it was submitted, that is used in the ContactQRCreator.
   */
  staticVCardEdited: boolean;

  /**
   * Id of an HTML element that should be scrolled to, that is used in the
   * ContactQRCreator.
   */
  staticElementIdToScrollTo: string | null;

  /** The current contact form values of the ContactPageCreator. */
  dynamicFormValues: ContactFormValues;

  /** The submitted contact form values of the ContactPageCreator. */
  dynamicContactInformation: ContactFormValues | null;

  /**
   * Id of an HTML element that should be scrolled to, that is used in the
   * ContactPageCreator.
   */
  dynamicElementIdToScrollTo: string | null;

  /** Sets the current contact form values of the ContactQRCreator. */
  setStaticFormValues: (staticFormValues: ContactFormValues) => void;

  /** Sets the submitted contact form values of the ContactQRCreator. */
  setStaticContactInformation: (
    contactInformation: ContactFormValues | null
  ) => void;

  /**
   * Sets the submit button label of the ContactForm of the ContactQRCreator.
   */
  setStaticContactFormSubmitLabel: (newLabel: string) => void;

  /** Sets the vCard string, that is used in the ContactQRCreator. */
  setStaticVCardString: (vCardString: string) => void;

  /**
   * Sets the boolean indicating wether the vCard string has been edited after
   * it was submitted, that is used in the ContactQRCreator.
   */
  setStaticVCardEdited: (vCardEdited: boolean) => void;

  /**
   * Sets the id of an HTML element that should be scrolled to, that is used
   * in the ContactQRCreator.
   */
  setStaticElementIdToScrollTo: (elementId: string | null) => void;

  /** Sets the current contact form values of the ContactPageCreator. */
  setDynamicFormValues: (dynamicFormValues: ContactFormValues) => void;

  /** Sets the submitted contact form values of the ContactPageCreator. */
  setDynamicContactInformation: (
    contactInformation: ContactFormValues | null
  ) => void;

  /**
   * Sets the id of an HTML element that should be scrolled to, that is used
   * in the ContactPageCreator.
   */
  setDynamicElementIdToScrollTo: (elementId: string | null) => void;

  /** Resets the store to default values. */
  reset: () => void;
}

const defaultStoreValues: Pick<
  Store,
  | 'staticFormValues'
  | 'staticContactInformation'
  | 'staticContactFormSubmitLabel'
  | 'staticVCardString'
  | 'staticVCardEdited'
  | 'staticElementIdToScrollTo'
  | 'dynamicFormValues'
  | 'dynamicContactInformation'
  | 'dynamicElementIdToScrollTo'
> = {
  staticFormValues: defaultContactFormValues,
  staticContactInformation: null,
  staticContactFormSubmitLabel: 'Create',
  staticVCardString: '',
  staticVCardEdited: false,
  staticElementIdToScrollTo: null,
  dynamicFormValues: defaultContactFormValues,
  dynamicContactInformation: null,
  dynamicElementIdToScrollTo: null,
};

export const useStore = create<Store>()(
  devtools((set) => ({
    ...defaultStoreValues,
    setStaticFormValues: (formValues) => set({ staticFormValues: formValues }),
    setStaticContactInformation: (contactInformation) =>
      set({ staticContactInformation: contactInformation }),
    setStaticContactFormSubmitLabel: (newLabel) =>
      set({ staticContactFormSubmitLabel: newLabel }),
    setStaticVCardString: (vCardString) =>
      set({ staticVCardString: vCardString }),
    setStaticVCardEdited: (vCardEdited) =>
      set({ staticVCardEdited: vCardEdited }),
    setStaticElementIdToScrollTo: (elementId) =>
      set({ staticElementIdToScrollTo: elementId }),
    setDynamicFormValues: (formValues) =>
      set({ dynamicFormValues: formValues }),
    setDynamicContactInformation: (contactInformation) =>
      set({ dynamicContactInformation: contactInformation }),
    setDynamicElementIdToScrollTo: (elementId) =>
      set({ dynamicElementIdToScrollTo: elementId }),
    reset: () => {
      set(defaultStoreValues);
    },
  }))
);
