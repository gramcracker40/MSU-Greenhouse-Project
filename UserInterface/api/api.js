import * as Utils from "../js/utilities.js";

const url = "https://greenwatch.azurewebsites.net"
const token = `Bearer ${sessionStorage.getItem('access_token')}`;
let debugMode = false;



export class GreenhouseProxy {
    constructor() {
        // this.debugMode = false;

        // const optionsPost = {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(user)
        // }

        // const options = {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(dateObj)
        // }

        // const optionsPatch = {
        //     method: 'PATCH',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(userData)
        // }

        // const optionsDelete = {
        //     method: 'DELETE',
        //     headers: {
        //         'Authorization': token
        //     }
        // }
    }

    // ------------------USERS------------------
    async registerUser(user) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }

        try {
            let response = await fetch(`${url}/register`, options);
            if (response.ok && debugMode) {
                console.log("User Created Successfully");
            }
        } catch (error) {
            console.log(error);
        }        
    }

    async login(loginObj) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginObj)
        }

        try {
            let response = await fetch(`${url}/login`, options);
            if (response.ok) {
                if (debugMode) {
                    console.log("Login Successful");
                }

                let data = await response.json();
                return data;
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Logout

    // Refresh

    // Get all users
    async getUsers() {
        try {
            let response = await fetch(`${url}/users`);
            if (response.ok) {
                let data = await response.json();

                if (debugMode) {
                    console.log("Successfully Aquired Users");
                    console.log(data);
                }

                return data;
            }
            
        } catch (error) {
            console.log(error);
        }
        
    }

    // Update user by id
    async editUser(userID, userData) {
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        }
        
        try {
            let response = await fetch(`${url}/users/${userID}`, options);
            if (response.ok && debugMode) {
                console.log("User Successfully Updated");
                console.log(await response.json());
            }
        } catch (error) {
            console.log(error);
        }
        
    }

    // Delete user by id
    async deleteUser(userID) {
        const options = {
            method: 'DELETE'
        }

        try {
            let response = await fetch(`${url}/users/${userID}`, options);
            if (response.ok) {
                console.log("User Deleted Successfully");
            }
        } catch (error) {
            console.log(error);
        }
    }
    

    // ------------------ROOM------------------ //
    // Get all rooms
    async getRooms() {
        try {
            let response = await fetch(`${url}/rooms`);
            return await response.json();
        } catch (error) {
            console.log(error);
        }
        
    }

    // Create a new room
    async createRoom(room) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(room)
        }

        try {
            let response = await fetch(`${url}/rooms`, options);
            if (response.ok) {
                console.log("Room Created Successfully");
            }
        } catch (error) {
            console.log(error);
        }        
    }

    // Get room by id
    async getRoomByID(roomID) {
        try {
            let response = await fetch(`${url}/rooms/${roomID}`);
            if (response.ok) {
                let data = await response.json();
                return data;
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Delete a room by ID
    async deleteRoom(room_id) {
        const options = {
            method: 'DELETE',
            headers: {
                'Authorization': token
            }
        }

        try {
            let response = await fetch(`${url}/rooms/${room_id}`, options);
            if (response.ok) {
                console.log("Room Deleted Successfully");
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Get room measurement by room id
    async getMeasurementByRoom(roomID, dateObj) {
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dateObj)
        }

        try {
            let response = await fetch(`${url}/rooms/${roomID}/measurement`, options);
            if (response.ok) {
                let data = await response.json();
                return data;
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Create room measurement by room id
    async createMeasurement(roomID, measurement) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Key': 'TRD1IU4G5E45RZU8UOXNNMR7WID34Q7SM0EFHV6FHZS9PQBNYXINTTS1BSR8' // Agent Key for Room 1
            },
            body: JSON.stringify(measurement)
        }

        try {
            let response = await fetch(`${url}/rooms/${roomID}/measurement`, options);
            if (response.ok) {
                // console.log("Measurement Created Successfully");
            }
        } 
        catch (error) {
            console.log(error);
        }
    }

    // Get all messages
    getAllMessages() {
        const options = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        fetch(`${url}/rooms/messages`, options)
        .then((res) => res.json())
        .then((data) => console.log(data));
    }

    // Get all room messages by room id
    async getAllMessagesByRoom(roomID) {
        const options = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
      
        try {
            let response = await fetch(`${url}/rooms/${roomID}/messages`, options);
            if (response.ok) {
                let data = await response.json();
                return data;
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Create new room message by room id
    async createRoomMessage(roomID, userID, message) {
        const _body = {
            "user_id": userID,
            "body": message
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(_body)
        }

        try {
            let response = await fetch(`${url}/rooms/${roomID}/messages`, options);
            if (response.ok && debugMode) {
                console.log("Messages Created Successfully");
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Update a message by message id

    // Delete a message by message id

    // ------------------EXPERIMENT------------------
    // Get all experiments
    async getExperiments() {
        try {
            let response = await fetch(`${url}/experiments`);
            if (response.ok) {
                let data = await response.json();
                return data;
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Create an experiment
    async createExpirement(experimentObj) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(experimentObj)
        }

        try {
            let response = await fetch(`${url}/experiments`, options);
            if (response.ok) {
                console.log("Experiment Created Successfully");
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Get experiment by id
    async getExperimentByID(experimentID) {
        try {
            let response = await fetch(`${url}/experiments/${experimentID}`, options);
            if (response.ok) {
                let data = await response.json();
                return data;
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Update experiment by id
    async editExperiment(experimentID, experimentObj) {
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(experimentObj)
        }

        try {
            let response = await fetch(`${url}/experiments/${experimentID}`, options);
            if (response.ok) {
                console.log("Experiment Updated Successfully");
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Delete experiment by id
    async deleteExperiment(experimentID) {
        const options = {
            method: 'DELETE',
            headers: {
                'Authorization': token
            }
        }

        try {
            let response = await fetch(`${url}/experiments/${experimentID}`, options);
            if (response.ok) {
                console.log("Experiment Deleted Successfully");
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Add user to experiment by experiment and user IDs

    // Delete a user from an experiment by experiment and user IDs

    // ------------------GREENHOUSE------------------
    // Get greenhouse by id

    // Update greenhouse by id

    // Delete greenhouse by id

    // Get all greenhouses

    // Create a new greenhouse

    // ------------------SERVER------------------
    // Get all servers

    // Create a new server

    // Update a server by id

    // Delete a server by id

    // Get all agents on a server

    // Create an agent on a server

    // Update an agent by id

    // Delete an agent by id
}

// const proxy = new GreenhouseProxy();
// proxy.registerUser(userRegister2);
// proxy.registerUser(userRegister3);
// proxy.login();
// proxy.getUsers();
// proxy.createRoom("Room 1");
// proxy.getRooms();
// proxy.deleteRoom(1);
// proxy.createMeasurement(1, measurement);
// proxy.getAllMessages();
// proxy.getAllMessagesByRoom(1);
// proxy.getAllMessagesByRoom(2);
// proxy.getAllMessagesByRoom(3);
// proxy.getAllMessagesByRoom(4);
// proxy.createRoomMessage(4, 1, "That sounds like a great idea. Let's do it!");
