const API_URL = "https://retoolapi.dev/rZyLoM/data";

async function obtenerPersonas() {
    const res = await fetch(API_URL);
    
    const data = await res.json();

    mostrarDatos(data);

}

function mostrarDatos(datos){
    const tabla = document.querySelector('#tabla tbody')
    tabla.innerHTML = '';

    datos.forEach(persona => {
        tabla.innerHTML += `
            <tr>
                <td>${persona.id}</td>
                <td>${persona.nombre}</td>
                <td>${persona.apellido}</td>
                <td>${persona.email}</td>
                <td>${persona.edad}</td>
                <td>
                    <button>Editar</button>
                    <button onClick="EliminarPersona(${persona.id})">Eliminar</button>
                </td>
        `
    });
}

obtenerPersonas();


const modal = document.getElementById("modal-agregar");

const btnAgregar = document.getElementById("btnAbrirModal");

const btnCerrar = document.getElementById("btnCerrarModal");

btnAgregar.addEventListener("click", ()  => {

    modal.showModal();
});


btnCerrar.addEventListener("click", ()  => {

    modal.close();
});


document.getElementById("frmAgregar").addEventListener("submit", async e => {

    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const email = document.getElementById("email").value.trim();
    const edad = document.getElementById("edad").value.trim();

    if(!nombre || !apellido || !email || !edad){
        alert("Complete todos los campos");
        return;
    }

    const respuesta = await fetch(API_URL, {
        method:"POST",
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({nombre, apellido, email, edad})
    });

    if(respuesta.ok){
        alert("El registro fue agregado correctamente")

        
        document.getElementById("frmAgregar").reset();
        modal.close();
        obtenerPersonas();
    }
    else{
        alert("Hubo un error al agregar");
    }

});



async function EliminarPersona(id){
    const confirmacion = confirm("¿Estas seguro que quieres eliminar el registro?")

    if (confirmacion){
        await fetch(`${API_URL}/${id}`, {method: "DELETE"});

        obtenerPersonas();
    }

}