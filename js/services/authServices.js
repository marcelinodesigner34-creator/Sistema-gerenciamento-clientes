const authService ={
    login: async(email, senha)=>{
        const resposta= await api.post("/login", {email, senha});
        return resposta.data
    }
}