import axios from "axios"
import { Patient } from "./resources"

export default class FHIRServer {
    private endpoint: string
    constructor(endpoint: string) {
        this.endpoint = endpoint
    }

    public getEndpoint() {
        return this.endpoint
    }
    public setEndpoint(newEndpoint: string) {
        this.endpoint = newEndpoint
        return this
    }

    public async getPatients() {
        const headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)"
        }
        const reqOptions = {
            url: `${this.endpoint}/Patient`,
            method: "GET",
            headers: headersList,
        }

        let response = await axios.request(reqOptions)
        return response.data.entry

    }




}
