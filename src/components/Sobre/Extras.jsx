import ImageExtra from '../../assets/feedback.png'

function Extras() {
    return (
        <>
            <section className="container" id="extras">
                <div className="more">
                    <div className="image">
                        <img src={ImageExtra} />
                    </div>
                    <div className="content">
                        <h2>Alcance novos patamares para o seu negócio com a Betta Agency!</h2>
                        <p>Na Betta Agency, acreditamos que o sucesso está ao seu alcance. Com nossa expertise em Marketing Digital, Desenvolvimento e Design, você pode decolar sua empresa agora mesmo, estamos prontos para impulsionar o seu negócio para o próximo nível. Junte-se a nós e voe mais alto com a Betta Agency!</p>
                        <br />
                        <a href="https://wa.me/5511937350748" className="extras_btn">Entrar em contato!</a>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Extras