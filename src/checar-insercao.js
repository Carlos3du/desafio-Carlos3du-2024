
import { animais } from './list-animais.js';



class ChecarInsercao {
    verificarEspeciesRecinto(recinto, especie) {
        let especiesDiferentesRecinto = recinto.animais.some(especie => especie !== recinto.animais[0]);  
        let especieDiferenteAnimal = recinto.animais.includes(especie); 
        if(especiesDiferentesRecinto === true || especieDiferenteAnimal === false) {
            return true;
        }
        else {
            return false;
        }
    };



    validarEspecie(especie) {
        let especieValida = animais.some(animal => animal.especie === especie);
        return especieValida;
    };



    verificarConfortoNovoAnimal(especie, recinto, quantidade) {
        let carnivoro = false;
        let confortavel = true;


        //* Verificar se o animal é carnívoro
        animais.some(animal => {
            if(especie === animal.especie) {
                if (animal.carnivoro === true) {
                    carnivoro = true;
                    return true;
                }
            }
        });


        //* Se for carníviro
        if(carnivoro === true) {
            let diferentes = recinto.animais.some(animal => animal.especie !== especie);
            if(diferentes === true) {
                return false; 
            }
        }


        //* Adquirir os biomas do animal
        let biomasAnimal = [];
        animais.some(animal => {
            if(especie === animal.especie) {
                biomasAnimal = animal.bioma;
                return true;
            }
        });


        //*  Verificar se o recinto é adequado para a espécie
        let checkBiomas = recinto.bioma.some(elemento => biomasAnimal.includes(elemento));
        if(checkBiomas === false) {
            confortavel = false;
        }
        

        //* Caso seja um hipopótamo
        if(especie === "HIPOPOTAMO") {
            let checkBiomas = recinto.bioma.every(elemento => biomasAnimal.includes(elemento));
            if (checkBiomas === false) {
                confortavel = false;
            }
        }

        //*  Caso seja um macaco 
        if(especie === "MACACO" && quantidade < 2) {
            if (recinto.animais.length === 0) {
                confortavel = false;
            }
        }
        
        return confortavel;
    }



    verificarConfortoAnimaisRecinto(recinto, especieNova) {
        let confortavel = true;


        recinto.animais.some(animalRecinto => {
            let animalExistente = animais.find(animal => animal.especie === animalRecinto);
            

            //* Caso algum animal do recinto seja carnivoro
            if((animalExistente.carnivoro === true )&& (especieNova !== animalExistente.especie)) {
                confortavel = false;
                return false; 
            }


            //* Se existir algum hipopótamo no recinto e o novo animal não for um hipopótamo
            if(especieNova === "HIPOPOTAMO") {
                let checkBiomas = recinto.bioma.every(bio => biomasAnimal.includes(bio));
                if(checkBiomas === false) {
                    confortavel = false;
                }
            }
        });

        return confortavel;
    }
}



export { ChecarInsercao as ChecarInsercao };
