function GetData(url, select) {
  select.innerHTML = '<option value = "">Selecione a cidade</option>';
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      for (const item of data) {
        select.innerHTML += `<option value = "${item.id}">${item.nome}</option>`;
      }
    });
}
function PopulateUFs() {
  const ufSelect = document.querySelector("select[name=uf]");
  const url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";
  GetData(url, ufSelect);
}
function GetCitys(event) {
  const citySelect = document.querySelector("select[name=city]");
  const stateInput = document.querySelector("input[name=state]");
  const indexOfSelectedState = event.target.selectedIndex;
  const ufValue = event.target.value;
  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;
  stateInput.value = event.target.options[indexOfSelectedState].text;
  GetData(url, citySelect);
  citySelect.disabled = false;
}
PopulateUFs();
document.querySelector("select[name=uf]").addEventListener("change", GetCitys);

// itens de coleta
const itemnsToCollect = document.querySelectorAll(".items-grid li");
for (const item of itemnsToCollect) {
  item.addEventListener("click", HendleSelectedItem);
}
const collectedItems = document.querySelector("input[name=items]");
let selectedItems = [];

function HendleSelectedItem(event) {
  const itemLi = event.target;
  itemLi.classList.toggle("selected");

  const itemId = itemLi.dataset.id;
  const alereadySelected = selectedItems.findIndex((item) => {
    const itemFound = item == itemId;
    return itemFound;
  });

  if (alereadySelected >= 0) {
    const filteredItems = selectedItems.filter((item) => {
      const itemIsDiffrent = item != itemId;
      return itemIsDiffrent;
    });
    selectedItems = filteredItems;
  } else {
    selectedItems.push(itemId);
  }
  
  collectedItems.value = selectedItems;
}
