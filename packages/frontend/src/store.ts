import { create } from 'zustand';
import { ContactFormValues } from './components/ContactForm/types';
import { defaultContactFormValues } from './components/ContactForm/types';
import { devtools } from 'zustand/middleware';

export interface Store {
  staticFormValues: ContactFormValues;
  staticContactInformation: ContactFormValues | null;
  staticContactFormSubmitLabel: string;
  staticVCardString: string;
  staticVCardEditorOpen: boolean;
  staticElementIdToScrollTo: string | null;
  dynamicFormValues: ContactFormValues;
  dynamicContactInformation: ContactFormValues | null;
  dynamicElementIdToScrollTo: string | null;
  setStaticFormValues: (staticFormValues: ContactFormValues) => void;
  setStaticContactInformation: (
    contactInformation: ContactFormValues | null
  ) => void;
  setStaticContactFormSubmitLabel: (newLabel: string) => void;
  setStaticVCardString: (vCardString: string) => void;
  setStaticVCardEditorOpen: (vCardBoxOpen: boolean) => void;
  setStaticElementIdToScrollTo: (elementId: string | null) => void;
  setDynamicFormValues: (dynamicFormValues: ContactFormValues) => void;
  setDynamicContactInformation: (
    contactInformation: ContactFormValues | null
  ) => void;
  setDynamicElementIdToScrollTo: (elementId: string | null) => void;
}

export const useStore = create<Store>()(
  devtools((set) => ({
    staticFormValues: defaultContactFormValues,
    staticContactInformation: null,
    staticContactFormSubmitLabel: 'Create',
    staticVCardString: '',
    staticVCardEditorOpen: false,
    staticElementIdToScrollTo: null,
    dynamicFormValues: defaultContactFormValues,
    dynamicContactInformation: null,
    dynamicElementIdToScrollTo: null,
    setStaticFormValues: (formValues) => set({ staticFormValues: formValues }),
    setStaticContactInformation: (contactInformation) =>
      set({ staticContactInformation: contactInformation }),
    setStaticContactFormSubmitLabel: (newLabel) =>
      set({ staticContactFormSubmitLabel: newLabel }),
    setStaticVCardString: (vCardString) =>
      set({ staticVCardString: vCardString }),
    setStaticVCardEditorOpen: (vCardEditorOpen) =>
      set({ staticVCardEditorOpen: vCardEditorOpen }),
    setStaticElementIdToScrollTo: (elementId) =>
      set({ staticElementIdToScrollTo: elementId }),
    setDynamicFormValues: (formValues) =>
      set({ dynamicFormValues: formValues }),
    setDynamicContactInformation: (contactInformation) =>
      set({ dynamicContactInformation: contactInformation }),
    setDynamicElementIdToScrollTo: (elementId) =>
      set({ dynamicElementIdToScrollTo: elementId }),
  }))
);
