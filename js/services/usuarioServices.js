const usuarioService ={
    listar: async ()=>{
        const resposta = await api.get("/usuarios")
        return resposta.data;
    },

    buscarPorId: async (id)=>{
        const resposta = await api.get(`/usuarios/${id}`);
        return resposta.data;
    },

    cadastrar: async (usuario) =>{
        const resposta =await api.post("/usuarios", usuario);
        return resposta.data;
    },

    editar: async (id, usuario)=>{
        const resposta = await api.put(`/usuarios/${id}`, usuario);
        return resposta.data
    },

    excluir: async(id, logadoId) =>{
        const resposta = await api.delete(`/usuarios/${id}`, {params: {logadoId}})
        return resposta.data
    }
};