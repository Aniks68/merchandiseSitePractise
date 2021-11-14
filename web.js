// Validation Codes for Inputs



$("#add-newuser").click(function(event){
    event.preventDefault();
    if (confirm("Do you want to create user?") == true) {
        const newU = $("#newuser").val().toLowerCase();
        const newP = $("#newpass").val();
        const newE = $("#newmail").val();
        console.log(`${newU} has been created as a JADU admin`)

        const newAdmin = {
            username: newU,
            password: newP,
            email: newE
        }

        $.post("http://localhost:3000/users", newAdmin, alert(`Admin ${newU} created successfully`));
    } else {
        alert(`New user was not created`)
    }
});

$("#new-product").click(function(event){
    event.preventDefault();
    if (confirm("Do you want to add product?") == true) {
        const newProName = $("#newPN").val();
        const newProPrice = $("#newPP").val();
        const newProDes = $("newPD").val();
        const newProQuant = $("newPQ").val();
        console.log(`${newProName} has been added to inventory`)

        const newProduct = {
            "Product Name": newProName,
            "Product Price": newProPrice,
            "Product Description": newProDes,
            "Product Quantity": newProQuant
        }

        $.post("http://localhost:3000/products", newProduct, alert(`${newProName} has been added successfully`));
    } else {
        alert(`Creation was cancelled`)
    }

});

$("#list").click(function(){
    event.preventDefault();
    $.get("http://localhost:3000/users",function(data){
        console.log(data);
        
        for (let item in data) {
            $('#plist').append(`<li id=${item+1}>${data[item]["Product Name"]}  <br>[Price = ₦${data[item]["Product Price"]}] <br>Description: ${data[index]["Product Description"]}<br>QTY: ${data[index]["Product Quantity"]} <br>Product ID: ${data[index]["id"]}</li>`);
            console.log(data[item]);
        };  
    
    });
});

$("#adlogin").click(function validate() {
    event.preventDefault();
    const username = $("#aduser").val().toLowerCase();
    const password = $("#adpass").val();
    let validate = false;
    $.get("http://localhost:3000/users",function(data){
        console.log(data);
        
        for (let item in data) {
            if (data[item].username === username && data[item].password === password) {
                validate= true;
                break;
            }
        }
        // validate = data.filter(function(){

        // });

        if (validate) {
            //alert('Login successful');
           $message = $('#message')
           $message.addClass('success');
           $message.html('Login successfully');

            setTimeout(function(){
                window.location = "/index.html";
            }, 2000);

        }else{
            $message = $('#message')
           $message.addClass('danger');
           $message.html('Login failed!! Please try again.');
        }
    })
});

$("#edit-product").click((event)=> {
    event.preventDefault();
    if (confirm("Do you want to save changes?") == true) {
        let product = $("#proId").val();
        // product = parseInt(product);
        // console.log(product);
    let editedPN = $('#editPN').val();
    let editedPP = $('#editPP').val();
    let editedPD = $('#editPD').val();
    let editedPQ = $('#editPQ').val();
    let completedata = {
        "Product Name": editedPN,
        "Product Price": editedPP,
        "Product Description": editedPD,
        "Product Quantity": editedPQ
    }    
            $.ajax({
                url: `http://localhost:3000/products/${product}`,
                type: 'PATCH',
                data: completedata,
                dataType: 'json',
                success: function(){
                    alert(`"Product successfully updated"`);
                }
            });
        } else {alert(`"Product update cancelled"`);}
        
    
});

$('#logout').click(function () {
    event.preventDefault();
    if (confirm(`Do you want to log out?`) === true) {
        window.location = '/product_project/login.html';
    }
});

