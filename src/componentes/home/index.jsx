import react,{useEffect, useState } from "react";

function Home() {
  const [departamentos, setDepartamentos] = useState(null);
  const [capitales, setCapitales] = useState(null);

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

    console.log(departamentos)

  }, []);

    return(
    <>
      <div>
        <button>
          Mostrar Departamentos
        </button>
        <button>Mostrar Capitales</button>
      </div>

      <div>
        <input
          type="text"
          placeholder="Buscar por nombre..."
        />
      </div>
      
      <div className="lugar">
       {
        // verficar que capitales y capitales .data existen ates de mapear
        ! capitales?(
            <p>Cargando...</p>
        ) : (
            capitales.data.cpt.map((item)=>(
        <p key={item.id}>
            {item.nm}
        </p>)
        ))}
        <p>Nombre<span> numero de votos</span></p>
        <div>
            <p>Candidatos:</p>
            <ul>
                <li>candidato 1</li>
                <li>candidato 2</li>
            </ul>
        </div>
      </div>
    </>
)
}

export default Home