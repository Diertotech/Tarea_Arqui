import { useEffect, useState } from "react";
import styles from "./App.module.css";
import { Table, Button, Modal, ModalHeader, ModalFooter, ModalBody, Form, FormGroup, Label, Input } from "reactstrap";

const GetAllResena = async () => {
    const response = await fetch("http://127.0.0.1:8080/resena", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const myJson = await response.json();
    return myJson;
};

const NewResena = async (body) => {
    const response = await fetch(`http://127.0.0.1:8080/resena`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const myJson = await response.json();
    return myJson;
};

const GetAllResenasByName = async (name) => {
    const response = await fetch(`http://127.0.0.1:8080/resenasbyname?nombre=${name}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const myJson = await response.json();
    return myJson;
};
const DeleteResena = async (id) => {
    const response = await fetch(`http://127.0.0.1:8080/resena/id=${id}`, {
        method: "DELETE",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    });
    const myJson = await response.json();
    return myJson;
};

const UpdateResenaComentario = async (id,comentario) => {
    const response = await fetch(`http://127.0.0.1:8080/resenaput2/${id}/${comentario}`, {
        method: "PUT",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    });
    const myJson = await response.json();
    return myJson;
};

const UpdateResenaCalificacion = async (id,calificacion) => {
    const response = await fetch(`http://127.0.0.1:8080/resenaput1/${id}/${calificacion}`, {
        method: "PUT",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    });
    const myJson = await response.json();
    return myJson;
};
var id_editar=-1;
function App() {
    const [nombre, setName] = useState("");
    const [calificacion, setCalificacion] = useState(0);
    const [comentario, setSection] = useState("");
    const [caratula, setCaratula] = useState("");
    const [genero, setGenero] = useState("");
    const [busqueda, setBusqueda] = useState("");
    const [rese??as, setRese??a] = useState([]);
    const [modal, setModal] = useState(false);
    const [modal2, setModal2] = useState(false);

    useEffect(() => {
        GetAllResena().then((data) => {
            setRese??a(data);
        });
    }, []);

    function ManejarNewResena() {
        const body = {
            nombre: nombre,
            calificacion: calificacion,
            comentario: comentario,
            caratula: caratula,
            genero: genero,
        };
        NewResena(body).then((data) => {
            GetAllResena().then((data) => {
                setRese??a(data);
            });
            setModal(false);
        });
    }

    function ManejarGetResenaByName() {
        GetAllResenasByName(busqueda).then((data) => {

            setRese??a(data);
        });
    }
    function ManejarDeleteResena(ID) {
        DeleteResena(ID).then((data) => {

            GetAllResena().then((data) => {
                setRese??a(data);
            });
        });
    }

    function ManejarUpdate(id) {
        id_editar=id
        setModal2(!modal2)

    }
    function Refresh(){
        GetAllResena().then((data) => {
            setRese??a(data);
            setModal2(!modal2)
        });
    }





        return (
            
            <div className={styles.App}>

                <h1 className={styles.Title}>Peliculas</h1>
                <Form>
                <Label for="busqueda">Buscar Pelicula</Label>
                    <FormGroup>

                        <Input className={styles.l1}
                            type="text"
                            name="busqueda"
                            placeholder="Nombre de la pelicula"
                            id="busqueda"
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                <Button className={styles.busqueda} color="primary" onClick={() => ManejarGetResenaByName()}>
                    BUSCAR
                </Button>
                    </FormGroup>
                </Form>

                <Button color="primary" onClick={() => setModal(!modal)}>
                    AGREGAR Rese??a
                </Button>
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Calificacion</th>
                            <th>Comentario</th>
                            <th>Caratula</th>
                            <th>Genero</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rese??as.map((rese??a, index) => (
                            <tr key={index}>
                                <th scope="row">{rese??a.ID}  

                                <Button color="primary" onClick={() => ManejarDeleteResena(rese??a.ID)}>
                                Eliminar Rese??a
                                </Button>
                                <Button color="primary" onClick={() => ManejarUpdate(rese??a.ID)}>
                                Editar Rese??a
                                </Button>
                                
                            </th>
                                <td>{rese??a.nombre}</td>
                                <td>{rese??a.calificacion}</td>
                                <td>{rese??a.comentario}</td>
                                <td> <img src={rese??a.caratula} alt="Imagen Caratula" width="500" height="600"/></td>
                                <td>{rese??a.genero}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <Modal centered isOpen={modal}>
                    <ModalHeader>Agregar rese??a</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup style={{ marginBottom: "20px" }}>
                                <Label for="name">Nombre</Label>
                                <Input type="text" name="name" id="name" placeholder="Nombre Pelicula" value={nombre} onChange={(e) => setName(e.target.value)} />
                            </FormGroup>

                            <FormGroup style={{ marginBottom: "20px" }}>
                                <Label for="calificacion">Calificacion</Label>
                                <Input 
                                    type="number"
                                    name="calificacion"
                                    id="calificacion"
                                    placeholder="Calificacion Pelicula"
                                    min="0" 
                                    max="10"
                                    value={calificacion}
                                    onChange={(e) => setCalificacion(e.target.valueAsNumber)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="section">Comentario</Label>
                                <Input
                                    type="text"
                                    name="section"
                                    id="section"
                                    placeholder="Comentario Pelicula"
                                    value={comentario}
                                    onChange={(e) => setSection(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="section">Caratula</Label>
                                <Input
                                    type="text"
                                    name="caratula"
                                    id="caratula"
                                    placeholder="URL de la Foto Pelicula"
                                    value={caratula}
                                    onChange={(e) => setCaratula(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="section">Genero</Label>
                                <Input
                                    type="text"
                                    name="genero"
                                    id="genero"
                                    placeholder="Genero Pelicula"
                                    value={genero}
                                    onChange={(e) => setGenero(e.target.value)}
                                />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => ManejarNewResena()}>
                            Agregar
                        </Button>{" "}
                        <Button color="secondary" onClick={() => setModal(!modal)}>
                            Cancelar
                        </Button>
                    </ModalFooter>
                </Modal>







                <Modal centered isOpen={modal2}>
                    <ModalHeader>Editar Rese??a</ModalHeader>
                    <ModalBody>
                        <Form>

                            <FormGroup style={{ marginBottom: "20px" }}>
                                <Label for="calificacion">Calificacion</Label>
                                <Input 
                                    type="number"
                                    name="calificacion"
                                    id="calificacion"
                                    placeholder="Calificacion Pelicula"
                                    min="0" 
                                    max="10"
                                    value={calificacion}
                                    onChange={(e) => setCalificacion(e.target.valueAsNumber)}
                                />
                                <Button color="primary" onClick={() => UpdateResenaCalificacion(id_editar,calificacion)}>
                                Editar Calificacion
                                </Button>
                            </FormGroup>
                            <FormGroup>
                                <Label for="section">Comentario</Label>
                                <Input
                                    type="text"
                                    name="section"
                                    id="section"
                                    placeholder="Comentario Pelicula"
                                    value={comentario}
                                    onChange={(e) => setSection(e.target.value)}
                                />
                                <Button color="primary" onClick={() => UpdateResenaComentario(id_editar,comentario)}>
                                Editar Comentario
                                </Button>
                            </FormGroup>


                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => Refresh()}>
                            Aceptar
                        </Button>{" "}
                        <Button color="secondary" onClick={() => setModal2(!modal2)}>
                            Cancelar
                        </Button>
                    </ModalFooter>
                </Modal>


            </div>

        );
}

export default App;
