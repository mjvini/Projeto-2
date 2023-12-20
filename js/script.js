// retorna as moedas disponíveis para conversão
async function getMoedas(){
    const url = 'https://economia.awesomeapi.com.br/available/uniq'

    const resposta = await fetch(url) 
    const data = await resposta.json()

    const dataArr = Object.values(data)
    const keysArr = Object.keys(data)

    return [dataArr, keysArr]
}



/*// retorna a taxa de conversão das moedas
async function getTaxaConversao(moeda1, moeda2){
    const url = 'https://economia.awesomeapi.com.br/last/'+ moeda1 + '-' + moeda2

    const resposta = await fetch(url)
    const data = await resposta.json()

    //retorna valor de compra
    return data[moeda1+moeda2]['bid']
}*/

async function getTaxaConversao(moeda1, moeda2) {
    const url = 'https://economia.awesomeapi.com.br/last/' + moeda1 + '-' + moeda2;


        const resposta = await fetch(url);

        // Verifica se a resposta é bem-sucedida (código de status 2xx)
        if (!resposta.ok) {
            // Se não for, lança uma exceção com o código de status
            return "Combinação não disponivel";
        }

        const data = await resposta.json();

        // Retorna valor de compra
        return data[moeda1 + moeda2]['bid'];

    
    
}


// retorna as moedas selecionadas 
function getMoedasSelecionadas(){
    let select1 = document.querySelector('#moedaLocal')
    let moedaLocal = select1.options[select1.selectedIndex].value

    let select2 = document.querySelector('#moedasConversao')
    let moedaConversao = select2.options[select2.selectedIndex].value

    console.log(moedaLocal, moedaConversao)
    return [moedaLocal, moedaConversao]
}

function getValorInserido(){
    let input = document.querySelector('#inputValor')

    return parseFloat(input.value)
}

// retorna o valor inserido convertido
function converte(valor, taxa){
    return valor * taxa
}

function atualizaValorConvertido(valor){
    let valorConvertido = document.querySelector('#valorConvertido')

    valorConvertido.innerHTML = valor
}

// adiciona a opção das moedas disponíveis para serem selecionadas
async function adicionaMoedas(dataArr){
    opcoesMoedas = [document.getElementById('moedaLocal'), document.getElementById('moedasConversao')]

    // passa moedasArr de promise para array
    dataArr = await dataArr
    moedasArr = dataArr[0]
    keysArr = dataArr[1]


    // adiciona as opcções
    for(var j = 0; j < opcoesMoedas.length; j++){
        for(var i = 0; i < moedasArr.length; i++){
            moeda = document.createElement('option')
            moeda.innerHTML = moedasArr[i]
            moeda.value = keysArr[i]
            opcoesMoedas[j].appendChild(moeda)
            }
        }   
    }

    async function loop() {
        console.log('funciona');
    
        moedas = getMoedasSelecionadas();
        moeda1 = moedas[0];
        moeda2 = moedas[1];
    
        taxa = await getTaxaConversao(moeda1, moeda2);
        
        // Verifica se a taxa não é um número
        if (isNaN(taxa)) {
            console.error('A taxa de conversão não é um número válido.');
            valorConvertido = taxa; // Atribui diretamente o valor da taxa
        } else {
            console.log(taxa);
    
            valor = getValorInserido();
    
            valorConvertido = converte(valor, taxa);
        }
    
        atualizaValorConvertido(valorConvertido);
    }
    

window.onload = function(){
    dataArr = getMoedas()
    adicionaMoedas(dataArr)
    
}