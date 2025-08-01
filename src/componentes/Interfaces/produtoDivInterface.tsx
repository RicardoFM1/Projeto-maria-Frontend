export interface produtoDivProps {
    className?: string,
    id?: string,
    divType: "Produto" 
    register?: {},
    placeholder?: string,
    errorMsg?: string

}

export interface iProduto {
    id: number
    name: string,
    preco_de_custo: number,
    preco_de_venda: number
}