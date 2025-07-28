

export interface iVenda {
    produto:{
        name: string,
        preco_de_custo: number,
        preco_de_venda: number,
        id: number
    },
    quantidade: number,
    total_vendido: number,
    total_lucro: number,
    data_da_venda: string,
    id: number
}
export interface vendaDivProps {
    className?: string,
    id?: string,
    divType: "Venda" 
    register?: {},
    placeholder?: string,
    errorMsg?: string

}