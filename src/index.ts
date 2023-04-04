import FHIRServer from "./fhir"


const app = async () => {

    // const server = new FHIRServer("http://vonk.fire.ly")
    const server = new FHIRServer("http://hapi.fhir.org/baseR4")
    // const server = new FHIRServer("http://localhost:4004/hapi-fhir-jpaserver/fhir")
    // server.logServer()
    const patients = await server.getPatients()
    console.log(patients)
    console.log(server.getEndpoint())
}


app()