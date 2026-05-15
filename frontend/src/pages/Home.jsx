import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">
      <nav className="home-nav">
        <h2>TrafficPro</h2>

        <div>
          <Link to="/home">Accueil</Link>
          <Link to="/login">Connexion</Link>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-text">
          <span>Smart Traffic Management</span>

          <h1>
            Plateforme intelligente de gestion du trafic urbain
          </h1>

          <p>
            Supervisez les véhicules, analysez la circulation, détectez les
            incidents et visualisez les zones congestionnées en temps réel.
          </p>

          <div className="hero-actions">
            <Link to="/login" className="primary-btn">
              Se connecter
            </Link>

            <a href="#features" className="secondary-btn">
              Découvrir
            </a>
          </div>
        </div>

        <div className="hero-card">
          <h3>État du trafic</h3>

          <div className="traffic-status">
            <span>Centre-ville</span>
            <strong className="green-text">Fluide</strong>
          </div>

          <div className="traffic-status">
            <span>Route principale</span>
            <strong className="orange-text">Moyen</strong>
          </div>

          <div className="traffic-status">
            <span>Entrée Nord</span>
            <strong className="red-text">Congestionné</strong>
          </div>
        </div>
      </section>

      <section id="features" className="features">
        <div className="feature">
          <h3>Véhicules</h3>
          <p>Ajout, consultation et suivi des véhicules enregistrés.</p>
        </div>

        <div className="feature">
          <h3>Incidents</h3>
          <p>Déclaration et suivi des accidents, travaux et embouteillages.</p>
        </div>

        <div className="feature">
          <h3>Trafic</h3>
          <p>Analyse de la densité et détection des zones congestionnées.</p>
        </div>

        <div className="feature">
          <h3>Carte interactive</h3>
          <p>Visualisation des véhicules, incidents et zones de circulation.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;