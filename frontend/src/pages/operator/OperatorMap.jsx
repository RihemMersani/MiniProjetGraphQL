import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import OperatorLayout from "../../layouts/OperatorLayout";

function OperatorMap() {
  const center = [36.8065, 10.1815];

  return (
    <OperatorLayout
      title="Carte interactive"
      subtitle="Consultation de la circulation et des incidents"
    >
      <div className="box">
        <h2>Carte opérateur</h2>

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
            <Popup>Véhicule actif</Popup>
          </Marker>

          <Marker position={[36.815, 10.17]}>
            <Popup>Incident signalé</Popup>
          </Marker>

          <Circle
            center={[36.82, 10.19]}
            radius={900}
            pathOptions={{ color: "red" }}
          >
            <Popup>Zone congestionnée</Popup>
          </Circle>
        </MapContainer>
      </div>
    </OperatorLayout>
  );
}

export default OperatorMap;