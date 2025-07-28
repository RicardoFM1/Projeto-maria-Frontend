

export interface despesaDivProps {
    className?: string,
    id?: string,
    divType: "Despesa" 
    register?: {},
    placeholder?: string,
    errorMsg?: string

}

export interface iDespesa {
    name: string,
    valor: number
}