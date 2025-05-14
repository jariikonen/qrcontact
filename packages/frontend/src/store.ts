import { create } from 'zustand';
import { ContactFormValues } from './components/ContactForm/types';

export type Store = {
  staticContactInformation: ContactFormValues | null;
  staticVCardString: string;
  staticVCardBoxOpen: boolean;
  staticElementIdToScrollTo: string | null;
  dynamicContactInformation: ContactFormValues | null;
  dynamicVCardString: string;
  dynamicVCardBoxOpen: boolean;
  dynamicElementIdToScrollTo: string | null;
  setStaticContactInformation: (
    contactInformation: ContactFormValues | null
  ) => void;
  setStaticVCardString: (vCardString: string) => void;
  setStaticVCardBoxOpen: (vCardBoxOpen: boolean) => void;
  setStaticElementIdToScrollTo: (elementId: string | null) => void;
  setDynamicContactInformation: (
    contactInformation: ContactFormValues | null
  ) => void;
  setDynamicVCardString: (vCardString: string) => void;
  setDynamicVCardBoxOpen: (vCardBoxOpen: boolean) => void;
  setDynamicElementIdToScrollTo: (elementId: string | null) => void;
};

export function createStore() {
  return create<Store>()((set) => ({
    staticContactInformation: null,
    staticVCardString: '',
    staticVCardBoxOpen: false,
    staticElementIdToScrollTo: null,
    dynamicContactInformation: null,
    dynamicVCardString: '',
    dynamicVCardBoxOpen: false,
    dynamicElementIdToScrollTo: null,
    setStaticContactInformation: (contactInformation) =>
      set({ staticContactInformation: contactInformation }),
    setStaticVCardString: (vCardString) =>
      set({ staticVCardString: vCardString }),
    setStaticVCardBoxOpen: (vCardBoxOpen) =>
      set({ staticVCardBoxOpen: vCardBoxOpen }),
    setStaticElementIdToScrollTo: (elementId) =>
      set({ staticElementIdToScrollTo: elementId }),
    setDynamicContactInformation: (contactInformation) =>
      set({ dynamicContactInformation: contactInformation }),
    setDynamicVCardString: (vCardString) =>
      set({ dynamicVCardString: vCardString }),
    setDynamicVCardBoxOpen: (vCardBoxOpen) =>
      set({ dynamicVCardBoxOpen: vCardBoxOpen }),
    setDynamicElementIdToScrollTo: (elementId) =>
      set({ staticElementIdToScrollTo: elementId }),
  }));
}
