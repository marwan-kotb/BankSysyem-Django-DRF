document.addEventListener('DOMContentLoaded', function() {

    document.querySelector('#Customers').addEventListener('click', Customers);
    document.querySelector('#Customers').addEventListener('click', CreateCustomers);
    document.querySelector('#Accounts').addEventListener('click', Accounts);
    document.querySelector('#Accounts').addEventListener('click', CreateAccounts);
    document.querySelector('#Merchants').addEventListener('click', Merchants);
    document.querySelector('#Merchants').addEventListener('click', CreateMerchants);
    document.querySelector('#Products').addEventListener('click', Products);
    document.querySelector('#Products').addEventListener('click', CreateProducts);
    document.querySelector('#CustomerPurchase').addEventListener('click', CustomerPurchase);
    document.querySelector('#CustomerPurchase').addEventListener('click', CreateCustomerPurchase);
    document.querySelector('#Transactions').addEventListener('click', Transactions);
    document.querySelector('#BankSystem').addEventListener('click', BankSystem);

    hideorshow('CustomerForm','none');
    hideorshow('AccountForm','none');
    hideorshow('MerchantForm','none');
    hideorshow('ProductForm','none');
    hideorshow('CustomerPurchaseForm','none');
    document.querySelector('#customerbar').style.display = 'none'
    document.querySelector('#accountbar').style.display = 'none'
    document.querySelector('#merchantbar').style.display = 'none'
    document.querySelector('#productbar').style.display = 'none'
    document.querySelector('#purchasebar').style.display = 'none'
    document.getElementById('back').style.display = 'block';

    
    
});

function clear() {
    
    document.querySelector('#data').innerHTML = '';
    document.querySelector('#dynamic-view').innerHTML = '';
    document.querySelector('#customerbar').style.display = 'none'
    document.querySelector('#accountbar').style.display = 'none'
    document.querySelector('#merchantbar').style.display = 'none'
    document.querySelector('#productbar').style.display = 'none'
    document.querySelector('#purchasebar').style.display = 'none'

    
}
function hideorshow(id, operation){
    document.querySelector(`#${id}`).style.display = `${operation}`;
}
function allhide(){
    clear();
    hideorshow('CustomerForm','none');
    hideorshow('AccountForm','none');
    hideorshow("MerchantForm", "none");
    hideorshow('ProductForm','none');
    hideorshow('CustomerPurchaseForm','none');
    document.querySelector('#customerbar').style.display = 'none'
    document.getElementById('back').style.display = 'none';

    
}


function Customers() {

    allhide();
    document.querySelector('#customerbar').style.display = 'block'
    fetch('http://127.0.0.1:8000/api/customer/')
    .then(response => response.json())
    .then(result => {
        result.forEach(function callback(customer) {
            
            var button = document.createElement("BUTTON");
            let coldelete = document.createElement('div');
            coldelete.className = 'col-sm';
            button.className = 'btn btn-primary';
            button.innerHTML = "Delete";
            coldelete.append(button);    
            button.onclick = function () {
                fetch('http://127.0.0.1:8000/api/customer/' + customer.id, {
                    method: 'DELETE',
                })
                BankSystem();
                
            }
            let row = document.createElement('div');
            row.classList.add ('row');
            let colname = document.createElement('div');
            colname.className = 'col-sm';
            let colemail = document.createElement('div');
            colemail.className = 'col-sm';
            let colpassword = document.createElement('div');
            colpassword.className = 'col-sm';
            let colphone = document.createElement('div');
            colphone.className = 'col-sm';
            let colcash = document.createElement('div');
            colcash.className = 'col-sm';
            let colcreated = document.createElement('div');
            colcreated.className = 'col-lg';
            
                  
            colname.append(customer.username);
            colemail.append(customer.email);
            colpassword.append(customer.password);
            colphone.append(customer.CustomerPhone);
            colcash.append(`${customer.cash}$`);   
            colcreated.append(customer.date_joined);
            
            row.append(colname);
            row.append(colemail);
            row.append(colpassword);
            row.append(colphone);
            row.append(colcash);
            row.append(colcreated);
            row.append(coldelete);

            row.style = "border-style: outset; text-align: left; border: 1px solid black; font-style: italic; font-size: 18px; background-color: DodgerBlue;";
            
            document.querySelector('#data').append(row);
            
        
            })
            })
    
}

function Accounts() {

    allhide();
   
    document.querySelector('#accountbar').style.display = 'block'
    fetch('http://127.0.0.1:8000/api/account/')
    .then(response => response.json())
    .then(result => {
        result.forEach(function callback(account) {
            
            fetch(`http://127.0.0.1:8000/api/accounttypedetail/${account.AccountTypeCode}`)
            .then(response => response.json())
            .then(result1 => {
                

                fetch(`http://127.0.0.1:8000/api/customer/${account.CustomerId}`)
                .then(response => response.json())
                .then(result2 => {
                    


                    var button = document.createElement("BUTTON");
                    let coldelete = document.createElement('div');
                    coldelete.className = 'col-sm';
                    button.className = 'btn btn-primary';
                    button.innerHTML = "Delete";
                    coldelete.append(button);    
                    button.onclick = function () {
                        fetch('http://127.0.0.1:8000/api/account/' + account.id, {
                            method: 'DELETE',
                        })
                        BankSystem();
                        
                    }


                    let row = document.createElement('div');
                    row.classList.add ('row');
                    let colid = document.createElement('div');
                    colid.className = 'col-sm';
                    let colaccounttype = document.createElement('div');
                    colaccounttype.className = 'col-sm';
                    let colcustomer = document.createElement('div');
                    colcustomer.className = 'col-sm';
                    let colcreated = document.createElement('div');
                    colcreated.className = 'col-sm';
                    
                        
                    colid.append(account.id);
                    colaccounttype.append(result1.AccountTypeDescription);
                    colcustomer.append(result2.username); 
                    colcreated.append(account.CreatedAt);
                    row.append(colid);
                    row.append(colcustomer);
                    row.append(colaccounttype);
                    row.append(colcreated);
                    row.append(coldelete);

                    row.style = "border-style: outset; text-align: left; border: 1px solid black; font-style: italic; font-size: 18px; background-color: DodgerBlue;";
                    
                    document.querySelector('#data').append(row);










                })
            })
        })
    })
    
}
function Merchants(){
    allhide();
    document.querySelector('#merchantbar').style.display = 'block'
    fetch('http://127.0.0.1:8000/api/merchant/')
    .then(response => response.json())
    .then(result => {
        result.forEach(function callback(merchant) {
            
            
            let row = document.createElement('div');
                row.classList.add ('row');
                let colname = document.createElement('div');
                colname.className = 'col-sm';
                let colemail = document.createElement('div');
                colemail.className = 'col-sm';
                let colphone = document.createElement('div');
                colphone.className = 'col-sm';
                     
                colname.append(merchant.MerchantName);
                colemail.append(merchant.MerchantEmail);
                colphone.append(merchant.MerchantPhone); 
                row.append(colname);
                row.append(colemail);
                row.append(colphone);

                row.style = "border-style: outset; text-align: left; border: 1px solid black; font-style: italic; font-size: 18px; background-color: DodgerBlue;";
                
                document.querySelector('#data').append(row);














            
            })
            })
}
function Products(){
    allhide();
    
    document.querySelector('#productbar').style.display = 'block'
    fetch('http://127.0.0.1:8000/api/product/')
    .then(response => response.json())
    .then(result => {
        result.forEach(function callback(product) {
            fetch(`http://127.0.0.1:8000/api/merchantdetail/${product.MerchantId}`)
            .then(response => response.json())
            .then(result => {
                
                let row = document.createElement('div');
                row.classList.add ('row');
                let colname = document.createElement('div');
                colname.className = 'col-sm';
                let colmerchantname = document.createElement('div');
                colmerchantname.className = 'col-sm';
                
                     
                colname.append(product.ProductsAndServicesDescription);
                colmerchantname.append(result.MerchantName);
                 
                row.append(colname);
                row.append(colmerchantname);
                

                row.style = "border-style: outset; text-align: left; border: 1px solid black; font-style: italic; font-size: 18px; background-color: DodgerBlue;";
                
                document.querySelector('#data').append(row);



            })
            
        })
        })
}

function CustomerPurchase(){
    allhide();
    
    document.querySelector('#purchasebar').style.display = 'block'
    fetch('http://127.0.0.1:8000/api/customer/purchase')
    .then(response => response.json())
    .then(result => {
        result.forEach(function callback(purchase) {
            fetch(`http://127.0.0.1:8000/api/customer/${purchase.CustomersId}`)
            .then(response => response.json())
            .then(result1 => {
                fetch(`http://127.0.0.1:8000/api/product/${purchase.ProductsAndServicesCode}`)
                .then(response => response.json())
                .then(result2 => {

                    
                    let row = document.createElement('div');
                    row.classList.add ('row');
                    let colid = document.createElement('div');
                    colid.className = 'col-sm';
                    let colprice = document.createElement('div');
                    colprice.className = 'col-sm';
                    let colcustomer = document.createElement('div');
                    colcustomer.className = 'col-sm';
                    let colproduct = document.createElement('div');
                    colproduct.className = 'col-sm';
                    let colpurchasedat = document.createElement('div');
                    colpurchasedat.className = 'col-sm';
                        
                    colid.append(purchase.id);
                    colprice.append(purchase.Quantity);
                    colcustomer.append(result1.username);
                    colproduct.append(result2.ProductsAndServicesDescription);
                    colpurchasedat.append(purchase.Date); 
                    row.append(colid);
                    row.append(colprice);
                    row.append(colcustomer);
                    row.append(colproduct);
                    row.append(colpurchasedat);

                    row.style = "border-style: outset; text-align: left; border: 1px solid black; font-style: italic; font-size: 18px; background-color: DodgerBlue;";
                    
                    document.querySelector('#data').append(row);


                })
            })
            
        })
    })
}

function Transactions(){
    allhide();
    
    fetch('http://127.0.0.1:8000/api/transaction')
    .then(response => response.json())
    .then(result => {
        result.forEach(function callback(transaction) {
            

            let data = document.createElement('div');
            data.innerHTML = `<pre>      
            Transfer Done At:${transaction.date}
            AmountOfTransaction:${transaction.AmountOfTransaction}$
            PurchaseId:${transaction.PurchaseId}
            AccountId:${transaction.AccountId}
            </pre>`;
            data.style = "padding-bottom: 1em; border-style: outset; text-align: left; border: 1px solid black; padding:20px; font-style: italic; font-size: 18px;";
            document.querySelector('#dynamic-view').append(data);
                
            
        })
    })
}


function CreateCustomers(){

    document.getElementById("inputCustomerType").innerHTML = '';
    fetch('http://127.0.0.1:8000/api/customertype/')
        .then(response => response.json())
        .then(result => {
            result.forEach(function callback(type) {
                var x = document.getElementById("inputCustomerType");
                var option = new Option(type.CustomerTypeDescription, type.CustomerTypeDescription);
                console.log(option.value);
                x.appendChild(option);
            })
        })
    var button = document.createElement("BUTTON");
    button.className = 'btn btn-primary';
    button.innerHTML = "Add";    
    button.onclick = function () {
        clear();
        hideorshow('CustomerForm','block');
        document.querySelector('#CustomerForm').onsubmit = function () {
            fetch('http://127.0.0.1:8000/api/customer/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                "username": document.querySelector('#inputName').value,
                "password": document.querySelector('#inputPassword4').value,
                "email": document.querySelector('#inputEmail4').value,
                "CustomerPhone": document.querySelector('#inputPhone').value,
                "cash": document.querySelector('#inputCash').value,
                "CustomerTypeCode": document.getElementById('inputCustomerType').value    
              })
              
            })
            
            Customers();
            

        }
        
    }
    document.querySelector('#dynamic-view').append(button);
}

function CreateAccounts(){
    document.getElementById("inputAccountType").innerHTML = '';
    document.getElementById("inputCustomers").innerHTML = '';
    fetch('http://127.0.0.1:8000/api/accounttype/')
        .then(response => response.json())
        .then(result => {
            result.forEach(function callback(type) {
                var x = document.getElementById("inputAccountType");
                var option = new Option(type.AccountTypeDescription, type.AccountTypeDescription);
                
                x.appendChild(option);
            })
        })
        fetch('http://127.0.0.1:8000/api/customer/')
        .then(response => response.json())
        .then(result => {
            result.forEach(function callback(customer) {
                var x = document.getElementById("inputCustomers");
                var option = new Option(customer.username, customer.username);
                
                x.appendChild(option);
            })
        })
    

    var button = document.createElement("BUTTON");
    button.className = 'btn btn-primary';
    button.innerHTML = "Add";    
    button.onclick = function () {
        clear();
        hideorshow('AccountForm','block');
        document.querySelector('#AccountForm').onsubmit = function () {
            fetch('http://127.0.0.1:8000/api/account/', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                "AccountTypeCode": document.getElementById('inputAccountType').value, 
                "CustomerId": document.getElementById('inputCustomers').value   
                })
                
            })
            
            Accounts();
            

        }
        
    }
    document.querySelector('#dynamic-view').append(button);
}

function CreateMerchants(){
    
    var button = document.createElement("BUTTON");
    button.className = 'btn btn-primary';
    button.innerHTML = "Add";    
    button.onclick = function () {
        clear();
        hideorshow('MerchantForm','block');
        document.querySelector('#MerchantForm').onsubmit = function () {
            fetch('http://127.0.0.1:8000/api/merchant/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                "MerchantName": document.querySelector('#merchantname').value,
                "MerchantPhone": document.querySelector('#merchantphone').value,
                "MerchantEmail": document.querySelector('#merchantemail').value,
                    
              })
              
            })
            
            Merchants();
            

        }
        
    }
    document.querySelector('#dynamic-view').append(button);
    

}


function CreateProducts(){
    document.getElementById("inputMerchants").innerHTML = '';
    fetch('http://127.0.0.1:8000/api/merchant/')
        .then(response => response.json())
        .then(result => {
            result.forEach(function callback(merchant) {
                var x = document.getElementById("inputMerchants");
                var option = new Option(merchant.MerchantName, merchant.MerchantName);
                x.appendChild(option);
            })
        })
    var button = document.createElement("BUTTON");
    button.className = 'btn btn-primary';
    button.innerHTML = "Add";    
    button.onclick = function () {
        clear();
        hideorshow('ProductForm','block');
        document.querySelector('#ProductForm').onsubmit = function () {
            fetch('http://127.0.0.1:8000/api/product/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                "ProductsAndServicesDescription": document.querySelector('#productname').value,
                "MerchantId": document.getElementById('inputMerchants').value    
              })
              
            })
            
            Products();
            

        }
        
    }
    document.querySelector('#dynamic-view').append(button);
}


function CreateCustomerPurchase() {
    document.getElementById("customerinput").innerHTML = '';
    document.getElementById("productinput").innerHTML = '';
    fetch('http://127.0.0.1:8000/api/customer/')
        .then(response => response.json())
        .then(result => {
            result.forEach(function callback(customer) {
                var x = document.getElementById("customerinput");
                var option = new Option(customer.username, customer.username);
                x.appendChild(option);
            })
        })
        fetch('http://127.0.0.1:8000/api/product/')
        .then(response => response.json())
        .then(result => {
            result.forEach(function callback(product) {
                var x = document.getElementById("productinput");
                var option = new Option(product.ProductsAndServicesDescription, product.ProductsAndServicesDescription);
                x.appendChild(option);
            })
        })
    

    var button = document.createElement("BUTTON");
    button.className = 'btn btn-primary';
    button.innerHTML = "Add";    
    button.onclick = function () {
        clear();
        hideorshow('CustomerPurchaseForm','block');
        document.querySelector('#CustomerPurchaseForm').onsubmit = function () {
            fetch('http://127.0.0.1:8000/api/customer/purchase/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                "Quantity": document.querySelector('#price').value,
                "CustomersId": document.getElementById('customerinput').value,
                "ProductsAndServicesCode": document.getElementById('productinput').value,
                    
              })
              
            })
            
            CustomerPurchase();
            
            
        }
        
    }
    document.querySelector('#dynamic-view').append(button);
}
 function BankSystem(){
    hideorshow('CustomerForm','none');
    hideorshow('AccountForm','none');
    hideorshow('MerchantForm','none');
    hideorshow('ProductForm','none');
    hideorshow('CustomerPurchaseForm','none');
    document.querySelector('#dynamic-view').innerHTML = '';
    document.querySelector('#data').innerHTML = '';
    document.querySelector('#customerbar').style.display = 'none'
    document.querySelector('#accountbar').style.display = 'none'
    document.querySelector('#merchantbar').style.display = 'none'
    document.querySelector('#productbar').style.display = 'none'
    document.querySelector('#purchasebar').style.display = 'none'
    document.getElementById('back').style.display = 'block';
    
    

 }



    
    




    
