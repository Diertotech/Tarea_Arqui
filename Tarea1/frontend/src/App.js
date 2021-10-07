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

function App() {
    const [nombre, setName] = useState("");
    const [calificacion, setCalificacion] = useState(0);
    const [comentario, setSection] = useState("");
    const [caratula, setCaratula] = useState("");
    const [genero, setGenero] = useState("");
    const [busqueda, setBusqueda] = useState("");
    const [students, setReseña] = useState([]);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        GetAllResena().then((data) => {
            setReseña(data);
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
                setReseña(data);
            });
            setModal(false);
        });
    }

    function ManejarGetResenaByName() {
        GetAllResenasByName(busqueda).then((data) => {
            // const newStudents = [];
            // newStudents.push(data);
            // setStudents(newStudents);
            setReseña(data);
        });
    }
    function ManejarDeleteResena(ID) {
        DeleteResena(ID).then((data) => {

            GetAllResena().then((data) => {
                setReseña(data);
            });
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
                AGREGAR Reseña
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
                    {students.map((student, index) => (
                        <tr key={index}>
                            <th scope="row">{student.ID}  

                            <Button color="primary" onClick={() => ManejarDeleteResena(student.ID)}>
                            Eliminar Reseña
                            </Button>
                            
                        </th>
                            <td>{student.nombre}</td>
                            <td>{student.calificacion}</td>
                            <td>{student.comentario}</td>
                            <td> <img src={student.caratula} alt="Imagen Caratula" width="500" height="600"/></td>
                            <td>{student.genero}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal centered isOpen={modal}>
                <ModalHeader>Agregar reseña</ModalHeader>
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
        </div>
    );
}

export default App;
