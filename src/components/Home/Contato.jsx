import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import ImageContact from '../../assets/contact-us-animate.svg';

function Contato() {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_x28sxeg', 'template_bpgvo1m', form.current, 'sjcRQ7raDojf1fG2G')
            .then((result) => {
                console.log(result.text);
                alert('Mensagem enviada com sucesso!');
            }, (error) => {
                console.log(error.text);
                alert('Ocorreu um erro ao enviar a mensagem.');
            });
        
        e.target.reset();
    };

    return (
        <section className="container" id="contact">
            <form ref={form} onSubmit={sendEmail} className="contact-form">
                <h2>Contato</h2>
                <div>
                    <label>Nome</label>
                    <input type="text" name="name" required />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" name="email" required />
                </div>
                <div>
                    <label>Mensagem</label>
                    <textarea name="message" required></textarea>
                </div>
                <button type="submit">Enviar</button>
            </form>

            <div className="contact-image">
                <img src={ImageContact} alt="Contato" />
            </div>
        </section>
    );
}

export default Contato;
