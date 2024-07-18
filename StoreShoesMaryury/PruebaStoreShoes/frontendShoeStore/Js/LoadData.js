function loadContinent(){ 
    $.ajax({
        url: 'http://localhost:9090/store/api/v1/store/parameter/continent/',
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function(items){
        var registros = `<option selected="" selected disabled hidden>--- Seleccione ---</option>`;
        items.forEach(function(item, index, array){
            registros += `
                <option value="${item.id}">${item.name} </option>
            `;
        })
        $("#continentId").html(registros);
    })
}