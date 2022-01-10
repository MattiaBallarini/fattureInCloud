export interface Anno {
    mesi: Mese[];
}

export interface Mese {
    documenti: number;
    importo: number;
    selezionato: boolean;
}