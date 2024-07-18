// Busqueda por id
function findById(id) {
    $.ajax({
        url: 'http://localhost:9090/store/api/v1/store/parameter/country/' + id,
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (item) {
        $("#id").val(item.id)
        $("#nameCountry").val(item.name)
        $("#description").val(item.description)
        $("#status").val(
            item.status === 'ACTIVO' ? '1' :
            item.status === 'INACTIVO' ? '0' :'2'
          );
        $("#ContinentId").val(item.continent.id);
    })
}
function loadTable() {
    $.ajax({
        url: 'http://localhost:9090/store/api/v1/store/parameter/country/',
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (items) {
        var registros = "";
        items.forEach(function (item, index, array) { 
            registros += `
                        <tr class="table-light">
                            <td>${item.continent.name}</td>
                            <td>${ item.id$} </td>
                            <td>${ item.name  }</td>
                            <td>${ item.description }</td>
                            <td>`+ (
                                item.status === 'ACTIVO' ? 'Activo' :
                                item.status === 'INACTIVO' ? 'Inactivo' :'2'
                                
                              ) + `</td>
                            <td><button class="btnEdit" type="button" onclick="findById('${item.id}');" data-bs-toggle="modal"
                            data-bs-target="#modalCountry"><i class="fi fi-rr-pencil"></i></button></td>
                            <td><button class="btnDelete" type="button" onclick="deleteById('${ item.id }');"><i class="fi fi-rr-trash"></i></button></td>
                        </tr>
                        `;
        })
        $("#dataResult").html(registros);
    })
}

//Accion para eliminar un registro seleccionado 
function deleteById(id) {
    Swal.fire({
        title: '¿Está seguro?',
        text: "¡No podrá revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarlo!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: 'http://localhost:9090/store/api/v1/store/parameter/country/' + id,
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            }).done(function (result) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 4000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })

                Toast.fire({
                    icon: 'success',
                    title: 'Pais eliminado',
                });
                loadTable();
            })
        }
    })
}

//Accion de adicionar un registro
function Save() {
    // Obtener el valor del campo de ID
    var id = $("#id").val();
    
    // Crear el objeto de datos a enviar
    var data = {
        status: ($("#status").val() === '1') ? 'ACTIVO' : 'INACTIVO',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: new Date(),
        name: $("#nameCountry").val(),
        description: $("#description").val(),
        continent: {
            id: $("#continentId").val()
        }

    };
    if (id!==""){data.id=id}
    
    // Determinar si se debe realizar una solicitud POST o PUT
    var method = (id !== "") ? "PUT" : "POST";
    var url = (id !== "") ? "http://localhost:9090/store/api/v1/store/parameter/country/" + id : "http://localhost:9090/store/api/v1/store/parameter/country/";

    // Realizar la solicitud AJAX
    $.ajax({
        url: url,
        data: JSON.stringify(data),
        method: method,
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function (result) {
        //Cargar datos
        loadTable();
        //Limpiar formulario
        clearData();

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: (method === "POST") ? 'success' : 'warning',
            title: (method === "POST") ? 'Registro exitoso' : 'Modificación exitosa',
        });
    }).fail(function (jqXHR, textStatus, errorThrown) {
        // Si la respuesta es un error
        Swal.fire({
            icon: 'error',
            title: "Error",
            text: jqXHR.responseJSON.message,
        })
    });
}

// Función para limpiar datos
function clearData() {
    $("#id").val("")
    $("#nameCountry").val("")
    $("#ContinentId").val("");
    $("#description").val("")
    $("#status").val("")
}
