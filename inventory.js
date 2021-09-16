getTotal =() =>{
	let price = document.querySelector('#price').value;
	let quantity = document.querySelector('#quantity').value; 
	if (isNaN(price) || isNaN(quantity)) {
		alert("Price and Quantity must valid numbers")
	}else{
		let total = parseFloat(price * quantity);
		document.querySelector('#total').value =total.toFixed(2);
	}
}
addInventory = () =>{
	let totalInventory = JSON.parse(localStorage.getItem("totalInventory"));
	if (totalInventory == null) {
		totalInventory = [];
	}
	let product = document.querySelector('#product').value;
	let price = document.querySelector('#price').value;
	let quantity = document.querySelector('#quantity').value; 
	if (product == "" || product == null) {
		alert("Invalid Product")
	}
	else if (isNaN(price) || isNaN(quantity)) {
		alert("Price and Quantity must valid numbers")
	}else{
		let total = parseFloat(price * quantity);
		total =total.toFixed(2);
		let newInventory = {
			product : product,
			price : price,
			quantity : quantity,
			total : total
		}
		totalInventory.push(newInventory);
		localStorage.setItem("totalInventory",JSON.stringify(totalInventory));
		window.location.reload();

	}

}

getGrandTotal = () =>{
	let grandTotal = 0;
	let totalInventory = JSON.parse(localStorage.getItem("totalInventory"));
	if (totalInventory !=null && totalInventory.length > 0) {
		for(let index = 0; index < totalInventory.length; index++){
			grandTotal += parseFloat(totalInventory[index]["total"])
			grandTotal = grandTotal;
		}
	}
	document.querySelector('#grandTotal').innerHTML = grandTotal.toFixed(2)	
}

showInventory = () =>{
	getGrandTotal();
	let totalInventory = JSON.parse(localStorage.getItem("totalInventory"));
	if (totalInventory !=null && totalInventory.length > 0) {
		let table = document.querySelector('#inventoryTable');
		for(let index = 0; index < totalInventory.length; index++){
			let row = table.insertRow(1);
			let inventoryProduct = row.insertCell(0);
			let inventoryPrice = row.insertCell(1);
			let inventoryQuantity = row.insertCell(2);
			let inventoryTotal = row.insertCell(3);
			let inventoryAction = row.insertCell(4);

			inventoryProduct.innerHTML= totalInventory[index]["product"]
			inventoryPrice.innerHTML= totalInventory[index]["price"]
			inventoryQuantity.innerHTML= totalInventory[index]["quantity"]
			inventoryTotal.innerHTML= totalInventory[index]["total"]

			getGrandTotal();

			let btn = document.createElement('button');
			btn.type ="button";
			btn.innerHTML="Delete";
			btn.onclick = (function(index){
				return function(){
					if (confirm("Do you want to delete this record ?")) {
						totalInventory.splice(index,1);
						alert("Item Deleted");
						window.location.reload();
						localStorage.setItem("totalInventory",JSON.stringify(totalInventory));
						grandTotal();
					}
				}
			})(index)
			inventoryAction.appendChild(btn)
		}
	}

}

clearButton = () =>{
	if (confirm("Do you want to clear all records? This action cannot be un done")) {
		 localStorage.clear();
		 window.location.reload();
	}
}

printData = () =>{
	// window.print()
	let divContent = document.querySelector('#allInventory').innerHTML;
	let a = window.open('','','height=11000, width=1000');
	a.document.write('<html>');
	a.document.write('<body><h1>Your Inventory Records : </h1>');
	a.document.write(divContent);
	a.document.write('</body></html>');
	a.print();
}

showInventory();


// let arr = [
// 	{name : "Iyke", location : "Aba", amount: 400},
// 	{name : "Lordson", location : "PH", amount: 600},
// 	{name : "Debby", location : "PH", amount: 700}
// ];
// let sum = 0;
// for (let i = 0; i < arr.length; i++) {
// 	sum = sum + arr[i]["amount"]
// }
// console.log(sum)





