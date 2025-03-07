import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import { ProductInterface } from '../models/interfaces/product_interface';

export function ProductCard({ name, price, image, discount, description }: ProductInterface) {
    const navigate = useNavigate();
    const [quantity] = useState(1);
    const [showBanner, setShowBanner] = useState(false);
    const [isButtonHandler, setIsButtonHandler] = useState(false);
    const [isSpinner, setIsSpinner] = useState(false);

    const handleClick = () => {
        navigate('/ProductPresentation', { state: { name, price, discount, image, description } });
    };

    const HandleToCart = () => {
        setIsButtonHandler(!isButtonHandler);
        const product = { name, price, image, discount, quantity, description };
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingProductIndex = cart.findIndex((item: any) => item.name === name);

        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity += quantity;
        } else {
            cart.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        setShowBanner(true);
        setIsSpinner(true);

        // Despacha el evento personalizado
        window.dispatchEvent(new Event('cartUpdated'));

        setTimeout(() => {
            setShowBanner(false);
            setIsButtonHandler(false);
            setIsSpinner(false);
        }, 1000); // Hide banner after 1 second
    };

    return (
        <section className="col mb-5">
            <div className="card h-100">
                <Modal show={showBanner} onHide={() => setShowBanner(false)} centered>
                    <Modal.Body className="text-center">
                        <FontAwesomeIcon icon={faCheckCircle} className="text-success fs-1" />
                        <p className="mt-2">Producto añadido al carrito</p>
                    </Modal.Body>
                </Modal>
                <button onClick={HandleToCart} className="btn rounded-circle position-absolute top-25 start-25 m-3 " style={{ zIndex: 1, color: 'black', backgroundColor: 'pink' }}>
                    {isButtonHandler ? (
                        isSpinner ? <Spinner style={{ width: '1rem', height: '1rem' }} animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner> : <FontAwesomeIcon icon={faShoppingCart} size="1x" />
                    ) : (
                        <FontAwesomeIcon icon={faShoppingCart} className="shoppingCart" />
                    )}
                </button>
                <img className="card-img-top" src={image} alt="..." />
                <div className="card-body p-4">
                    <div className="text-center">
                        <h5 className="fw-bolder">{name}</h5>
                        ${price} - ${discount}
                    </div>
                </div>
                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent text-center">
                    <button onClick={handleClick} className="btn btn-dark mt-auto rounded-3">
                        Ver Producto
                    </button>
                </div>
            </div>
        </section>
    );
}