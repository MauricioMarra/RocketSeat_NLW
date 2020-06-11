//https://servicodados.ibge.gov.br/api/docs/localidades?versao=1


function populateUFs(){
    const ufSelect = document.querySelector("select[name=state]")
    fetch("http://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) => {return res.json()})
    .then( estados => {

        for ( const estado of estados){
            ufSelect.innerHTML += `<option value="${estado.id}">${estado.nome}</option>`
        }
    })
}

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const cidadeInput = document.querySelector("input[name=cidade]")
    
    const uf = event.target.value
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`

    const indexOfSelectedState = event.target.selectedIndex
    cidadeInput.value = event.target.options[indexOfSelectedState].text

    citySelect.innerHTML = "<option>Selecione a cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( (res) => {return res.json()} )
    .then( cities => {
        
        for ( const cidade of cities){
            citySelect.innerHTML += `<option value="${cidade.nome}">${cidade.nome}</option>`
        }

        citySelect.disabled = false

    })
}


populateUFs()

document
    .querySelector("select[name=state]")
    .addEventListener("change", getCities)


const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=selectedItems]")
const items = document.querySelector("input[name=items]")
let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target
    
    itemLi.classList.toggle("selected")

    const itemId = event.target.dataset.id

    
    const alreadySelected = selectedItems.findIndex(function(item){
        return item == itemId
    })


    if (alreadySelected >= 0){
        const filteredItems = selectedItems.filter( (item) =>{
            return item != itemId
        })

        selectedItems = filteredItems
    }
    else{
        selectedItems.push(itemId)
    }

    console.log(selectedItems)
    collectedItems.value = selectedItems
    items.value = selectedItems
    
}