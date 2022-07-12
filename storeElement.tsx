import create from 'zustand';
import produce from "immer";
import { Elements, Izdelek, IzdelekKosarica } from './types';
import _ from 'lodash';

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
    clean: () => set((state) => ({ selected: [] })),
    sortBy: (e: string) => set(
        produce((draft) => {
            switch (e) {
                case "ime":
                    draft.selected=_.sortBy(draft.selected, [function (o) { return o.product.id; }]);
                    break;
                case "cena":
                    draft.selected=_.sortBy(draft.selected, [function (o) { return o.product.cena; }]);
                    break;
                case "cenaSkupna":
                    draft.selected=_.sortBy(draft.selected, [function (o) { return o.product.cena * o.st }]).reverse();
                    break;
                default:
                    draft.selected
                    break;
            }
        })
    ),
}))

export default useStore;