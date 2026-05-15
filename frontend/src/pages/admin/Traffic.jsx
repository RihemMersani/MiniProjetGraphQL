import Layout from "../../layouts/Layout";

function Traffic() {
  return (
    <Layout title="Trafic" subtitle="Analyse de la circulation urbaine">
      <section className="cards">
        <div className="card">
          <span>Zone Centre-ville</span>
          <h3>Faible</h3>
          <p>Densité : 25%</p>
        </div>

        <div className="card">
          <span>Route principale</span>
          <h3>Moyen</h3>
          <p>Densité : 58%</p>
        </div>

        <div className="card">
          <span>Entrée Nord</span>
          <h3>Élevé</h3>
          <p>Densité : 82%</p>
        </div>
      </section>

      <div className="box">
        <h2>Zones de circulation</h2>

        <table>
          <thead>
            <tr>
              <th>Zone</th>
              <th>Localisation</th>
              <th>Densité</th>
              <th>Niveau</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Centre-ville</td>
              <td>Avenue principale</td>
              <td>25%</td>
              <td><span className="badge green">FAIBLE</span></td>
            </tr>

            <tr>
              <td>Route principale</td>
              <td>Route nationale</td>
              <td>58%</td>
              <td><span className="badge">MOYEN</span></td>
            </tr>

            <tr>
              <td>Entrée Nord</td>
              <td>Entrée de la ville</td>
              <td>82%</td>
              <td><span className="badge red">ÉLEVÉ</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default Traffic;
