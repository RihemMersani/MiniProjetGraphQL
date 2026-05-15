import { useState } from "react";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";
import OperatorLayout from "../../layouts/OperatorLayout";

const GET_VEHICLES = gql`
  query {
    vehicles {
      id
      matricule
      type
      marque
      etat
    }
  }
`;

const ADD_VEHICLE = gql`
  mutation AddVehicle(
    $matricule: String!
    $type: String!
    $marque: String!
    $etat: String
  ) {
    addVehicle(
      matricule: $matricule
      type: $type
      marque: $marque
      etat: $etat
    )
  }
`;

function OperatorVehicles() {
  const { loading, error, data, refetch } = useQuery(GET_VEHICLES);
  const [addVehicle] = useMutation(ADD_VEHICLE);

  const [form, setForm] = useState({
    matricule: "",
    type: "",
    marque: "",
    etat: "ACTIF",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddVehicle = async (e) => {
    e.preventDefault();

    await addVehicle({
      variables: form,
    });

    setForm({
      matricule: "",
      type: "",
      marque: "",
      etat: "ACTIF",
    });

    refetch();
  };

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">Erreur : {error.message}</div>;

  return (
    <OperatorLayout
      title="Véhicules"
      subtitle="Ajout et consultation des véhicules"
    >
      <div className="box">
        <h2>Ajouter un véhicule</h2>

        <form className="form" onSubmit={handleAddVehicle}>
          <input
            type="text"
            name="matricule"
            placeholder="Matricule"
            value={form.matricule}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="type"
            placeholder="Type : Bus, Taxi, Ambulance..."
            value={form.type}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="marque"
            placeholder="Marque"
            value={form.marque}
            onChange={handleChange}
            required
          />

          <select name="etat" value={form.etat} onChange={handleChange}>
            <option value="ACTIF">ACTIF</option>
            <option value="INACTIF">INACTIF</option>
            <option value="EN_PANNE">EN PANNE</option>
          </select>

          <button type="submit">Ajouter véhicule</button>
        </form>
      </div>

      <div className="box">
        <h2>Liste des véhicules</h2>

        <table>
          <thead>
            <tr>
              <th>Matricule</th>
              <th>Type</th>
              <th>Marque</th>
              <th>État</th>
            </tr>
          </thead>

          <tbody>
            {data.vehicles.map((vehicle) => (
              <tr key={vehicle.id}>
                <td>{vehicle.matricule}</td>
                <td>{vehicle.type}</td>
                <td>{vehicle.marque}</td>
                <td>
                  <span className="badge green">{vehicle.etat}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </OperatorLayout>
  );
}

export default OperatorVehicles;