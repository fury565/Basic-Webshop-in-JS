// Get elements
const cartButton = document.querySelector('.cart-button');
const cartBadge = document.querySelector('.cart-badge');
const modal = document.querySelectorAll('.modal')[0];
const modalClose = document.querySelectorAll('.close')[0];
const modalItem = document.querySelectorAll('.modal')[1];
const modalItemClose = document.querySelectorAll('.close')[1];
const buyButton = document.querySelector('.buy-btn');
const cartItemsList = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const itemsGrid = document.querySelector('.items-grid');
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
const itemCount=document.querySelector('#amount');
const search=document.querySelector('#search');

let walletAmount = 50.0;

let items = [
    {
        id: 1,
        name: 'Apple',
        price: 0.99,
    },
    {
        id: 2,
        name: 'Banana',
        price: 10,
    },
	{
		id: 3,
        name: 'Battery',
        price: 10,
    },
	{
		id: 4,
        name: 'Jacket',
        price: 120,
    },
	{
		id: 5,
        name: 'Sneakers',
        price: 100,
    },
	{
		id: 6,
        name: 'Cooker',
        price: 65,
    },
	{
		id: 7,
        name: 'CoolPC',
        price: 1200,
    },
	{
		id: 8,
        name: 'ScratchCard',
        price: 3,
    }
	
];

let cart = [];

let selectedItemID=0;
// An example function that creates HTML elements using the DOM.
function fillItemsGrid() {
	let itemName=search.value;
	itemsGrid.innerHTML="";
    for (const item of items) {
		if(item.name.toLowerCase().includes(itemName.toLowerCase())){
			let itemElement = document.createElement('div');
			itemElement.classList.add('item');
			itemElement.innerHTML = `
				<img src="https://picsum.photos/200/300?random=${item.id}" alt="${item.name}">
				<h2>${item.name}</h2>
				<p>$${item.price}</p>
				<button class="add-to-cart-btn" data-id="${item.id}" onClick="toggleItemModal(${item.id})">Add to cart</button>
			`;
			itemsGrid.appendChild(itemElement);
		}
        
    }
}
function fillCartGrid(){
	cartItemsList.innerHTML='';
	for (const item of cart) {
        let itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
		itemElement.classList.add('needs-flex');
		var total=item.item.price*item.count;
		itemElement.innerHTML=
		`<span>${item.item.name} x${item.count}</span>
		<div>
			<span>Total cost: ${total.toFixed(2)}$</span>
			<button class="remove-btn" onClick="removeAmountFromCart(${item.item.id})">Remove 1</button>
			<button class="remove-all" onClick="removeFromCart(${item.item.id})">&times;</button>
		</div>`;
		cartItemsList.appendChild(itemElement);
	}
}
// Adding the .show-modal class to an element will make it visible
// because it has the CSS property display: block; (which overrides display: none;)
// See the CSS file for more details.
function toggleModal() {
  modal.classList.toggle('show-modal');
}
function toggleItemModal(id) {
  modalItem.classList.toggle('show-modal');
  selectedItemID=id;
}
function updateCart(){
	fillCartGrid();
	var moneyTotal=document.getElementsByClassName("money-total");
	cartBadge.innerHTML=cart.length;
	let totalCost=0;
	for(let i=0;i<cart.length;i++){
		totalCost+=cart[i].item.price*cart[i].count;
	}
	cartTotal.innerHTML=`Total cost: ${totalCost.toFixed(2)} $`;
	moneyTotal[0].innerHTML=`Money available: ${walletAmount.toFixed(2)} $`;
	if(cart.length===0){
		buyButton.style.visibility = "hidden";
	}
	else{
		if(totalCost>walletAmount){
			buyButton.disabled=true;
		}
		else{
			buyButton.disabled=false;
		}
		buyButton.style.visibility = "visible";
	}
}
function addToCart() {
	let count=itemCount.value;
	if(count===''){
		count=0;
	}
	for(let i=0;i<cart.length;i++){
		if(cart[i].item.id===selectedItemID){
			cart[i].count+=count;
			updateCart();
			return 0;
		}
	}
	if(count!=0){
		var itemHolder={item:items[selectedItemID-1],count:itemCount.value}
		cart.push(itemHolder);
		updateCart();
		toggleItemModal(selectedItemID);
	}
	
}
function buyCart() {
	let totalCost=0;
	for(let i=0;i<cart.length;i++){
		totalCost+=cart[i].item.price*cart[i].count;
	}
	walletAmount-=totalCost;
	emptyCart();
	updateCart();
	cartItemsList.innerHTML=`
	<span>Zahvaljujemo Vam na kupovini na našoj web stranici</span>`;
}
function emptyCart(){
	while(cart.length>0){
		cart.pop();
	}
}
function removeAmountFromCart(id) {
    let reduceAmount=1;
	for(let i=0;i<cart.length;i++){
		if(cart[i].item.id===id){
			cart[i].count-=reduceAmount;
			if(cart[i].count<=0){
				cart[i]=cart[cart.length-1];
				cart.pop();
				break;
			}
		}
	}
	updateCart();
}
function removeFromCart(id) {
	for(let i=0;i<cart.length;i++){
		if(cart[i].item.id===id){
			cart[i]=cart[cart.length-1];
			cart.pop();
			break;
		}
	}
	updateCart();
}
// Call fillItemsGrid function when page loads
fillItemsGrid();
updateCart();

// Example of DOM methods for adding event handling
cartButton.addEventListener('click', toggleModal);
modalClose.addEventListener('click', toggleModal);
modalItemClose.addEventListener('click', toggleItemModal);
search.addEventListener('input',fillItemsGrid);