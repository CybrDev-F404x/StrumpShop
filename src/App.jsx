import { useState, useEffect } from "react"
import Guitar from "./components/Guitar"
import Header from "./components/Header"
import { db } from "./data/db"

function App() {
    
    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart') // obtener el carrito del localStorage
        return localStorageCart ? JSON.parse(localStorageCart) : [] // si existe, parsearlo a un array, si no, retornar un array vacio
    } 

    // State
    const [data, ] = useState(db)
    const [cart, setCart] = useState(initialCart) // carrito de compras, inicializado con la funcion initialCart

    // Constants
    
    const MAX_ITEMS = 7
    const MIN_ITEMS = 1

    // Effects

    useEffect( () => {
        localStorage.setItem('cart', JSON.stringify(cart)) // guardar el carrito en el localStorage como un string, ya que el localStorage solo acepta strings
    }, [cart]) // cada vez que el carrito cambie, se ejecuta el useEffect

    // Functions
    
    function addToCart(item) {

        // si un elemento no se encuentra, findIndex() devuelve -1
        const itemExists = cart.findIndex(guitar => guitar.id === item.id) // buscar si el item ya existe en el carrito
        
        if(itemExists !== -1) { // existe en el carrito
            if(cart[itemExists].quantity >= MAX_ITEMS) return // si la cantidad es mayor o igual a 7, no hacer nada
            const updatedCart = [...cart] // crear una copia del carrito actual, para no mutar el state directamente
            updatedCart[itemExists].quantity++ // le pasamos la posicion (itemExists) a la copia e incrementar la cantidad del item que ya existe
            setCart(updatedCart) // actualizar el state del carrito con la copia modificada
        } else {
            item.quantity = 1 // agregar la propiedad quantity al objeto item
            setCart([...cart, item]) // agregar un producto al carrito sin perder los productos que ya habia
        }
        
    }

    function increaseQuantity(id) {
        // aumentar la cantidad de un producto en el carrito por su id
        const updatedCart = cart.map( item => {
            if(item.id === id && item.quantity < MAX_ITEMS) { // si el id del item es igual al id que se pasa por parametro y la cantidad es menor a 7
                return { // crear un nuevo objeto con los datos del item y la cantidad aumentada
                    ...item,
                    quantity: item.quantity + 1 // aumentar la cantidad en 1
                }
            }
            return item 
        })
        setCart(updatedCart) // actualizar el state del carrito con la copia modificada
    }

    
    function increaseQuantity(id) {
        // aumentar la cantidad de un producto en el carrito por su id
        const updatedCart = cart.map( item => {
            if(item.id === id && item.quantity < MAX_ITEMS) { // si el id del item es igual al id que se pasa por parametro y la cantidad es menor a 7
                return { // crear un nuevo objeto con los datos del item y la cantidad aumentada
                    ...item,
                    quantity: item.quantity + 1 // aumentar la cantidad en 1
                }
            }
            return item 
        })
        setCart(updatedCart) // actualizar el state del carrito con la copia modificada
    }

    function decreaseQuantity(id) {
        const updatedCart = cart.map( item => {
            if(item.id === id && item.quantity > MIN_ITEMS) { // si el id del item es igual al id que se pasa por parametro y la cantidad es mayor a 1
                return { // crear un nuevo objeto con los datos del item y la cantidad disminuida
                    ...item,
                    quantity: item.quantity - 1 // disminuir la cantidad en 1
                }
            }
            return item // si no se cumple la condicion, devolver el item sin modificar
        })
        setCart(updatedCart) // actualizar el state del carrito con la copia modificada
    }

    function removeFromCart(id) {
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id)) // eliminar un producto del carrito por su id

    }

    function clearCart() {
        setCart([]) // vaciar el carrito
    }

  return (
    <>

    <Header 
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        descreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
    />

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
            {data.map((guitar) => (
                <Guitar 
                    key={guitar.id}
                    guitar={guitar}
                    setCart={setCart}
                    addToCart={addToCart}
                />
            ))}
            
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">&copy; 2025 StrumpShop  - Todos los derechos Reservados</p>
        </div>
    </footer>
    </>
  )
}

export default App
