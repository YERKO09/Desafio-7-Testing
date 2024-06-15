const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    it("Obteniendo un status code 200", async () => {
        const res = await request(server).get("/cafes");
        const status = res.statusCode;
        console.log({status});
        expect(status).toBe(200);
    })

    it("El tipo de dato recibido es un array con almenos un objeto", async () => {
        const { body } = await request(server).get("/cafes");
        const producto = body;
        console.log(producto);
        expect(producto).toBeInstanceOf(Array);
    });

    it("Recibir un código 404 al eliminar un Café que no existe", async () => {
        const jwt = "token";
        const idDeProductoAEliminar = 5
        // const { body: cafes } = await request(server).delete(`/cafes/${idDeProductoAEliminar}`).set("Authorization", jwt).send();
        const { status } = await request(server).delete(`/cafes/${idDeProductoAEliminar}`).set("Authorization", jwt).send();
        console.log({status});
        expect(status).toBe(404);
    });

    it("Agrega un café y recibe un 201", async () => {
        // const id = Math.floor(Math.random() * 999);
        const newCafe = { id: 5, nombre: "Expreso" };
        const { body: cafes, status } = await request(server).post("/cafes").send(newCafe);
        console.log("Cafes: ",cafes);
        // console.log("Café agregado: ", newCafe);
        // console.log("Código recibido: ", status);
        console.log(`Café agregado: ${Object.values(newCafe)} \n Código recibido: ${status}`);
        
        
        expect(cafes).toContainEqual(newCafe);
        expect(status).toBe(201);
    });
    
    it("Update un café", async () => {
        const payload = {
            "id": 1,
            "nombre": "Café con leche"
        }

        const { status } = await request(server).put("/cafes/2").send(payload);
        expect(status).toBe(400);
    });
});
