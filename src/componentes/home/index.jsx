import React, { useEffect, useState } from "react";

function Home() {
  const [departamentos, setDepartamentos] = useState(null);
  const [capitales, setCapitales] = useState(null);
  const [modo, setModo] = useState("departamentos");
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const urlDpt =
      "https://gist.githubusercontent.com/diaztibata/fe3d238ee6b59ef71c8001654441a9f6/raw/4974a1b1cab3ac606dd96aa2d34d6e7c8e007daf/departamentosglobal.json";
    const urlCpt =
      "https://gist.githubusercontent.com/diaztibata/fe3d238ee6b59ef71c8001654441a9f6/raw/4974a1b1cab3ac606dd96aa2d34d6e7c8e007daf/capitalesglobal.json";

    const fetchJson = async (url, setter) => {
      try {
        const resp = await fetch(url);
        if (!resp.ok) throw new Error("Error al cargar JSON: " + resp.status);
        const json = await resp.json();
        setter(json);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchJson(urlDpt, setDepartamentos);
    fetchJson(urlCpt, setCapitales);
  }, []);

  const getListaMostrar = () => {
    if (modo === "departamentos" && departamentos) {
      return departamentos.data?.dpt ?? [];
    }
    if (modo === "capitales" && capitales) {
      return capitales.data?.cpt ?? [];
    }
    return [];
  };

  const lista = getListaMostrar();

  const listaFiltrada = lista.filter((item) =>
    item.nm.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.titulo}>🌞 Colombia Electoral 🇨🇴</h1>

      <div style={styles.botonera}>
        <button
          onClick={() => setModo("departamentos")}
          style={{
            ...styles.boton,
            backgroundColor: modo === "departamentos" ? "#ffcc00" : "#ffffff",
          }}
        >
          Departamentos
        </button>
        <button
          onClick={() => setModo("capitales")}
          style={{
            ...styles.boton,
            backgroundColor: modo === "capitales" ? "#ff3300" : "#ffffff",
          }}
        >
          Capitales
        </button>
      </div>

      <div style={styles.buscador}>
        <input
          type="text"
          placeholder="🔍 Buscar por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={styles.input}
        />
      </div>

      <div style={styles.listaContenedor}>
        {lista.length === 0 ? (
          <p style={styles.mensaje}>Cargando datos...</p>
        ) : listaFiltrada.length === 0 ? (
          <p style={styles.mensaje}>No se encontraron resultados</p>
        ) : (
          <ul style={styles.lista}>
            {listaFiltrada.map((item) => (
              <li key={item.id} style={styles.item}>
                <div>
                  <strong style={{ color: "#0057a8" }}>{item.nm}</strong>{" "}
                  <span style={{ color: "#cc0000" }}>
                    — Total de votos: {item.tvv ?? "N/A"}
                  </span>
                </div>
                {item.cdt && (
                  <div>
                    <p style={{ marginTop: 5, marginBottom: 5 }}>🗳️ Candidatos:</p>
                    <ul style={styles.sublista}>
                      {item.cdt.map((cand) => (
                        <li key={cand.id} style={styles.candidato}>
                          {cand.nm} — votos: {cand.tv}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: "linear-gradient(to bottom, #ffcc00, #ffffff)",
    minHeight: "100vh",
    padding: "20px",
  },
  titulo: {
    textAlign: "center",
    fontSize: "2.5rem",
    color: "#0057a8",
    marginBottom: "20px",
    textShadow: "1px 1px #000",
  },
  botonera: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  boton: {
    padding: "10px 20px",
    fontSize: "16px",
    border: "2px solid #0057a8",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  buscador: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    width: "80%",
    maxWidth: "400px",
    border: "2px solid #0057a8",
    borderRadius: "8px",
    fontSize: "16px",
  },
  listaContenedor: {
    maxWidth: "800px",
    margin: "0 auto",
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 0 10px rgba(0,0,0,0.2)",
  },
  lista: {
    listStyle: "none",
    padding: 0,
  },
  item: {
    marginBottom: "20px",
    padding: "10px",
    background: "#f0f0f0",
    borderLeft: "5px solid #0057a8",
    borderRadius: "6px",
  },
  sublista: {
    marginLeft: "20px",
    padding: 0,
    listStyle: "square",
  },
  candidato: {
    marginBottom: "4px",
  },
  mensaje: {
    textAlign: "center",
    fontSize: "18px",
    color: "#333",
  },
};

export default Home;
