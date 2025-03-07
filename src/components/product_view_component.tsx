import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { ProductInterface } from '../models/interfaces/product_interface';

export function ProductViewComponent({ name, price, image, discount, description }: ProductInterface) {
    const [quantity, setQuantity] = useState(1);
    const [showBanner, setShowBanner] = useState(false);
    const navigate = useNavigate();

    const handleAddToCart = () => {
        const product = { name, price, image, discount, quantity };
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const existingProductIndex = cart.findIndex((item: any) => item.name === name);

        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity += quantity;
        } else {
            cart.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        setShowBanner(true);
        setTimeout(() => {
            setShowBanner(false);
            navigate('/cart'); // Navigate to the cart page
        }, 1000); // Hide banner after 1 second
    };

    return (
        <section className="py-5">
            <div className="container px-4 px-lg-5 my-5">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">Principal</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Productos</li>
                    </ol>
                </nav>
                <Modal show={showBanner} onHide={() => setShowBanner(false)} centered>
                    <Modal.Body className="text-center">

                        <FontAwesomeIcon icon={faCheckCircle} className="text-success fs-1" />
                        <p className="mt-2">Producto añadido al carrito</p>
                    </Modal.Body>
                </Modal>
                <div className="row gx-4 gx-lg-5 align-items-center">
                    <div className="col-md-6"><img className="card-img-top mb-5 mb-md-0" src={image} alt="..." /></div>
                    <div className="col-md-6">
                        <div className="small mb-1">SKU: BST-498</div>
                        <h1 className="display-5 fw-bolder">{name}</h1>
                        <div className="fs-5 mb-5">
                            <span className="text-decoration-line-through">${price}</span>
                            <span>${price - discount!}</span>
                        </div>
                        <p className="lead">{description}</p>
                        <div className="d-flex">
                            <input
                                className="form-control text-center me-3"
                                id="inputQuantity"
                                type="number"
                                value={quantity}
                                min={0}
                                onChange={(e) => {
                                    const value = Number(e.target.value);
                                    if (value >= 0) {
                                        setQuantity(value);
                                    }
                                }}
                                style={{ maxWidth: '4.5rem' }}
                            />
                            <button onClick={handleAddToCart} className="btn btn-outline-dark mt-auto">
                                Añadir al carrito
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};