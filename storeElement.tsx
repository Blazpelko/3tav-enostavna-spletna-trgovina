import create from 'zustand';
import produce from "immer";
import { Elements, Izdelek, IzdelekKosarica } from './types';

const useStore = create<Elements>((set) => ({
    selected: [],
    // addElement: (e) => set((state) => ({selected:[...state.selected,e]})),
    addElement: (e: Izdelek) => set(
        produce((draft) => {
            const indeks = draft.selected.findIndex((el: IzdelekKosarica) => el.product.id === e.id);
            if (indeks === -1) {
                draft.selected.push(
                    {
                        product: e,
                        st: 1,
                    }
                );
            } else {
                draft.selected[indeks].st = draft.selected[indeks].st + 1;
            }
        })
    ),
    removeElement: (e: Izdelek) => set(
        produce((draft) => {
            const indeks = draft.selected.findIndex((el: IzdelekKosarica) => el.product.id === e.id);
            if (indeks !== -1) {
                draft.selected[indeks].st = draft.selected[indeks].st - 1;
                //Ce je st 0 ga izbrišemo
                if (draft.selected[indeks].st === 0) {
                    draft.selected.splice(indeks, 1);
                }
            }
        })
    ),
}))

export default useStore;