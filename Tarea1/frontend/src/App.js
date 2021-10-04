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

function App() {
    const [nombre, setName] = useState("");
    const [calificacion, setLastname] = useState("");
    const [comentario, setSection] = useState("");
    const [caratula, setCaratula] = useState("");
    const [genero, setGenero] = useState("");
    const [busqueda, setBusqueda] = useState("");
    const [students, setStudents] = useState([]);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        GetAllResena().then((data) => {
            setStudents(data);
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
                setStudents(data);
            });
            setModal(false);
        });
    }

    function handleGetStudentByName() {
        GetAllResenasByName(busqueda).then((data) => {
            // const newStudents = [];
            // newStudents.push(data);
            // setStudents(newStudents);
            setStudents(data);
        });
    }

    return (
        <div className={styles.App}>
            <h1 className={styles.Title}>Alumnos</h1>
            <Form>
                <FormGroup>
                    <Label for="busqueda">Busqueda</Label>
                    <Input
                        type="text"
                        name="busqueda"
                        id="busqueda"
                        placeholder="Brian"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </FormGroup>
            </Form>
            <Button color="primary" onClick={() => handleGetStudentByName()}>
                BUSCAR
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
                            <th scope="row">{student.ID}</th>
                            <td>{student.nombre}</td>
                            <td>{student.calificacion}</td>
                            <td>{student.comentario}</td>
                            <td> <img src={student.caratula} alt="Imagen Caratula" width="500" height="600"/></td>
                            <td>{student.genero}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Button color="primary" onClick={() => setModal(!modal)}>
                AGREGAR Reseña
            </Button>
            <Modal centered isOpen={modal}>
                <ModalHeader>Agregar reseña</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup style={{ marginBottom: "20px" }}>
                            <Label for="name">Nombre</Label>
                            <Input type="text" name="name" id="name" placeholder="Nombre Pelicula" value={nombre} onChange={(e) => setName(e.target.value)} />
                        </FormGroup>
                        <FormGroup style={{ marginBottom: "20px" }}>
                            <Label for="last_name">Calificacion</Label>
                            <Input
                                type="number"
                                name="last_name"
                                id="last_name"
                                placeholder="Calificacion Pelicula"
                                value={calificacion}
                                onChange={(e) => setLastname(e.target.value)}
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
