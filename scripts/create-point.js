function GetData(url, select) {
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
  GetData(url, citySelect);
  stateInput.value = event.target.options[indexOfSelectedState].text;
  citySelect.disabled = false;
}
PopulateUFs();
document.querySelector("select[name=uf]").addEventListener("change", GetCitys);
