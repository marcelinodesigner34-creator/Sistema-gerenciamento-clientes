const clienteService ={
    listar: async ()=>{
        const resposta = await api.get("/clientes");
        return resposta.data;
    },

    buscar: async (termo)=>{
        const resposta = await api.get("/clientes/buscar", {params: {termo}});
        return resposta.data;
    },

    buscarPorId: async (id) =>{
        const resposta = await api.get(`/clientes/${id}`);
        return resposta.data;
    },

    cadastrar: async (cliente) =>{
        const resposta = await api.post("/clientes", cliente);
        return resposta.data;
    },

    editar: async (id, cliente) =>{
        const resposta = await api.put(`/clientes/${id}`, cliente);
        return resposta.data;
    },

    excluir: async(id)=>{
        const resposta = await api.delete(`/clientes/${id}`);
        return resposta.data;
    }
};