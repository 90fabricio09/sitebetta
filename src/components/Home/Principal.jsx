import Logo from '../../assets/image.png'

function Principal() {
    return (
        <>
            <section className="container" id="home">
                <div className="content">
                    <h4>Transformando sua ideia em realidade!</h4>
                    <h1><span>Betta Brasil</span><br/>Está preparado para revitalizar a imagem da sua empresa?</h1>
                    <p>
                        Se você está procurando por um serviço de qualidade, criatividade e eficiência, a Betta é a escolha certa para você.
                    </p>
                </div>
                <div className="image">
                    <img src={Logo} alt="Betta Icon"/>
                </div>
            </section>
        </>
    )
}

export default Principal