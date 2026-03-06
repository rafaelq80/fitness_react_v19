import  type Refeicao from "./Refeicao";

export default interface Dieta{
    refeicoes: Refeicao[];
    totalCalorias: number;
}