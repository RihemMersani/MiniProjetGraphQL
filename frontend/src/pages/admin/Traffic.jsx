import { useState } from "react";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import Layout from "../../layouts/Layout";

const GET_TRAFFIC_ZONES = gql`
  query {
    trafficZones {
      id
      name
      location
      density
      level
      created_at
    }
  }
`;

const ADD_TRAFFIC_ZONE = gql`
  mutation AddTrafficZone(
    $name: String!
    $location: String!
    $density: Int!
  ) {
    addTrafficZone(
      name: $name
      location: $location
      density: $density
    )
  }
`;

function Traffic() {
  const { loading, error, data, refetch } = useQuery(GET_TRAFFIC_ZONES);
  const [addTrafficZone] = useMutation(ADD_TRAFFIC_ZONE);

  const [form, setForm] = useState({
    name: "",
    location: "",
    density: "",
  });

  const getBadgeClass = (level) => {
    if (level === "FAIBLE") return "badge green";
    if (level === "ELEVE") return "badge red";
    return "badge";
  };

  const formatLevel = (level) => {
    if (level === "ELEVE") return "ÉLEVÉ";
    return level;
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddZone = async (e) => {
    e.preventDefault();

    await addTrafficZone({
      variables: {
        name: form.name,
        location: form.location,
        density: parseInt(form.density),
      },
    });

    setForm({
      name: "",
      location: "",
      density: "",
    });

    refetch();
  };

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">Erreur : {error.message}</div>;

  const zones = data?.trafficZones || [];

  return (
    <Layout title="Trafic" subtitle="Analyse dynamique de la circulation urbaine">
      <section className="cards">
        {zones.slice(0, 4).map((zone) => (
          <div className="card" key={zone.id}>
            <span>{zone.name}</span>
            <h3>{formatLevel(zone.level)}</h3>
            <p>Densité : {zone.density}%</p>
          </div>
        ))}

        {zones.length === 0 && (
          <div className="card">
            <span>Aucune zone</span>
            <h3>0</h3>
            <p>Ajoutez une zone de trafic</p>
          </div>
        )}
      </section>

      <div className="box">
        <h2>Créer une zone de circulation</h2>

        <form className="form traffic-form" onSubmit={handleAddZone}>
          <input
            type="text"
            name="name"
            placeholder="Nom de la zone"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Localisation"
            value={form.location}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="density"
            placeholder="Densité %"
            min="0"
            max="100"
            value={form.density}
            onChange={handleChange}
            required
          />

          <button type="submit">Ajouter zone</button>
        </form>
      </div>

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
            {zones.map((zone) => (
              <tr key={zone.id}>
                <td>{zone.name}</td>
                <td>{zone.location}</td>
                <td>{zone.density}%</td>
                <td>
                  <span className={getBadgeClass(zone.level)}>
                    {formatLevel(zone.level)}
                  </span>
                </td>
              </tr>
            ))}

            {zones.length === 0 && (
              <tr>
                <td colSpan="4">Aucune zone de trafic trouvée.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default Traffic;