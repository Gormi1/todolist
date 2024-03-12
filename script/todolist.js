
const comprobarCheckbox = () =>{
    var ValComp;
    if (document.getElementById("completed").checked){            
        ValComp = true;
    }else{
        ValComp = false;
    }
    return ValComp
}

const verificar = (name) =>{
    let verificar;
    if (name != "") {
        verificar = true;
    }
    else{
        verificar = false;
    }
    return verificar
}

const Colores = (val) =>{
    if (val == true){
        let color = "SpringGreen";
        return color
    }else{
        let color = "tomato";
        return color
    }
}
let url = "http://127.0.0.1:5500/todolist.html";
$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        success: function (data) {
            console.log(data);
            $.each(data, function (i, todo) { 
                let renglon = $(`<tr style="background-color: ${Colores(todo.Completed)};"></tr>`);
                $("#Tabla").append(
                    renglon.html(`
                        <td>${todo.Id}</td>
                        <td>${todo.Name}</td>
                    `)
                );
            });
        },
        error: function (xhr, status, error) { 
            console.log("Status: " + status);
            console.log("Msg: " + xhr);
            console.log("error: " + error)
        }
    });

    

    
    console.log(comprobarCheckbox())

    $("#btn").click(function () { 
        let Nombre = $("#name").val();
        if (verificar(Nombre)) {
            $.ajax({
                type: "post",
                url: url,
                dataType: "Json",
                data:{
                    Name: Nombre,
                    Completed:comprobarCheckbox()
                },
                success: function (data, status, xhr) {
                    console.log("data: " + data + "\nStatus: " + status + "\nMsg: " +xhr);
                },
                error: function (xhr, status) { 
                    console.log("Status: " + status + "Msg: " +xhr);
                }
            });
        }else{
            alert("Inserte el nombre de una tarea por hacer")
        }
        
    });

    
});
