const baseUri = "https://aquarium20221112102924.azurewebsites.net/fishes"

Vue.createApp({
    data() {
        return {
            fishes : [],
            error: null,
            filteredFishes : [],
            addData: {name: "", species: "", length: null },
            addMessage: "",
            deleteId: 0,
            deleteMessage:"",
            updateData: { id: null, name: "", species: "", length: null},
            updateMessage: ""
        }
    },
    async created() {
        console.log("created method called")
        this.helperGetPosts(baseUri)
    },
    methods: {
        getAllFishes() {
            this.helperGetPosts(baseUri)
        },
        async helperGetPosts(uri) {
            try {
                const response = await axios.get(uri)
                this.fishes = await response.data
                this.filteredFishes = this.fishes
                this.error = null
                //this.filteredData = this.dataseries
            } catch (ex) {
                this.fishes = []
                this.error = ex.message
            }
        },
        filterByName(name) {
            console.log("Name: "+name)
            this.filteredFishes = this.fishes.filter(t => t.name.includes(name))
            console.log("Fishes: "+this.fishes)
        },
        filterBySpecies(species) {
            console.log("Species: "+ species)
            this.filteredFishes = this.fishes.filter(t => t.species.includes(species))
            console.log("Fishes: "+this.fishes)
        },
        async addFish() {
            try {
                response = await axios.post(baseUri, this.addData)
                this.addMessage = "response " + response.status + " " + response.statusText
                this.getAllFishes()
            } catch (ex) {
                alert(ex.message)
            }
        },
        async deleteFish(deleteId) {
            const url = baseUri + "/" + deleteId
            try {
                response = await axios.delete(url)
                this.deleteMessage = response.status + " " + response.statusText
                this.getAllFishes()
                
            } catch (ex) {
                alert(ex.message)
            }
        },
        async updateFish() {
            const url = baseUri + "/" + this.updateData.id
            try {
                response = await axios.put(url, this.updateData)
                this.updateMessage = "response " + response.status + " " + response.statusText
                this.getAllFishes()
            } catch (ex) {
                alert(ex.message)
            }
        }
    }
}).mount("#app")