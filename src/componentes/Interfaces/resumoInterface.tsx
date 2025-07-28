

export interface iResumo {
    totalProdutosVendidos: number,
    faturamentoTotal: number,
    lucroTotal: number
}
export interface ResumoDivProps {
    className?: string,
    id?: string,
    divType: "Resumo" 
    register?: {},
    placeholder?: string,
    errorMsg?: string

}