import { useState } from "react";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import OperatorLayout from "../../layouts/OperatorLayout";

const GET_INCIDENTS = gql`
  query {
    incidents {
      id
      type
      description
      location
      status
      created_at
    }
  }
`;

const ADD_INCIDENT = gql`
  mutation AddIncident(
    $type: String!
    $description: String!
    $location: String!
    $status: String
  ) {
    addIncident(
      type: $type
      description: $description
      location: $location
      status: $status
    )
  }
`;

const UPDATE_STATUS = gql`
  mutation UpdateIncidentStatus($id: ID!, $status: String!) {
    updateIncidentStatus(id: $id, status: $status)
  }
`;

function OperatorIncidents() {
  const { loading, error, data, refetch } = useQuery(GET_INCIDENTS);
  const [addIncident] = useMutation(ADD_INCIDENT);
  const [updateIncidentStatus] = useMutation(UPDATE_STATUS);

  const [form, setForm] = useState({
    type: "ACCIDENT",
    description: "",
    location: "",
    status: "SIGNALE",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddIncident = async (e) => {
    e.preventDefault();

    await addIncident({
      variables: form,
    });

    setForm({
      type: "ACCIDENT",
      description: "",
      location: "",
      status: "SIGNALE",
    });

    refetch();
  };

  const handleStatusChange = async (id, status) => {
    await updateIncidentStatus({
      variables: { id, status },
    });

    refetch();
  };

  const badgeClass = (status) => {
    if (status === "RESOLU") return "badge green";
    if (status === "SIGNALE") return "badge red";
    return "badge";
  };

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">Erreur : {error.message}</div>;

  const incidents = data?.incidents || [];

  return (
    <OperatorLayout
      title="Incidents"
      subtitle="Déclaration et suivi dynamique des incidents"
    >
      <div className="box">
        <h2>Déclarer un incident</h2>

        <form className="form incident-form" onSubmit={handleAddIncident}>
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="ACCIDENT">Accident</option>
            <option value="TRAVAUX">Travaux</option>
            <option value="ROUTE_FERMEE">Route fermée</option>
            <option value="EMBOUTEILLAGE">Embouteillage</option>
          </select>

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={form.description}
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

          <select name="status" value={form.status} onChange={handleChange}>
            <option value="SIGNALE">Signalé</option>
            <option value="EN_COURS">En cours</option>
            <option value="RESOLU">Résolu</option>
          </select>

          <button type="submit">Déclarer</button>
        </form>
      </div>

      <div className="box">
        <h2>Incidents récents</h2>

        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Description</th>
              <th>Localisation</th>
              <th>Statut</th>
              <th>Modifier statut</th>
            </tr>
          </thead>

          <tbody>
            {incidents.map((incident) => (
              <tr key={incident.id}>
                <td>{incident.type}</td>
                <td>{incident.description}</td>
                <td>{incident.location}</td>
                <td>
                  <span className={badgeClass(incident.status)}>
                    {incident.status}
                  </span>
                </td>
                <td>
                  <select
                    value={incident.status}
                    onChange={(e) =>
                      handleStatusChange(incident.id, e.target.value)
                    }
                    className="table-select"
                  >
                    <option value="SIGNALE">Signalé</option>
                    <option value="EN_COURS">En cours</option>
                    <option value="RESOLU">Résolu</option>
                  </select>
                </td>
              </tr>
            ))}

            {incidents.length === 0 && (
              <tr>
                <td colSpan="5">Aucun incident trouvé.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </OperatorLayout>
  );
}

export default OperatorIncidents;