import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Layout from "../../layouts/Layout";

function MapPage() {
  const center = [36.8065, 10.1815];

  return (
    <Layout
      title="Carte interactive"
      subtitle="Visualisation des véhicules, incidents et zones congestionnées"
    >
      <div className="box">
        <h2>Carte de supervision</h2>

        <MapContainer
          center={center}
          zoom={12}
          className="map-container"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={[36.8065, 10.1815]}>
            <Popup>
              Véhicule BUS-001 <br /> État : ACTIF
            </Popup>
          </Marker>

          <Marker position={[36.815, 10.17]}>
            <Popup>
              Incident : Accident <br /> Statut : Signalé
            </Popup>
          </Marker>

          <Circle
            center={[36.82, 10.19]}
            radius={900}
            pathOptions={{ color: "red" }}
          >
            <Popup>Zone congestionnée : Entrée Nord</Popup>
          </Circle>
        </MapContainer>
      </div>
    </Layout>
  );
}

export default MapPage;