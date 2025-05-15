import { create } from 'zustand';
import { ContactFormValues } from './components/ContactForm/types';

export type Store = {
  staticFormValues: Partial<ContactFormValues> | null;
  staticContactInformation: ContactFormValues | null;
  staticVCardString: string;
  staticVCardBoxOpen: boolean;
  staticElementIdToScrollTo: string | null;
  dynamicFormValues: Partial<ContactFormValues> | null;
  dynamicContactInformation: ContactFormValues | null;
  dynamicVCardString: string;
  dynamicVCardBoxOpen: boolean;
  dynamicElementIdToScrollTo: string | null;
  setStaticFormValues: (
    partialFormValues: Partial<ContactFormValues> | null
  ) => void;
  setStaticContactInformation: (contactInformation: ContactFormValues) => void;
  setStaticVCardString: (vCardString: string) => void;
  setStaticVCardBoxOpen: (vCardBoxOpen: boolean) => void;
  setStaticElementIdToScrollTo: (elementId: string | null) => void;
  setDynamicFormValues: (
    partialFormValues: Partial<ContactFormValues> | null
  ) => void;
  setDynamicContactInformation: (contactInformation: ContactFormValues) => void;
  setDynamicVCardString: (vCardString: string) => void;
  setDynamicVCardBoxOpen: (vCardBoxOpen: boolean) => void;
  setDynamicElementIdToScrollTo: (elementId: string | null) => void;
};

export const useStore = create<Store>()((set) => ({
  staticFormValues: null,
  staticContactInformation: null,
  staticVCardString: '',
  staticVCardBoxOpen: false,
  staticElementIdToScrollTo: null,
  dynamicFormValues: null,
  dynamicContactInformation: null,
  dynamicVCardString: '',
  dynamicVCardBoxOpen: false,
  dynamicElementIdToScrollTo: null,
  setStaticFormValues: (partialFormValues) =>
    set((state) => ({
      staticFormValues: { ...state.staticFormValues, ...partialFormValues },
    })),
  setStaticContactInformation: (contactInformation) =>
    set({ staticContactInformation: contactInformation }),
  setStaticVCardString: (vCardString) =>
    set({ staticVCardString: vCardString }),
  setStaticVCardBoxOpen: (vCardBoxOpen) =>
    set({ staticVCardBoxOpen: vCardBoxOpen }),
  setStaticElementIdToScrollTo: (elementId) =>
    set({ staticElementIdToScrollTo: elementId }),
  setDynamicFormValues: (partialFormValues) =>
    set((state) => ({
      dynamicFormValues: { ...state.dynamicFormValues, ...partialFormValues },
    })),
  setDynamicContactInformation: (contactInformation) =>
    set({ staticContactInformation: contactInformation }),
  setDynamicVCardString: (vCardString) =>
    set({ dynamicVCardString: vCardString }),
  setDynamicVCardBoxOpen: (vCardBoxOpen) =>
    set({ dynamicVCardBoxOpen: vCardBoxOpen }),
  setDynamicElementIdToScrollTo: (elementId) =>
    set({ staticElementIdToScrollTo: elementId }),
}));
