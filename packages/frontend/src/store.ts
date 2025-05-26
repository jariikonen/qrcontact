import { create } from 'zustand';
import { ContactFormValues } from './components/ContactForm/types';
import { defaultContactFormValues } from './components/ContactForm/types';
import { devtools } from 'zustand/middleware';

export type Store = {
  staticFormValues: ContactFormValues;
  staticContactInformation: ContactFormValues | null;
  staticVCardString: string;
  staticVCardBoxOpen: boolean;
  staticElementIdToScrollTo: string | null;
  dynamicFormValues: ContactFormValues;
  dynamicContactInformation: ContactFormValues | null;
  dynamicVCardString: string;
  dynamicVCardBoxOpen: boolean;
  dynamicElementIdToScrollTo: string | null;
  setStaticFormValues: (staticFormValues: ContactFormValues) => void;
  setStaticContactInformation: (
    contactInformation: ContactFormValues | null
  ) => void;
  setStaticVCardString: (vCardString: string) => void;
  setStaticVCardBoxOpen: (vCardBoxOpen: boolean) => void;
  setStaticElementIdToScrollTo: (elementId: string | null) => void;
  setDynamicFormValues: (dynamicFormValues: ContactFormValues) => void;
  setDynamicContactInformation: (
    contactInformation: ContactFormValues | null
  ) => void;
  setDynamicVCardString: (vCardString: string) => void;
  setDynamicVCardBoxOpen: (vCardBoxOpen: boolean) => void;
  setDynamicElementIdToScrollTo: (elementId: string | null) => void;
};

export const useStore = create<Store>()(
  devtools((set) => ({
    staticFormValues: defaultContactFormValues,
    staticContactInformation: null,
    staticVCardString: '',
    staticVCardBoxOpen: false,
    staticElementIdToScrollTo: null,
    dynamicFormValues: defaultContactFormValues,
    dynamicContactInformation: null,
    dynamicVCardString: '',
    dynamicVCardBoxOpen: false,
    dynamicElementIdToScrollTo: null,
    setStaticFormValues: (formValues) => set({ staticFormValues: formValues }),
    setStaticContactInformation: (contactInformation) =>
      set({ staticContactInformation: contactInformation }),
    setStaticVCardString: (vCardString) =>
      set({ staticVCardString: vCardString }),
    setStaticVCardBoxOpen: (vCardBoxOpen) =>
      set({ staticVCardBoxOpen: vCardBoxOpen }),
    setStaticElementIdToScrollTo: (elementId) =>
      set({ staticElementIdToScrollTo: elementId }),
    setDynamicFormValues: (formValues) =>
      set({ dynamicFormValues: formValues }),
    setDynamicContactInformation: (contactInformation) =>
      set({ dynamicContactInformation: contactInformation }),
    setDynamicVCardString: (vCardString) =>
      set({ dynamicVCardString: vCardString }),
    setDynamicVCardBoxOpen: (vCardBoxOpen) =>
      set({ dynamicVCardBoxOpen: vCardBoxOpen }),
    setDynamicElementIdToScrollTo: (elementId) =>
      set({ dynamicElementIdToScrollTo: elementId }),
  }))
);
