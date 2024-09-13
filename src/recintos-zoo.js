import { ChecarInsercao } from "./checar-insercao";
import { recintos } from './list-recintos.js';
import { animais } from './list-animais.js';



class RecintosZoo {
    ChecarInsercao = new ChecarInsercao();

    analisaRecintos(animal, quantidade) {
        let resultado = {
            recintosViaveis: [],
            erro: false
        };


        for (let recinto of recintos) {
            let tamanhoRecinto = recinto.tamanho;

            //* Calcular o tamanho do recinto com os animais
            recinto.animais.forEach(animal => {
                animais.some(anim => {
                    if(anim.especie === animal){
                        tamanhoRecinto -= anim.tamanho;
                        return tamanhoRecinto;
                    }
                });
            })
            

            //* Adquirir o tamanho do novo animal
            let tamanhoAnimal = 0;
            animais.some(anim => {
                if(anim.especie === animal){
                    tamanhoAnimal = anim.tamanho;
                    return tamanhoAnimal;
                }
            });
            
            
            if(this.ChecarInsercao.validarEspecie(animal) === false) {
                resultado.recintosViaveis = false;
                resultado.erro = "Animal inválido";
                return resultado; 

            }else if(quantidade <= 0) {
                resultado.recintosViaveis = false;
                resultado.erro = "Quantidade inválida";
                return resultado; 

            }else {
                if((recinto.animais.length !=0) && (this.ChecarInsercao.verificarEspeciesRecinto(recinto, animal) === true)) {
                   tamanhoRecinto -= 1;
                }
                if(tamanhoRecinto >= (tamanhoAnimal * quantidade)) {
                    if((this.ChecarInsercao.verificarConfortoNovoAnimal(animal, recinto, quantidade) === true) && (this.ChecarInsercao.verificarConfortoAnimaisRecinto(recinto, animal) === true)) {
                        resultado.recintosViaveis.push(`Recinto ${recinto.num} (espaço livre: ${(tamanhoRecinto - (tamanhoAnimal * quantidade))} total: ${recinto.tamanho})`);
                    }
                }
            }
        }

        if(resultado.recintosViaveis.length === 0) {
            resultado.recintosViaveis = false;
            resultado.erro = "Não há recinto viável";
        }
        
        return resultado;
    }
}



export { RecintosZoo as RecintosZoo };
