import { useLocation } from "react-router-dom";
import { HeaderComponent } from "../components/header_component";
import { FooterComponent } from "../components/footer_component";

interface CartItem {
    name: string;
    image: string;
    price: number;
    quantity: number;
}

interface PayPageProps {
    cartItems: CartItem[];
    totalQuantity: number;
}

export function PayPage() {
    //Recibir datos desde el uso de Navigate en el componente Cart
    const location = useLocation();
    const { cartItems, totalQuantity } = location.state as PayPageProps;

    const HandleToHome = () => {
        //limpiar boughtItems del localStorage
        localStorage.removeItem("cart");
        localStorage.removeItem("boughtItems");
        window.location.href = "/";
    }

    return (
        <>
            <HeaderComponent />
            <div className="container mt-5">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">Principal</a></li>
                        <li className="breadcrumb-item"><a href="/Cart">Carrito</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Pago</li>
                    </ol>
                </nav>
                <div className="card">
                    <div className="card-header bg-dark  text-white">
                        <h4>Detalles de la compra</h4>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">¡Gracias por su compra!</h5>
                        <p className="card-text">Detalles de la compra:</p>
                        <ul className="list-group mb-3">
                            {cartItems.map((item, index) => (
                                <li key={index} className="list-group-item d-flex justify-content-between lh-condensed align-items-center">
                                    <div className="d-flex justify-content-center">
                                        <div>
                                            <img src={item.image} alt={item.name} width="100" height="100" />
                                        </div>
                                        <div className="d-flex flex-column justify-content-center px-4">
                                            <h6 className="my-0">{item.name}</h6>
                                            <small className="text-muted">Cantidad: {item.quantity}</small>
                                        </div>
                                    </div>
                                    <span className="text-muted">${item.price}</span>
                                </li>
                            ))}
                            <li className="list-group-item d-flex justify-content-end">
                                <span className="pe-4">Total:</span>
                                <span className="fw-bolder">${totalQuantity.toFixed(2)}</span>
                                <span className="ps-1">(MXN)</span>
                            </li>
                        </ul>
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-dark" onClick={HandleToHome}>Ir a la pantalla principal</button>
                        </div>
                    </div>
                </div>
            </div >
            <FooterComponent />
        </>
    );
}